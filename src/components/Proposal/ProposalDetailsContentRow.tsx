'use client'

import JsonViewer from '@/components/JsonViewer'
import TableCollapseRow from '@/components/TableCollapseRow'
import { ProposalFragment } from '@/graphql'
import { useI18n } from '@/locales/client'

export default function ProposalDetailsContentRow({ proposal }: { proposal: ProposalFragment }) {
  const t = useI18n()

  return (
    <TableCollapseRow heading={t('proposal-details-content-row.heading-lbl')}>
      <JsonViewer value={proposal?.content} />
    </TableCollapseRow>
  )
}
