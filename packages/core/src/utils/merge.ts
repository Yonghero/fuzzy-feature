import { unref } from 'vue'

/**
 * 合并options
 * @param rest
 * @returns
 */
export function mergeFuzzyOptions(...rest) {
  return rest
}

export function transferToArray(value, deep = false) {
  if (deep)
    return [unref(value)]

  if (Array.isArray(value) || Array.isArray(value[0]))
    return value.map(v => unref(v))
  if (Array.isArray(value))
    return unref(value)
  return [unref(value)]
}

export const isDeep = arr => arr.some(item => Array.isArray(item))
