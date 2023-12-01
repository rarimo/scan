'use client'

import { Link as MuiLink } from '@mui/material'
import Link from 'next/link'

import { getCollectionByIndex } from '@/callers'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import CopyToClipboardWrapper from '@/components/CopyToClipboardWrapper'
import JsonViewer from '@/components/JsonViewer'
import OverviewTable from '@/components/OverviewTable'
import TableCollapseRow from '@/components/TableCollapseRow'
import {
  TABLE_BIG_SKELETON_SX,
  TABLE_MEDIUM_TEXT_SKELETON_SX,
  TABLE_SMALL_TEXT_SKELETON_SX,
} from '@/const'
import { CollectionFragment } from '@/graphql'
import { generatePath } from '@/helpers'
import { useLoading, useSkeleton } from '@/hooks'
import { useI18n } from '@/locales/client'
import { RoutePaths } from '@/types'

export default function SupportedToken({ index }: { index: string }) {
  const t = useI18n()

  const {
    data: collection,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading<CollectionFragment>({} as CollectionFragment, () => getCollectionByIndex(index))

  const withSkeleton = useSkeleton(isLoading)

  const rows = [
    {
      head: t('supported-token.index-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={collection?.index}>
          {collection?.index}
        </CopyToClipboardWrapper>,
        TABLE_BIG_SKELETON_SX,
      ),
    },
    {
      head: t('supported-token.name-col-lbl'),
      body: withSkeleton(collection?.meta?.name ?? '', TABLE_MEDIUM_TEXT_SKELETON_SX),
    },
    {
      head: t('supported-token.symbol-col-lbl'),
      body: withSkeleton(collection?.meta?.symbol ?? '', TABLE_SMALL_TEXT_SKELETON_SX),
    },
    ...(collection?.meta?.metadata_uri
      ? [
          {
            head: t('supported-token.metadata-uri-col-lbl'),
            body: withSkeleton(
              <CopyToClipboardWrapper value={collection?.meta?.metadata_uri}>
                <MuiLink
                  component={Link}
                  href={generatePath(RoutePaths.Transaction, {
                    hash: String(collection?.meta?.metadata_uri),
                  })}
                >
                  {collection?.meta?.metadata_uri}
                </MuiLink>
              </CopyToClipboardWrapper>,
              TABLE_BIG_SKELETON_SX,
            ),
          },
        ]
      : []),
  ]

  return (
    <ContentSection withBackButton title={t('supported-token.title')}>
      <ContentBox>
        <ContentWrapper>
          <OverviewTable
            label={t('supported-token.title')}
            noDataMessage={t('supported-token.no-data-msg')}
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
            <TableCollapseRow heading={t('supported-token.chains-col-lbl')}>
              <JsonViewer value={collection.data} />
            </TableCollapseRow>
          </OverviewTable>
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
