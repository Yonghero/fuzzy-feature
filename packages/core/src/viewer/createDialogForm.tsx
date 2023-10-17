import { computed, defineComponent, unref } from 'vue'
import type { Renderer } from 'packages/renderer/types-renderer'
import { FYDialog } from '@hitotek/fuzzy-ui'
import type { OptionsConfiguration } from '../types/options'
import type { DataProvider, HttpProvider } from '../types/provider'
import { mapTemplatesOfFeature, mapTemplatesRenderer, mapTemplatesValue, templateMiddleWare } from '../utils/templates'
import { AppProviderKey } from '../types/types'
import type { Handlers } from '../types/handlers'
import { workInProgressFuzzy } from '../utils/expose'
import { getAppProviderValue } from './provider'

export function createDialogForm(renderer: Renderer, options: OptionsConfiguration, provider: DataProvider, httpProvider: HttpProvider, handlers: Handlers) {
  function setDialogConfig(type) {
    provider.dialog.type = type
    provider.dialog.title = getAppProviderValue(AppProviderKey.Lang)[type] + unref(options.title).slice(0, 2)
    provider.dialog.visible = true
  }

  async function invokeUpdateEvent(e) {
    provider.dialog.data = { ...e }

    // 编辑前hook注入
    if (handlers.updateBeforePop) {
      const row = await handlers.updateBeforePop({ data: { ...e } })
      provider.dialog.data = { ...row }
    }
    setDialogConfig('update')
  }

  workInProgressFuzzy.invokeUpdate = invokeUpdateEvent

  return {
    invokeUpdateEvent,
    invokeCreateEvent() {
      provider.dialog.data = { }
      setDialogConfig('create')
    },
    render: defineComponent({
      setup() {
        const dialogConfig = computed(() => ({
          fullTitle: provider.dialog.title,
          type: provider.dialog.type,
          template: templateMiddleWare([mapTemplatesOfFeature, mapTemplatesRenderer, mapTemplatesValue])(options.templates, provider.dialog.type),
        }))

        async function handleSubmit(formModel) {
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
              handlers.updated({ type: provider.dialog.type, formModel, response })

            provider.dispatch.setDialog({ visible: false, data: {} })
            await httpProvider.get({})
            renderer.message.render.success(`${unref(provider.dialog.title)}${getAppProviderValue(AppProviderKey.Lang).success || '成功'}`)
            return
          }
          if (response.message) {
            // 表单提交失败
            renderer.message.render.warning(response.message)
          }
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
    }),
  }
}
