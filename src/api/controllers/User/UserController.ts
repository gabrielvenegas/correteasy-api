import { JsonController, Get, Post, Put, Delete, Param, QueryParams, Body, Authorized } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import Container from "typedi";
import { User } from "../../entities/User";
import { IUserService } from "../../interfaces/User/IUserService";
import { UserService } from "../../services/User/UserService";
import { UserRequest } from "../../models/User/UserRequest";

@JsonController("/user")
@ResponseSchema(User)
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class UserController {
  private userService: IUserService;

  constructor() {
    this.userService = Container.get(UserService);
  }

  @Get("/:id")
  @OpenAPI({ summary: "Return a single user" })
  @ResponseSchema(User)
  getOne(@Param("id") id: number, @QueryParams() params: any): Promise<User> {
    return this.userService.fetchOne(id, params);
  }

  @Get("/")
  @Authorized({ name: "", policy: "listUser" })
  @OpenAPI({ summary: "Return a list of users" })
  getAll(@QueryParams() name: string): Promise<[User[], number]> {
    return this.userService.fetch(name);
  }

  @Post("/")
  @Authorized({ name: "admin", policy: "ceateUser" })
  @OpenAPI({ summary: "Create a new user" })
  post(@Body() user: UserRequest): Promise<User> {
    return this.userService.createOne(user);
  }

  @Put("/")
  @OpenAPI({ summary: "Update an user" })
  put(@Body() user: UserRequest) {
    return this.userService.updateOne(user);
  }

  @Delete("/:id")
  @Authorized({ name: "admin", policy: "deleteUser" })
  @OpenAPI({ summary: "Delete an user" })
  delete(@Param("id") id: number) {
    return this.userService.deleteOne(id);
  }
}
