import React from 'react';

export type ClassName = string | Record<string, any> | ClassName[];

export type BaseProps<T = unknown> = Pick<
  React.AllHTMLAttributes<HTMLElement>,
  'style' | 'id'
> & {
  className?: ClassName;
} & T;

export type BasePropsWithChildren<T = unknown> = BaseProps<T> & {
  children: React.ReactNode;
};

export type YNode<T = undefined> = T extends undefined
  ? React.ReactNode
  : React.ReactNode | ((props: T) => React.ReactNode);

export type YElement<T = undefined> = T extends undefined
  ? React.ReactElement
  : React.ReactElement | ((props: T) => React.ReactElement);

export type EventHandler<T = undefined> = (
  event: React.SyntheticEvent<T>,
) => void;

export type MouseEventHandler<T = undefined> = (
  event: React.MouseEvent<T>,
) => void;

export type TouchEventHandler<T = undefined> = (
  event: React.TouchEvent<T>,
) => void;
