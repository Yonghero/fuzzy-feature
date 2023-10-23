import { unref } from 'vue'
import type { ActivatedReturnValue } from './useActivated'

/**
 * 执行templates内的属性函数
 * @example
 * {
 *   disabled: () => false -> disabled: false
 * }
 * @param activatedProps
 */
export function executeAttrFunction(activatedProps: ActivatedReturnValue) {
  const options = unref(activatedProps.options)

  options.templates.forEach((temp) => {
    destructorFunction(temp, 'disabled')
    destructorFunction(temp, 'require')
  })
}

export function destructorFunction(template, attr) {
  if (attr in template && typeof template[attr] === 'function')
    template[attr] = template[attr]()
}
