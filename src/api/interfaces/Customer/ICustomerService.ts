import { QueryParameters } from "../../models/QueryParameters";
import { Customer } from "../../entities/Customer";

export interface ICustomerService {
  fetch(name: string): Promise<[Customer[], number]>;
  fetchOne(id: number, relations?: string): Promise<Customer>;
  createOne(customer: Customer): Promise<Customer>;
  deleteOne(id: number): Promise<any>;
  updateOne(customer: Customer): Promise<Customer>;
  findOneByMail(mail: string): Promise<Customer>;
}
