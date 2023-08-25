import { isUndefined } from 'lodash-es'

type GetServerSidePropsResult<T extends object> = T & { error?: Error; isNotFound: boolean }

export const getServerSideProps = async <T extends object>(
  loadFn: () => Promise<T>,
): Promise<GetServerSidePropsResult<T>> => {
  let data: T = {} as T
  try {
    data = await loadFn()
  } catch (e) {
    return { error: e as Error, isNotFound: true } as GetServerSidePropsResult<T>
  }

  return { ...data, isNotFound: isUndefined(data) }
}
