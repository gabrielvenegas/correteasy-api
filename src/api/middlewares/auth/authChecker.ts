import { Action, UnauthorizedError } from "routing-controllers";
import { Container } from "typedi";
import { AuthService } from "../../services/Auth/AuthService";
import { getRepository } from "typeorm";
import { User } from "../../entities/User";

export function authorizationChecker(): (action: Action, rolesToCheck: any[]) => Promise<boolean> | boolean {
  const authService = Container.get<AuthService>(AuthService);

  return async function innerAuthorizationChecker(action: Action, rolesToCheck: any[]): Promise<boolean> {
    const token = authService.parseTokenFromRequest(action.request);
    const { method } = action.request;

    if (token === undefined) {
      throw new UnauthorizedError();
    }

    // Request user info at auth0 with the provided token
    try {
      const userRepository = getRepository(User);

      const { user_id, username, roles } = authService.getTokenInfo(token);
      const user = await userRepository.findOne(user_id, { relations: ["roles", "roles.permissions", "permissions"] });

      if (user?.isSuper) {
        return true;
      }

      // get policy from role - TODO
      const { policy } = rolesToCheck[0]; // Think of some other way later

      // check if the user role has the permission or the permission was set to the user directly
      const hasPermission =
        (user &&
          !!user?.roles.map(a => a.permissions.find(a => a.name === policy && a.method.toUpperCase() === method))[0]) ||
        !!user?.permissions.find(a => a.name === policy && a.method.toUpperCase() === method);

      // add token info to request
      action.request.tokeninfo = { user_id, username, roles };

      // check role
      if (user && !rolesToCheck.length && hasPermission) {
        return true;
      }

      if ((user && rolesToCheck.find(role => user.roles.map(r => r.name).indexOf(role.name) !== -1)) || hasPermission)
        return true;

      return false;
    } catch (e) {
      return false;
    }
  };
}
