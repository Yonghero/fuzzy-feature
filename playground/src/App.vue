<script setup>
import { FYInput, FYTree } from '@hitotek/fuzzy-ui'

// import { $insideReactiveValue } from 'packages/core'

// watch(() => $insideReactiveValue()?.value, (val) => {
//   console.log('🚀 ~ file: App.vue:10 ~ watch ~ val:', val)
// })

const helloRef = ref('hello')

function onSelection(v) {
  // console.log('🚀 ~ file: App.vue:13 ~ onSelection ~ v:', v)
}
</script>

<template>
  <main w="full" h="full">
    <FuzzyViewer @selection="onSelection">
      <template #tree>
        <div class="w-full h-full flex flex-col gap-y-2 bg-[#FAFAFA] items-center">
          <div class="w-full flex justify-between h-15 px-5 items-center">
            站点列表
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="cursor-pointer">
              <path d="M7.36747 6.9283L8.50737 8.14963C7.8038 8.59826 7.22118 9.23516 6.81666 9.99784C6.41215 10.7605 6.19964 11.6228 6.2 12.5C6.2 15.2527 8.25104 17.4925 10.8049 17.5608L10.925 17.5625H12.7055L11.4959 16.2665L12.6095 15.0734L13.0776 15.575L13.0764 15.5767L16.154 18.8737C15.5653 19.0943 14.9373 19.2238 14.2837 19.2462L14.2801 19.2496L14.277 19.2466L14.1762 19.2492L14.075 19.25H10.925C7.44543 19.25 4.625 16.2281 4.625 12.5C4.625 10.1864 5.71175 8.14456 7.36747 6.9283ZM14.075 5.75C17.5546 5.75 20.375 8.77189 20.375 12.5C20.375 14.8136 19.2882 16.8554 17.6325 18.0717L16.4926 16.8504C17.1962 16.4017 17.7788 15.7648 18.1833 15.0022C18.5879 14.2395 18.8004 13.3772 18.8 12.5C18.8 9.70423 16.6844 7.4375 14.075 7.4375H12.2945L13.5037 8.73308L12.3901 9.92614L10.2119 7.59191L10.2131 7.59106L8.846 6.12631C9.44817 5.90111 10.0788 5.7755 10.7163 5.7538L10.7191 5.75L10.723 5.75337L10.8234 5.75084L10.925 5.75H14.075Z" fill="#1677E8" />
            </svg>
          </div>
          <div class="w-[92%] bg-[#DCDFE6] h-1px" />
          <FYInput class="px-[6px] tree-custom-input" placeholder="请输入站点..." />
          <FYTree class="h-[calc(100%-3.75rem)]" />
        </div>
      </template>
    </FuzzyViewer>
  </main>
</template>

<style lang="scss">
.fy-tree-wrap {
  background: #FAFAFA;
  .el-tree {
    background: #FAFAFA;
  }
}
.tree-custom-input{
  .el-input__wrapper {
    box-shadow: none;
    background: #E8ECF2;
    height: 34px;
  }
}
</style>
