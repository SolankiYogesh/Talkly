import type {StoreApi, UseBoundStore} from 'zustand'

export default <T extends object, K extends keyof T>(
  useStoreFn: UseBoundStore<StoreApi<T>>,
  ...items: K[]
): Pick<T, K> => {
  return items.reduce(
    (carry, item) => ({
      ...carry,

      [item]: useStoreFn((state) => state[item])
    }),
    {}
  ) as Pick<T, K>
}
