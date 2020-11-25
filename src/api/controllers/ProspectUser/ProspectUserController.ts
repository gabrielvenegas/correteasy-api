import { JsonController, Get, Post, Put, Delete, Param, QueryParams, Body, Authorized } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import Container from "typedi";
import { ProspectUser } from "../../entities/ProspectUser";
import { IProspectUserService } from "../../interfaces/ProspectUser/IProspectUserService";
import { ProspectUserService } from "../../services/ProspectUser/ProspectUserService";
import { ProspectUserRequest } from "../../models/ProspectUser/ProspectUserRequest";

@JsonController("/prospect-user")
@ResponseSchema(ProspectUser)
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class ProspectUserController {
  private prospectUserService: IProspectUserService;

  constructor() {
    this.prospectUserService = Container.get(ProspectUserService);
  }

  @Get("/:id")
  @OpenAPI({ summary: "Return a single prospect user" })
  @ResponseSchema(ProspectUser)
  getOne(@Param("id") id: number, @QueryParams() params: any): Promise<ProspectUser> {
    return this.prospectUserService.fetchOne(id, params);
  }

  @Get("/")
  @OpenAPI({ summary: "Return a list of prospect users" })
  getAll(@QueryParams() name: string): Promise<[ProspectUser[], number]> {
    return this.prospectUserService.fetch(name);
  }

  @Post("/")
  @OpenAPI({ summary: "Create a new prospect user" })
  post(@Body() prospectUser: ProspectUserRequest): Promise<ProspectUser> {
    return this.prospectUserService.createOne(prospectUser);
  }

  @Put("/")
  @OpenAPI({ summary: "Update a prospect user" })
  put(@Body() prospectUser: ProspectUser) {
    return this.prospectUserService.updateOne(prospectUser);
  }

  @Delete("/:id")
  @OpenAPI({ summary: "Delete a prospect user" })
  delete(@Param("id") id: number) {
    return this.prospectUserService.deleteOne(id);
  }
}
