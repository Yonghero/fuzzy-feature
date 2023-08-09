import { computed, defineComponent, unref } from 'vue'
import type { Renderer } from 'packages/renderer/types-renderer'
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
        fullTitle: provider.dialog.value.title,
        type: provider.dialog.value.type,
        template: templateMiddleWare([mapTemplatesOfFeature, mapTemplatesRenderer])(options.templates, provider.dialog.value.type),
      }))

      async function handleSubmit(formModel) {
        console.log('🚀 ~ file: createDialogForm.tsx:17 ~ handleSubmit ~ formModel:', formModel)

        const response = await new Promise((resolve) => {
          if (provider.dialog.value.type === 'update') {
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

          provider.dispatch.setDialog({ visible: false })
          await httpProvider.get({})
          renderer.message.render.success(`${unref(provider.dialog.value.title)}${getAppProviderValue(AppProviderKey.Lang).success || '成功'}`)
          return
        }
        // 表单提交失败
        renderer.message.render.warning(response.message)
      }

      function handleCancel() {
        if (handlers.createCancel && provider.dialog.value.type === 'create')
          handlers.createCancel({ data: {} })

        if (handlers.updateCancel && provider.dialog.value.type === 'update')
          handlers.updateCancel({ data: {} })

        provider.dispatch.setDialog({ visible: false })
      }
      return () => (
        <renderer.dialogForm.render
          v-model={provider.dialog.value.visible}
          dialogConfig={unref(dialogConfig)}
          formModel={provider.dialog.value.data}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )
    },
  })
}
