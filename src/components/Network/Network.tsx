'use client'

import { Chip } from '@mui/material'
import { useMemo } from 'react'

import { getNetworkByName } from '@/callers'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import JsonViewer from '@/components/JsonViewer'
import OverviewTable from '@/components/OverviewTable'
import TableCollapseRow from '@/components/TableCollapseRow'
import { TABLE_BIG_SKELETON_SX, TABLE_TYPE_BOX_SKELETON_SX } from '@/const'
import { NetworkFragment } from '@/graphql'
import { useLoading, useLocalize, useSkeleton } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function Network({ name }: { name: string }) {
  const t = useI18n()
  const { localizeNetworkType } = useLocalize()

  const {
    data: network,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading<NetworkFragment>({} as NetworkFragment, () => getNetworkByName(name))

  const networkType = useMemo(
    () => localizeNetworkType(network?.type),
    [localizeNetworkType, network?.type],
  )

  const withSkeleton = useSkeleton(isLoading)

  const rows = [
    {
      head: t('network.name-col-lbl'),
      body: withSkeleton(network?.name, TABLE_BIG_SKELETON_SX),
    },
    {
      head: t('network.type-col-lbl'),
      body: withSkeleton(<Chip label={networkType} />, TABLE_TYPE_BOX_SKELETON_SX),
    },
  ]

  return (
    <ContentSection withBackButton title={t('network.title')}>
      <ContentBox>
        <ContentWrapper>
          <OverviewTable
            label={t('network.title')}
            noDataMessage={t('network.no-data-msg')}
            isEmpty={isEmpty}
            isLoadingError={isLoadingError}
            rows={rows}
            sx={{
              '& > tr > th': {
                width: '500px',
              },
            }}
          />
          <OverviewTable
            sx={{
              '& > tr:last-child td, & > tr:last-child th, & > tr:nth-last-of-type(-n + 2) td': {
                borderBottom: 0,
              },
            }}
          >
            <TableCollapseRow heading={t('network.parameters-col-lbl')}>
              <JsonViewer value={network.params} />
            </TableCollapseRow>
          </OverviewTable>
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
