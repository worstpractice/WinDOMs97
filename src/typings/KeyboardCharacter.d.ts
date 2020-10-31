export type KeyPress = {
  order: number;
} & (
  | {
      character: string;
      button?: never;
    }
  | {
      character?: never;
      button: string;
    }
);
