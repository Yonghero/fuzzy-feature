import type { Renderer } from 'packages/renderer'
import { defineComponent, reactive, ref } from 'vue'
import type { DataProvider, HttpProvider } from '../types/provider'
import type { Handlers } from '../types/handlers'
import { AppProviderKey } from '../types/types'
import type { OptionsConfiguration } from '../types/options'
import { workInProgressFuzzy } from '../utils/expose'
import { getAppProviderValue } from './provider'

export default function createDelete(renderer: Renderer, options: OptionsConfiguration, provider: DataProvider, httpProvider: HttpProvider, handlers: Handlers) {
  const visibleDeleteDialog = ref(false)

  let deleteData = {}

  const deletePrompt = reactive({
    // 标题
    title: '确认删除',
    // 业务类型
    type: 'delete',
    // 删除对象字段名
    businessType: '',
    // tag文字
    tagText: '本条数据',
    customDesc: '',
  })

  async function handleDeleteConfirm() {
    // 删除前hook注入
    if (handlers.deleteBefore)
      deleteData = await handlers.deleteBefore({ data: deleteData })

    const response = await httpProvider.delete(deleteData)
    const lang = getAppProviderValue(AppProviderKey.Lang)

    // 删除成功
    if (response.success) {
      renderer.message.render.success(lang.delete + lang.success)

      // 重新新的表格请求数据
      if (provider.tableData.value.length === 1 && provider.currentPage.value !== 1)
        await httpProvider.get({ [getAppProviderValue(AppProviderKey.Paging).current]: provider.currentPage.value - 1 })
      else
        await httpProvider.get({})
    }
    else {
      if (response.message)
        renderer.message.render.warning(response.message)
    }

    visibleDeleteDialog.value = false
  }

  function handleDeleteCancel() {
    visibleDeleteDialog.value = false
  }

  class LangText {
    data
    constructor(data) {
      this.data = data
    }

    getText(filed: string): string {
      const filedText = options.lang?.deletePrompt?.[filed]
      if (typeof filedText === 'function')
        return filedText(this.data)

      if (typeof filedText === 'string')
        return filedText

      return deletePrompt[filed]
    }
  }

  function setDeletePromptText(e) {
    const textReader = new LangText(e)
    deletePrompt.title = textReader.getText('title')
    deletePrompt.customDesc = textReader.getText('customDest')
    deletePrompt.tagText = textReader.getText('tagText')
  }

  function invokeDeleteEvent(e) {
    deleteData = e
    setDeletePromptText(e)

    setTimeout(() => {
      visibleDeleteDialog.value = true
    }, 50)
  }

  workInProgressFuzzy.shallowDelete = invokeDeleteEvent

  return {
    invokeDeleteEvent,
    render: defineComponent({
      setup() {
        return () => (
          <renderer.dialogForm.render
            v-model={visibleDeleteDialog.value}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
            dialogConfig={deletePrompt}
         />
        )
      },
    }),
  }
}
