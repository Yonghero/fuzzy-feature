import type { FuzzyPlugin } from '../types/types'
import type { ActivatedReturnValue } from './useActivated'

export function injectPlugins(plugins: FuzzyPlugin[], activatedProps: ActivatedReturnValue) {
  const hasPlugins = plugins.length
  const hasTemplates = !!activatedProps?.options?.value?.templates?.length

  if (hasPlugins && hasTemplates) {
    (plugins!).reduce((templates, plugin) => {
      return plugin.install(templates)
    }, activatedProps.options.value.templates)
  }
}
