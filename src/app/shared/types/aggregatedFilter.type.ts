import { ITypeRegExp } from '../models';
import { Difficulty } from './difficulty.type';
import { Query } from './query.type';

export type AggregatedFilter =
  | {
      $and: AggregatedFilter[];
      $or?: never;
      $nor?: never;
      'userWord.optional.learned'?: never;
      'userWord.difficulty'?: never;
      'userWord.optional.deleted'?: boolean;
      'userWord.optional.hard'?: boolean;
      userWord?: never;
      word?: never;
    }
  | {
      $and?: never;
      $or: AggregatedFilter[];
      $nor?: never;
      'userWord.optional.learned'?: never;
      'userWord.difficulty'?: never;
      'userWord.optional.deleted'?: boolean;
      'userWord.optional.hard'?: boolean;
      userWord?: never;
      word?: never;
    }
  | {
      $and?: never;
      $or?: never;
      $nor: AggregatedFilter[];
      'userWord.optional.learned'?: never;
      'userWord.difficulty'?: never;
      'userWord.optional.deleted'?: boolean;
      'userWord.optional.hard'?: boolean;
      userWord?: never;
      word?: never;
    }
  | {
      $and?: never;
      $or?: never;
      $nor?: never;
      'userWord.optional.learned': boolean;
      'userWord.difficulty'?: never;
      'userWord.optional.deleted'?: boolean;
      'userWord.optional.hard'?: boolean;
      userWord?: never;
      word?: never;
    }
  | {
      $and?: never;
      $or?: never;
      $nor?: never;
      'userWord.optional.learned'?: never;
      'userWord.difficulty': Difficulty | Query | ITypeRegExp;
      'userWord.optional.deleted'?: boolean;
      'userWord.optional.hard'?: boolean;
      userWord?: never;
      word?: never;
    }
  | {
      $and?: never;
      $or?: never;
      $nor?: never;
      'userWord.optional.learned'?: never;
      'userWord.optional.deleted'?: boolean;
      'userWord.optional.hard'?: boolean;
      'userWord.difficulty'?: never;
      userWord: null | { $exists: true };
      word?: never;
    }
  | {
      $and?: never;
      $or?: never;
      $nor?: never;
      'userWord.optional.learned'?: never;
      'userWord.optional.deleted'?: boolean;
      'userWord.optional.hard'?: boolean;
      'userWord.difficulty'?: never;
      userWord?: never;
      word: string | Query | ITypeRegExp;
    }
  | {
      $and?: never;
      $or?: never;
      $nor?: never;
      'userWord.optional.learned'?: boolean;
      'userWord.optional.deleted'?: boolean;
      'userWord.optional.hard'?: boolean;
      'userWord.difficulty'?: never;
      userWord?: never;
      word?: never;
    };
