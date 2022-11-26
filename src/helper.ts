import { Types } from "@yuyi919/shared-types";
import {
  ComponentComputedOptions,
  ComponentCustomProperties,
  ComponentMethodOptions,
} from "vue";
import {
  ComponentOptionsBase,
  ComponentOptionsMixin,
} from "vue/types/v3-component-options";
import {
  ComponentPublicInstanceConstructor,
  Vue3Instance,
} from "vue/types/v3-component-public-instance";
import { EmitsOptions } from "vue/types/v3-setup-context";
import { TsxOnEvents } from "./TsxOnEvents";
import { TypedPropGroup } from "./TypedPropGroup";

type InnerScopedSlotReturnType = Vue["$scopedSlots"] extends {
  [name: string]: ((...args: any[]) => infer T) | undefined;
}
  ? T
  : never;
type InnerScopedSlots<T> = {
  [K in keyof T]: (
    props: Exclude<T[K], undefined>,
  ) => InnerScopedSlotReturnType;
};

type InternalVueComponent2<
  IProps,
  Emits,
  ScopedSlotArgs,
  Public,
  DProps = TypedPropGroup<IProps>,
  EProps = Readonly<IProps>,
  E extends EmitsOptions = Emits extends string[]
    ? Emits
    : Emits extends Record<string, any>
    ? {
        [K in keyof Emits]: (args: Emits[K]) => any;
      }
    : any,
> = ComponentPublicInstanceConstructor<
  Vue3Instance<
    Types.Recordable,
    EProps,
    EProps & TsxOnEvents<E>,
    E,
    Types.Recordable,
    true,
    ComponentOptionsMixin
  > &
    Readonly<
      EProps &
        Public &
        ComponentCustomProperties & {
          $scopedSlots: {
            [K in keyof ScopedSlotArgs]: InnerScopedSlots<ScopedSlotArgs>[K];
          };
        }
    >,
  any,
  any,
  any,
  ComponentComputedOptions,
  ComponentMethodOptions
> &
  ComponentOptionsBase<
    EProps,
    Public,
    Types.Recordable,
    Types.Recordable,
    Types.Recordable,
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    E,
    string,
    Types.Recordable
  > & {
    props: DProps;
  };

export type VueComponent2<
  IProps,
  Emits = Types.Recordable,
  ScopedSlots = Types.Recordable,
  Public = Types.Recordable,
> = InternalVueComponent2<IProps, Emits, ScopedSlots, Public>;

export type { TypedPropGroup };
