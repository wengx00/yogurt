export type BaseSize<T = never> = 'small' | 'medium' | 'large' | T;

export type BaseShape<T = never> = 'rectangle' | 'round' | 'circle' | T;

export type BaseVariant<T = never> =
  | 'outlined'
  | 'contained'
  | 'text'
  | 'default'
  | T;
