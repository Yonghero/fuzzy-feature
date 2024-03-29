import type { PaginationRenderer } from 'packages/renderer/types-renderer'
import { defineComponent, unref } from 'vue'
import type { OptionsConfiguration } from '../types/options'
import type { DataProvider, HttpProvider } from '../types/provider'

export function createPagination(Pagination: PaginationRenderer, options: OptionsConfiguration, provider: DataProvider, httpProvider: HttpProvider) {
  return defineComponent({

    setup() {
      function handleSizeChange(size) {
        provider.dispatch.setPageSize(size)
        httpProvider.get({})
      }
      function handleCurrentChange(current) {
        provider.dispatch.setCurrentPage(current)
        httpProvider.get({})
      }
      return () => (
        <Pagination.render
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
}
