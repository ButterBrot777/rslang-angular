import { IAggregatedWord } from './aggregatedWord.model';

export interface IAggregatedWordResponse {
  paginatedResults: Array<IAggregatedWord>;
  totalCount: Array<{ count: number }>;
}
