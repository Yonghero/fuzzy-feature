import { computed, nextTick, reactive, ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { workInProgressFuzzy } from '../utils/expose'
import { AppProviderKey } from '../types/types'
import type { DataProvider, DialogProps } from '../types/provider'
import { getAppProviderValue } from './provider'

/**
 * 提供框架的全局数据
 */
export function createDataProvider(): DataProvider {
  const paging = getAppProviderValue(AppProviderKey.Paging)

  // 当前页
  const currentPage = ref(1)
  // 当前页展示数量
  const pageSize = ref(20)

  // 查询条件
  const filterParams = ref({
    [paging.current]: 1,
    [paging.size]: paging.sizeNum || 20,
  })

  // 表格数据
  const tableData = ref([]) as any
  // 表格总数
  const total = ref(100)
  // 表格是否加载数据中
  const tableLoading = ref(true)

  // 对话框
  const dialog = reactive<DialogProps>({
    visible: false,
    type: 'update',
    title: '编辑',
    data: {},
  })

  const dialogVisible = ref(false)

  const watchValues = computed(() => {
    return {
      filterParams: filterParams.value,
      tableData: tableData.value,
      total: total.value,
      currentPage: currentPage.value,
      pageSize: pageSize.value,
    }
  })

  watchDebounced(watchValues,
    (val) => {
      workInProgressFuzzy.dataProvider.value = val
    },
    { debounce: 500, maxWait: 1000 },
  )

  return {
    dispatch: {
      setFilterParams(params) {
        filterParams.value = { ...filterParams.value, ...params }
      },
      async setTableData(data) {
        tableData.value = []
        await nextTick()
        tableData.value = data
      },
      setTotal(num) {
        total.value = num
      },
      setTableLoading(loading) {
        tableLoading.value = loading
      },
      setDialog(props: Partial<DialogProps>) {
        Object.keys(props).forEach((key) => {
          dialog[key] = props[key]
        })
        // dialog = { ...dialog, ...props }
      },
      setCurrentPage(page) {
        currentPage.value = page
        filterParams.value[paging.current] = page
      },
      setPageSize(size) {
        pageSize.value = size
        filterParams.value[paging.size] = size
      },
    },
    filterParams,
    tableData,
    total,
    pageSize,
    currentPage,
    tableLoading,
    dialog,
    dialogVisible,
  }
}
