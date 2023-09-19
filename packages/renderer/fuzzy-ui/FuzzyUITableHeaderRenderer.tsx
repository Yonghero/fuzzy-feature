import { ElDivider } from 'element-plus'
import { $shallowDelete, $shallowUpdate } from 'packages/core/src/utils/expose'

export class FuzzyUITableHeaderRenderer {
  header = ({ values }) => {
    return (
      <div class="w-full h-full bg-#F5F5F5 box-border flex items-center text-#666 px-10px gap-x-10px">
        已选中 <span style="color: var(--el-color-primary)">{values.length}</span> 项
        <ElDivider direction="vertical" />
        <span class="text-red cursor-pointer" onClick={async () => {
          // 删除数据
          await $shallowDelete([...values])
          // 重新更新数据
          await $shallowUpdate({})
        }}>删除</span>
      </div>
    )
  }
}
