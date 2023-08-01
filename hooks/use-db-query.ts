import { Accessor, createSignal } from 'solid-js'

export interface UseDbQueryReturn {
  isFinished: Accessor<boolean>
  result: Accessor<any>
  error: Accessor<any>
  isQuerying: Accessor<boolean>
  execute: () => Promise<any>
}

export interface UseDbQueryOptions {
  query: () => Promise<any>
  // @default true
  immediate?: boolean
  onSuccess?: (result: any) => void
  onError?: (error: any) => void
}

export function useDbQuery(options: UseDbQueryOptions): UseDbQueryReturn {
  const [isFinished, setIsFinished] = createSignal(false)
  const [isQuerying, setIsQuerying] = createSignal(false)
  const [error, setError] = createSignal<any>(null)
  const [result, setResult] = createSignal<any>(null)

  const loading = (isLoading: boolean) => {
    setIsQuerying(isLoading)
    setIsFinished(!isLoading)
  }

  const execute = async () => {
    loading(true)
    setError(null)

    return await new Promise<any>((resolve, _reject) => {
      options
        .query()
        .then((res) => {
          let data = res as any
          options.onSuccess?.(data)
          setResult(data)
          return resolve(res)
        })
        .catch((err) => {
          setError(err)
          options.onError?.(err)
          return resolve(null)
        })
        .finally(() => {
          loading(false)
        })
    })
  }

  if (options.immediate || options.immediate === undefined) Promise.resolve().then(() => execute())

  return {
    isFinished,
    result,
    error,
    isQuerying,
    execute,
  }
}
