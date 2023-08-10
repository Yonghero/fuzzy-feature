import { computed, defineComponent, unref } from 'vue'
import type { Renderer } from 'packages/renderer/types-renderer'
import { FYDialog } from '@hitotek/fuzzy-ui'
import type { OptionsConfiguration } from '../types/options'
import type { DataProvider, HttpProvider } from '../types/provider'
import { mapTemplatesOfFeature, mapTemplatesRenderer, templateMiddleWare } from '../utils/templates'
import { AppProviderKey } from '../types/types'
import type { Handlers } from '../types/handlers'
import { getAppProviderValue } from './provider'

export function createDialogForm(renderer: Renderer, options: OptionsConfiguration, provider: DataProvider, httpProvider: HttpProvider, handlers: Handlers) {
  return defineComponent({
    setup() {
      const dialogConfig = computed(() => ({
        fullTitle: provider.dialog.title,
        type: provider.dialog.type,
        template: templateMiddleWare([mapTemplatesOfFeature, mapTemplatesRenderer])(options.templates, provider.dialog.type),
      }))

      async function handleSubmit(formModel) {
        console.log('🚀 ~ file: createDialogForm.tsx:17 ~ handleSubmit ~ formModel:', formModel)

        const response = await new Promise((resolve) => {
          if (provider.dialog.type === 'update') {
            if (handlers.updateConfirm) {
              handlers.updateConfirm({ data: { ...formModel } })
                .then((data) => {
                  httpProvider.put({ ...data }).then(resolve)
                })
            }
            else {
              httpProvider.put({ ...formModel }).then(resolve)
            }
          }
          else {
            if (handlers.createConfirm) {
              handlers.createConfirm({ data: { ...formModel } })
                .then((data) => {
                  httpProvider.post({ ...data }).then(resolve)
                })
            }
            else {
              httpProvider.post({ ...formModel }).then(resolve)
            }
          }
        }) as any

        // 表单提交成功
        if (response.success) {
          if (handlers.updated)
            handlers.updated()

          provider.dispatch.setDialog({ visible: false, data: {} })
          await httpProvider.get({})
          renderer.message.render.success(`${unref(provider.dialog.title)}${getAppProviderValue(AppProviderKey.Lang).success || '成功'}`)
          return
        }
        // 表单提交失败
        renderer.message.render.warning(response.message)
      }

      function handleCancel() {
        if (handlers.createCancel && provider.dialog.type === 'create')
          handlers.createCancel({ data: {} })

        if (handlers.updateCancel && provider.dialog.type === 'update')
          handlers.updateCancel({ data: {} })

        provider.dispatch.setDialog({ data: {}, visible: false })
      }

      return () => (
        <FYDialog
          v-model={provider.dialog.visible}
          dialogConfig={unref(dialogConfig)}
          formModel={provider.dialog.data}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )
    },
  })
}
