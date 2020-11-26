import { Service } from "typedi";
import { Repository, getRepository, Like } from "typeorm";
import { User } from "../../entities/User";
import { IUserService } from "../../interfaces/User/IUserService";
import { UserRequest } from "../../models/User/UserRequest";
import { HttpException } from "../../models/Error/HttpException";
import { ErrorType } from "../../models/Error/ErrorType";

@Service()
export class UserService implements IUserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository<User>(User);
  }

  async fetch({ name }: any = ""): Promise<[User[], number]> {
    return this.userRepository.findAndCount(
      name ? { where: { name: Like(`%${name}%`) } } : { order: { active: "DESC", name: "ASC" } },
    );
  }

  async fetchOne(id: number, { relations }: any): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async createOne(userRequest: UserRequest): Promise<User> {
    let user = new User();
    user = Object.assign<User, UserRequest>(user, userRequest); // mapping for class hooks
    user.password = "wine123";

    const userExists = await this.userRepository.findOne({ where: { mail: user.mail } });

    if (userExists) {
      const type: ErrorType = "user.error.name.exists";

      throw new HttpException({ status: 201, type });
    }

    return this.userRepository.save(user);
  }

  async deleteOne(id: number): Promise<any> {
    return this.userRepository.delete(id);
  }

  async updateOne(user: UserRequest): Promise<User> {
    const { id } = user;
    let userExists = await this.userRepository.findOneOrFail(id);
    userExists = Object.assign<User, UserRequest>(userExists, user);

    return this.userRepository.save(userExists);
  }

  async findOneByMail(mail: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { mail } });
  }
}
