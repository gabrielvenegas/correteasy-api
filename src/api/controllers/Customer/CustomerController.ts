import { JsonController, Get, Post, Put, Delete, Param, QueryParams, Body, Authorized } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import Container from "typedi";
import { Customer } from "../../entities/Customer";
import { ICustomerService } from "../../interfaces/Customer/ICustomerService";
import { CustomerService } from "../../services/Customer/CustomerService";

@JsonController("/customer")
@ResponseSchema(Customer)
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class CustomerController {
  private customerService: ICustomerService;

  constructor() {
    this.customerService = Container.get(CustomerService);
  }

  @Get("/:id")
  @OpenAPI({ summary: "Return a single customer" })
  @ResponseSchema(Customer)
  getOne(@Param("id") id: number, @QueryParams() params: any): Promise<Customer> {
    return this.customerService.fetchOne(id, params);
  }

  @Get("/")
  @OpenAPI({ summary: "Return a list of customers" })
  getAll(@QueryParams() name: string): Promise<[Customer[], number]> {
    return this.customerService.fetch(name);
  }

  @Post("/")
  @OpenAPI({ summary: "Create a new customer" })
  post(@Body() customer: Customer): Promise<Customer> {
    return this.customerService.createOne(customer);
  }

  @Put("/")
  @OpenAPI({ summary: "Update an customer" })
  put(@Body() customer: Customer) {
    return this.customerService.updateOne(customer);
  }

  @Delete("/:id")
  @Authorized({ name: "admin", policy: "deleteCustomer" })
  @OpenAPI({ summary: "Delete an customer" })
  delete(@Param("id") id: number) {
    return this.customerService.deleteOne(id);
  }
}
