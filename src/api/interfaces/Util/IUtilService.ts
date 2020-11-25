import { State } from "../../entities/State";

export interface IUtilService {
  fetchStates(): Promise<State[]>;
  fetchState(abbreviation: string): Promise<State | undefined>;
}
