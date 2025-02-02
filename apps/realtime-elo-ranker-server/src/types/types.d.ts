export type Error = {
  code: number;
  message: string;
};

export enum RankingEventType {
  RankingUpdate = 'RankingUpdate',
  Error = 'Error',
}
