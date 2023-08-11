import type { HttpAdapters, Response } from '../types-http'

export class HttpImp implements HttpAdapters {
  async get(url: string, params: any) {
    console.log('🚀 ~ file: main.ts:17 ~ HttpImp ~ get ~ url:', url, params)
    return {
      success: true,
      data: Array.from({ length: 5 }, (_, idx) => ({
        fzr: '负责人',
        bjr: '报警人',
        date: '2016-05-03',
        index: idx + 1,
        name: `${idx}Tom`,
      })),
      total: 200,
      size: 20,
      message: '操作成功',
    }
  }

  async post(url: string, params?: any): Promise<Pick<Response, 'message' | 'success' | 'data'>> {
    console.log('create post', url, params)
    return {
      message: '新增成功',
      success: true,
      data: {},
    }
  }

  async put(url: string, params?: any): Promise<Pick<Response, 'success' | 'message' | 'data'>> {
    console.log('update put', url, params)
    return {
      message: '编辑成功',
      success: true,
      data: {},
    }
  }

  async delete(url: string, params?: any): Promise<Pick<Response, 'success' | 'message'>> {
    console.log('delete', url, params)
    return {
      message: '删除成功',
      success: true,
    }
  }

  implResponse(response: any): Response {
    return {
      success: true,
      data: [],
      total: 50,
      size: 20,
      message: '操作成功',
    }
  }
}
