import { unref } from 'vue'
import type { HttpAdapters } from 'packages/core/http/types-http'
import type { Api, OptionsConfiguration } from '../types/options'
import type { DataProvider } from '../types/provider'
import { workInProgressFuzzy } from '../utils/expose'
import { mapTemplatesOfFeature, mapTemplatesValue, templateMiddleWare } from '../utils/templates'

export function createHttp(options: OptionsConfiguration, handlers, http: HttpAdapters, dataProvider: DataProvider) {
  function getApi(mode: keyof Api) {
    if (typeof unref(options.api) === 'string')
      return unref(options.api)
    return unref(options.api[mode])
  }

  const templates = templateMiddleWare([mapTemplatesOfFeature, mapTemplatesValue])(options.templates, 'filter')

  async function get(reqParams) {
    dataProvider.filterParams.value = {
      ...dataProvider.filterParams.value,
      ...reqParams,
    }

    let isPrevent = false
    const prevent = () => isPrevent = true

    // 请求前拦截 hook
    if (handlers?.queryBefore)
      dataProvider.filterParams.value = await handlers.queryBefore({ data: { ...dataProvider.filterParams.value }, prevent })

    // 阻止请求
    if (isPrevent)
      return

    // 表格loading...
    dataProvider.dispatch.setTableLoading(true)

    const response = await http.get(getApi('filter'), { ...dataProvider.filterParams.value }, templates)

    // 请求成功！
    if (response.success) {
      // 设置表格数据
      dataProvider.dispatch.setTableData(response?.data)
      // 设置数据总数量
      dataProvider.dispatch.setTotal(response.total)
    }
    else {
      dataProvider.dispatch.setTableData([])
      dataProvider.dispatch.setTotal(0)
    }

    // 关闭表格loading...
    dataProvider.dispatch.setTableLoading(false)

    return response
  }

  async function put(reqParams) {
    return http.put(getApi('update'), reqParams)
  }

  async function post(reqParams) {
    return http.post(getApi('create'), reqParams)
  }

  async function deleteHttp(reqParams) {
    return http.delete(getApi('delete'), reqParams)
  }

  // 暴露get请求
  workInProgressFuzzy.shallowUpdate = get

  return {
    get,
    post,
    delete: deleteHttp,
    put,
  }
}
