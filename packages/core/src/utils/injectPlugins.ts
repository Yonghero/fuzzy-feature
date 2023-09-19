import type { Adapters } from '../types/types'
import type { ActivatedReturnValue } from './useActivated'

export function injectPlugins(adapters: Adapters, activatedProps: ActivatedReturnValue) {
  const hasPlugins = !!adapters?.plugins?.length
  const hasTemplates = !!activatedProps?.options?.value?.templates.length

  if (hasPlugins && hasTemplates) {
    (adapters.plugins!).reduce((templates, plugin) => {
      return plugin.install(templates)
    }, activatedProps.options.value.templates)
  }
}
