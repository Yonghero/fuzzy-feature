import { ref } from 'vue'
import type { FuzzyPlugin } from '../types/types'
import type { ActivatedReturnValue } from './useActivated'

export function injectPlugins(plugins: FuzzyPlugin[], activatedProps: ActivatedReturnValue) {
  const hasPlugins = plugins.length
  const hasTemplates = !!activatedProps?.options?.value?.templates?.length

  const templates = ref(activatedProps?.options?.value?.templates)

  if (hasPlugins && hasTemplates) {
    const installQueue = [] as any
    plugins.forEach((plugin) => {
      installQueue.push(plugin.install)
      plugin.setup && plugin.setup()
    })

    installQueue.reduce(async (asyncTemplates, install) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        const templates = await asyncTemplates
        const result = install(templates)
        if (result instanceof Promise) {
          const tmpls = await result
          resolve(tmpls)
        }
        else {
          resolve(result)
        }
      })
    }, Promise.resolve(activatedProps.options.value.templates))
      .then((finalResult) => {
        templates.value = [...finalResult]
      })
  }

  return templates
}
