import { computed, defineComponent, unref } from 'vue'
import type { DialogFormRenderer } from 'packages/renderer/types-renderer'
import type { OptionsConfiguration } from '../types/options'
import type { DataProvider } from '../types/provider'
import { mapTemplatesOfFeature, mapTemplatesRenderer, templateMiddleWare } from '../utils/templates'

export function createDialogForm(DialogForm: DialogFormRenderer, options: OptionsConfiguration, provider: DataProvider) {
  return defineComponent({
    setup() {
      const dialogConfig = computed(() => ({
        title: provider.dialog.value.title,
        type: provider.dialog.value.type,
        template: templateMiddleWare([mapTemplatesOfFeature, mapTemplatesRenderer])(options.templates, provider.dialog.value.type),
      }))

      function handleSubmit() {
        // console.log(provider.dialog.value.data, 'submit')
      }
      function handleCancel() {
        provider.dispatch.setDialog({ visible: false })
      }
      return () => (
        <DialogForm.render
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
