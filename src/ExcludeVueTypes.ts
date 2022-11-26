/**
 * 工具类型
 * 排除掉Vue组件内部使用的固定的属性名称，输出剩下的类型
 */

export type ExcludeVueTypes<T> = Omit<T, VueInstanceKeys>;
type VueInstanceKeys = keyof Vue | "_tsx";
