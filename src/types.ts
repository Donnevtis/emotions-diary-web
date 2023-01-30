export type NestedEmotions = {
  label: string;
  value: string;
  children: {
    label: string;
    value: string;
  }[];
}[];

export enum PATHS {
  root = '/',
  settings = 'settings/',
}
