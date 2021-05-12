import { IUsersWords } from './usersWords.model';
import { IWord } from './word.model';

export interface IAggregatedWord extends IWord {
  userWord?: IUsersWords;
  _id: string;
}
