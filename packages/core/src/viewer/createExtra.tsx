import { nextTick } from 'vue'
import type { DataProvider } from '../types/provider'
import { AppProviderKey } from '../types/types'
import { getAppProviderValue } from './provider'

export function createExtra(renderer, options, extraRenderer, provider: DataProvider) {
  function onCreate() {
    provider.dialog.value.data = { }
    provider.dialog.value.type = 'create'
    provider.dialog.value.title = getAppProviderValue(AppProviderKey.Lang).create + options.title
    nextTick(() => {
      provider.dialog.value.visible = true
    })
  }

  return (
    <>
    {
        options?.feature?.create
          ? (
            <renderer.button.render type="primary" onClick={onCreate}>
              {getAppProviderValue(AppProviderKey.Lang).create}
            </renderer.button.render>
            )
          : null
      }
      {
        extraRenderer && extraRenderer.length
          ? extraRenderer.map(render => render)
          : null
      }
    </>
  )
}
