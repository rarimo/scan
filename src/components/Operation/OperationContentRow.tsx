'use client'

import { isObject, mapValues, omit } from 'lodash-es'
import { useMemo } from 'react'

import JsonViewer from '@/components/JsonViewer'
import TableCollapseRow from '@/components/TableCollapseRow'
import { GetOperationByIndexQuery } from '@/graphql'

const recursiveOmit = <T = unknown,>(obj: T, ...keys: string[]): T => {
  if (!isObject(obj)) return obj
  return mapValues(omit(obj, ...keys), v => (isObject(v) ? omit(v, ...keys) : v)) as T
}

export default function OperationContentRow({
  operation,
  label,
}: {
  operation: GetOperationByIndexQuery['operation'][number]
  label: string
}) {
  const content = useMemo(() => {
    const content =
      operation?.transfer ??
      operation?.change_parties ??
      operation?.contract_upgrade ??
      operation?.fee_token_management ??
      operation?.identity_default_transfer ??
      operation?.identity_gist_transfer ??
      operation?.identity_state_transfer

    return content ? recursiveOmit(content, '__typename') : null
  }, [operation])

  return content ? (
    <TableCollapseRow heading={label}>
      <JsonViewer value={content} />
    </TableCollapseRow>
  ) : (
    <></>
  )
}
