export interface IUsersWords {
  difficulty: string;
  id?: string;
  optional: {
    learned?: boolean;
    hard?: boolean;
    deleted?: boolean;
  };
  wordId?: string;
}
