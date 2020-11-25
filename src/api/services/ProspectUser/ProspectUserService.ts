import { Service } from "typedi";
import { Repository, getRepository } from "typeorm";
import { ProspectUser } from "../../entities/ProspectUser";
import { IProspectUserService } from "../../interfaces/ProspectUser/IProspectUserService";

@Service()
export class ProspectUserService implements IProspectUserService {
  private readonly prospectUserRepository: Repository<ProspectUser>;

  constructor() {
    this.prospectUserRepository = getRepository<ProspectUser>(ProspectUser);
  }

  async fetch({ name }: any = ""): Promise<[ProspectUser[], number]> {
    return this.prospectUserRepository.findAndCount();
  }

  async fetchOne(id: number, { relations }: any): Promise<ProspectUser> {
    return this.prospectUserRepository.findOneOrFail({ where: { id } });
  }

  async createOne(prospectUser: ProspectUser): Promise<ProspectUser> {
    return this.prospectUserRepository.save(prospectUser);
  }

  async deleteOne(id: number): Promise<any> {
    return this.prospectUserRepository.delete(id);
  }

  async updateOne(prospectUser: ProspectUser): Promise<ProspectUser> {
    const { id } = prospectUser;
    let prospectUserExists = await this.prospectUserRepository.findOneOrFail(id);
    prospectUserExists = Object.assign<ProspectUser, ProspectUser>(prospectUserExists, prospectUser);

    return this.prospectUserRepository.save(prospectUserExists);
  }

  async findOneByMail(mail: string): Promise<ProspectUser> {
    return this.prospectUserRepository.findOneOrFail({ where: { mail } });
  }
}
