import type { PaginationRenderer } from 'packages/renderer/types-renderer'
import { defineComponent, unref } from 'vue'
import type { OptionsConfiguration } from '../types/options'
import type { DataProvider } from '../types/provider'

export function createPagination(renderer: PaginationRenderer, options: OptionsConfiguration, provider: DataProvider) {
  const Pagination = defineComponent({

    setup() {
      function handleSizeChange(size) {
        provider.dispatch.setPageSize(size)
      }
      function handleCurrentChange(current) {
        provider.dispatch.setCurrentPage(current)
      }
      return () => (
        <renderer
          currentPage={unref(provider.currentPage)}
          pageSize={unref(provider.pageSize)}
          page-sizes={[20, 50, 100]}
          background={true}
          layout="total, sizes, prev, pager, next, jumper"
          total={unref(provider.total)}
          onSizeChange={handleSizeChange}
          onCurrentChange={handleCurrentChange}
       />
      )
    },
  })

  return (<Pagination/>)
}
