import { computed, ref } from 'vue'
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

  setTimeout(() => {
    tableData.value = Array.from({ length: 5 }, (_, idx) => ({
      fzr: '负责人',
      bjr: '报警人',
      date: '2016-05-03',
      index: idx + 1,
      name: `${idx}Tom`,
    }))
    tableLoading.value = false
  }, 2000)

  const dialog = ref<DialogProps>({
    visible: false,
    type: 'update',
    title: '编辑',
    data: {},
  })

  const dialogVisible = ref(false)

  const dispatch = {
    setFilterParams(params) {
      filterParams.value = { ...filterParams.value, ...params }
    },
    setTableData(data) {
      tableData.value = data
    },
    setTotal(num) {
      total.value = num
    },
    setTableLoading(loading) {
      tableLoading.value = loading
    },
    setDialog(props: Partial<DialogProps>) {
      dialog.value = { ...dialog.value, ...props }
    },
    setCurrentPage(page) {
      currentPage.value = page
    },
    setPageSize(size) {
      pageSize.value = size
    },
  }

  workInProgressFuzzy.dataProvider.value = computed(() => {
    return {
      filterParams: filterParams.value,
      tableData: tableData.value,
      total: total.value,
    }
  })

  return {
    dispatch,
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
