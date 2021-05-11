import { Group, Page } from 'src/app/shared/types';

export interface IGameAnswer {
  isCorrect: boolean;
  answer: {
    answer: string;
    answerTranslate: string;
  };
  audio: string;
  id: string;
}

export interface IGameAnswers {
  correctAnswers: string[];
  incorrectAnswers: string[];
  correctAnswersTranslate: string[];
  incorrectAnswersTranslate: string[];
  correctAnswerAudios: string[];
  incorrectAnswerAudios: string[];
  correctAnswersId: string[];
  incorrectAnswersId: string[];
}

export interface IGameInfo {
  name: string;
  nameForBackend: string;
  info: string;
}

export interface IGameWordDirection {
  group: Group;
  page: Page;
}
