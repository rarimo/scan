'use client'

import { useMemo } from 'react'

import JsonViewer from '@/components/JsonViewer'
import TableCollapseRow from '@/components/TableCollapseRow'
import { TransactionFragment } from '@/graphql'
import { useI18n } from '@/locales/client'

export default function TransactionDetailsContentRow({
  transaction,
}: {
  transaction: TransactionFragment
}) {
  const t = useI18n()

  const log = useMemo(() => {
    try {
      return JSON.parse(transaction.raw_log ?? '{}')
    } catch (e) {
      return { details: transaction.raw_log }
    }
  }, [transaction])

  return (
    <>
      <TableCollapseRow heading={t('transaction-details-content-row.heading-raw-log-lbl')}>
        <JsonViewer value={log} />
      </TableCollapseRow>
      <TableCollapseRow heading={t('transaction-details-content-row.heading-messages-lbl')}>
        <JsonViewer value={transaction.messages} />
      </TableCollapseRow>
    </>
  )
}
