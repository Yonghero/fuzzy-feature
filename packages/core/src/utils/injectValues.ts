import { unref } from 'vue'
import type { ActivatedReturnValue } from './useActivated'

/**
 * 为templates内的每一项注入injectValues
 * @param activatedProps
 */
export default function injectValues(activatedProps: ActivatedReturnValue, createInjectValues) {
  const options = unref(activatedProps.options)

  if (options.inject) {
    options.templates.forEach((temp) => {
      temp.inject = createInjectValues
    })
  }

  const handlers = unref(activatedProps.handlers)
  handlers.inject = createInjectValues
}
