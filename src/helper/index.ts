export * from "./ExcludeVueTypes";
export * from "./helper";
export * from "./extractPropClass";

export type ResolveSubModule<
  T extends new () => any,
  K extends keyof T
> = T[K] extends new () => infer Cls ? Cls : never;
