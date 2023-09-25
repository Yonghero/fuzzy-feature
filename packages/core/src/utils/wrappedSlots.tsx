import { unref } from 'vue'
import type { ActivatedReturnValue } from './useActivated'

/**
 * 插槽包裹 options内的slots 注入injectValues
 * @param activatedProps
 * @param slots
 * @returns
 */
export default function wrappedSlots(activatedProps: ActivatedReturnValue, slots, createInjectValues) {
  const options = unref(activatedProps.options)
  const wrapperSlots = {}

  if (options.slots) {
    const props = createInjectValues()

    Object.keys(options.slots).forEach((key) => {
      wrapperSlots[key] = () => options!.slots[key](props)
    })
  }

  return {
    ...wrapperSlots,
    ...slots,
  }
};
