export const getServerSideProps = async <T extends object>(
  loadFn: () => Promise<T>,
): Promise<T & { error?: Error }> => {
  let data: T = {} as T
  let error: Error | undefined
  try {
    data = await loadFn()
  } catch (e) {
    error = e as Error
  }

  return { ...data, error }
}
