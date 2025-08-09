// types/env.d.ts
export type EnvFn = {
  (key: string, defaultValue?: any): any;
  int: (key: string, defaultValue?: number) => number;
  bool: (key: string, defaultValue?: boolean) => boolean;
  array: (key: string, defaultValue?: string[]) => string[];
};
