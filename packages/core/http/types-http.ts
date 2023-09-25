import type { Templates } from '../src/types/options'

/**
 * http 实现层
 */
export interface HttpAdapters {
  get (url: string, params, templates: Templates): Promise<Required<Response>>
  post (url: string, params?): Promise<Pick<Response, 'message' | 'success' | 'data'>>
  delete (url: string, params?): Promise<Pick<Response, 'success' | 'message'>>
  put (url: string, params?): Promise<Pick<Response, 'message' | 'success' | 'data'>>
  implResponse(response): Response
}

export interface Response {
  data: any
  message: string
  total: number
  size: number
  success: boolean
}
