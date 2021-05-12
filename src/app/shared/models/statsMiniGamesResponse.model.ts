import { IStatsMiniGamesItem } from './statsMiniGamesItem.model';

export interface IStatsMiniGamesResponse {
  optional: {
    audioCall?: IStatsMiniGamesItem;
    sprint?: IStatsMiniGamesItem;
    savannah?: IStatsMiniGamesItem;
    ownGame?: IStatsMiniGamesItem;
  };
}
