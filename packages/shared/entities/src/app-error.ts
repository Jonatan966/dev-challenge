export interface AppErrorConfig {
  errorType: 'input' | 'general' | 'internal'
  statusCode: number
  message?: string
  fields?: Record<string, string>
}
