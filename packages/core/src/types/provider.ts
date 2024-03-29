import type { Ref, UnwrapNestedRefs } from 'vue'
import type { Response } from 'packages/core/http/types-http'
import type { Type } from '../utils/templates'

export interface ValueOfProvide {
  filterParams: Ref<Record<string, any>>
  tableData: Ref<any[]>
  currentPage: Ref<number>
  total: Ref<number>
  tableLoading: Ref<boolean>
  dialog: UnwrapNestedRefs<DialogProps>
  dialogVisible: Ref<boolean>
  pageSize: Ref<number>
}

export interface DispatchOfProvide {
  setFilterParams: (params: any) => void
  setTableData: (data: any) => void
  setTotal: (num) => void
  setTableLoading: (loading: boolean) => void
  setDialog: (dialog: Partial<DialogProps>) => void
  setCurrentPage: (page: number) => void
  setPageSize: (size: number) => void
}

export interface DataProvider extends ValueOfProvide {
  dispatch: DispatchOfProvide
}

export interface DialogProps {
  visible: boolean
  data: any
  type: Type
  title: string
}

export interface WorkInData {
  filterParams: Record<string, any>
  tableData: any[]
  currentPage: number
  total: number
  // tableLoading: boolean
}

export interface HttpProvider {
  get (params?): Promise<Required<Response> | undefined>
  post (params?): Promise<Pick<Response, 'message' | 'success' | 'data'>>
  delete (params?): Promise<Pick<Response, 'success' | 'message'>>
  put (params?): Promise<Pick<Response, 'message' | 'success' | 'data'>>
}
