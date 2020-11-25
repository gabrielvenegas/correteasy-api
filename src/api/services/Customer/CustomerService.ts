import { Service } from "typedi";
import { Repository, getRepository, Like } from "typeorm";
import { Customer } from "../../entities/Customer";
import { ICustomerService } from "../../interfaces/Customer/ICustomerService";
import { HttpException } from "../../models/Error/HttpException";
import { ErrorType } from "../../models/Error/ErrorType";

@Service()
export class CustomerService implements ICustomerService {
  private readonly customerRepository: Repository<Customer>;

  constructor() {
    this.customerRepository = getRepository<Customer>(Customer);
  }

  async fetch({ name }: any = ""): Promise<[Customer[], number]> {
    return this.customerRepository.findAndCount(
      name ? { where: { name: Like(`%${name}%`) } } : { order: { active: "DESC", name: "ASC" } },
    );
  }

  async fetchOne(id: number, { relations }: any): Promise<Customer> {
    return this.customerRepository.findOneOrFail({ where: { id } });
  }

  async createOne(customer: Customer): Promise<Customer> {
    const customerExists = await this.customerRepository.findOne({ where: { mail: customer.mail } });

    if (customerExists) {
      const type: ErrorType = "user.error.name.exists";

      throw new HttpException({ status: 201, type });
    }

    return this.customerRepository.save(customer);
  }

  async deleteOne(id: number): Promise<any> {
    return this.customerRepository.delete(id);
  }

  async updateOne(customer: Customer): Promise<Customer> {
    const { id } = customer;
    let customerExists = await this.customerRepository.findOneOrFail(id);
    customerExists = Object.assign<Customer, Customer>(customerExists, customer);

    return this.customerRepository.save(customerExists);
  }

  async findOneByMail(mail: string): Promise<Customer> {
    return this.customerRepository.findOneOrFail({ where: { mail } });
  }
}
