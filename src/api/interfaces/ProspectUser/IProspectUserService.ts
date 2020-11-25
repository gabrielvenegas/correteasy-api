import { QueryParameters } from "../../models/QueryParameters";
import { ProspectUser } from "../../entities/ProspectUser";

export interface IProspectUserService {
  fetch(name: string): Promise<[ProspectUser[], number]>;
  fetchOne(id: number, relations?: string): Promise<ProspectUser>;
  createOne(prospectUser: ProspectUser): Promise<ProspectUser>;
  deleteOne(id: number): Promise<any>;
  updateOne(prospectUser: ProspectUser): Promise<ProspectUser>;
  findOneByMail(mail: string): Promise<ProspectUser>;
}
