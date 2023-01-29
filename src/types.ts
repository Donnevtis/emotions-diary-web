export type NestedEmotions = {
  label: string;
  value: string;
  children: {
    label: string;
    value: string;
  }[];
}[];

export enum EmotionReducerType {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
