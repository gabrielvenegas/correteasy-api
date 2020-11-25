import * as express from "express";
import { Service } from "typedi";
import { ITokenInfo } from "../../interfaces/Auth/ITokenInfo";
import * as jwt from "jsonwebtoken";
import { env } from "../../../env";
import { IAuthService } from "../../interfaces/Auth/IAuthService";
import { getRepository } from "typeorm";
import { User } from "../../entities/User";
import { HttpException } from "../../models/Error/HttpException";
import { AuthResponse } from "../../models/Auth/AuthResponse";
import { AuthRequest } from "../../models/Auth/AuthRequest";
import { ErrorType } from "../../models/Error/ErrorType";
import { UnauthorizedError } from "routing-controllers";
import { logger } from "../../../utils/logger";

@Service()
export class AuthService implements IAuthService {
  public parseTokenFromRequest(req: express.Request): string | undefined {
    const authorization = req.header("authorization");
    // Retrieve the token form the Authorization header
    if (authorization && authorization.split(" ")[0] === "Bearer") {
      return authorization.split(" ")[1];
    }

    return authorization;
  }

  public getTokenInfo(token: string): ITokenInfo {
    try {
      const tokenInfo = <ITokenInfo>jwt.verify(token, env.auth.secret);

      return tokenInfo;
    } catch (err) {
      throw new UnauthorizedError();
    }
  }

  public async login({ mail, password }: AuthRequest): Promise<AuthResponse | undefined> {
    const userRepository = getRepository(User);
    let supplierIds: number[] = [];

    try {
      let user = await userRepository.findOne({
        where: { mail },
        relations: ["roles", "roles.permissions", "permissions"],
      });

      // check password
      if (!(await user?.checkPassword(password))) {
        const type: ErrorType = "user.error.password.invalid";
        const err = {
          status: 401,
          type,
        };

        throw new HttpException(err);
      }

      const token = this.generateJwt(user);

      return { token };
    } catch (err) {
      logger().error("AUTH_ERROR", err);
      throw err;
    }
  }

  private generateJwt(user: User | undefined): any {
    if (user) {
      return jwt.sign({ user_id: user.id, username: user.name, isSuper: user.isSuper }, env.auth.secret, {
        expiresIn: "120h",
      });
    }
  }
}
