import { JsonController, Get, Param } from "routing-controllers";
import { IUtilService } from "../../interfaces/Util/IUtilService";
import Container from "typedi";
import { UtilService } from "../../services/Util/UtilService";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { State } from "../../entities/State";

@JsonController("/util")
export class UtilController {
  private utilService: IUtilService;

  constructor() {
    this.utilService = Container.get(UtilService);
  }

  @Get("/state")
  @OpenAPI({ summary: "Return a list of brazilian states" })
  @ResponseSchema(State)
  fetchStates(): Promise<State[]> {
    return this.utilService.fetchStates();
  }

  @Get("/state/:abbreviation")
  @OpenAPI({ summary: "Return a brazilian state based on abbreviation" })
  @ResponseSchema(State)
  fetchState(@Param("abbreviation") abbreviation: string): Promise<State | undefined> {
    return this.utilService.fetchState(abbreviation);
  }
}
