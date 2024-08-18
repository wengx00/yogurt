import { BasePropsWithChildren } from '../types/base';

export type StackProps = {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  space?: number | string;
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
};

export interface YStackProps extends BasePropsWithChildren<StackProps> {}
