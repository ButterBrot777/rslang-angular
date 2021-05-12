import { IStatsMiniGamesItem } from '../models';

export type Optional =
  | {
      audioCall: IStatsMiniGamesItem;
      sprint?: never;
      savannah?: never;
      ownGame?: never;
    }
  | {
      audioCall?: never;
      sprint: IStatsMiniGamesItem;
      savannah?: never;
      ownGame?: never;
    }
  | {
      audioCall?: never;
      sprint?: never;
      savannah: IStatsMiniGamesItem;
      ownGame?: never;
    }
  | {
      audioCall?: never;
      sprint?: never;
      savannah?: never;
      ownGame: IStatsMiniGamesItem;
    };
