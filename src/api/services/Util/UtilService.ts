import { IUtilService } from "../../interfaces/Util/IUtilService";
import { Service } from "typedi";
import { Repository, getRepository } from "typeorm";
import { State } from "../../entities/State";

@Service()
export class UtilService implements IUtilService {
  private readonly stateRepository: Repository<State>;

  constructor() {
    this.stateRepository = getRepository(State);
  }

  fetchStates(): Promise<State[]> {
    return this.stateRepository.find();
  }

  async fetchState(abbreviation: string): Promise<State | undefined> {
    return this.stateRepository.findOne({ abbreviation });
  }
}
