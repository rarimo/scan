'use client'

import { Chip, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import { useMemo } from 'react'

import { getOperationByIndex } from '@/callers'
import { AvatarName } from '@/components/Avatar'
import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import CopyToClipboardWrapper from '@/components/CopyToClipboardWrapper'
import OverviewTable from '@/components/OverviewTable'
import {
  TABLE_BIG_SKELETON_SX,
  TABLE_LARGE_SKELETON_SX,
  TABLE_MEDIUM_TEXT_SKELETON_SX,
  TABLE_SMALL_TEXT_SKELETON_SX,
  TABLE_TYPE_BOX_SKELETON_SX,
} from '@/const'
import { GetOperationByIndexQuery } from '@/graphql'
import { formatTimestamp, generatePath } from '@/helpers'
import { useLoading, useLocalize, useSkeleton } from '@/hooks'
import { useI18n } from '@/locales/client'
import { RoutePaths } from '@/types'

import OperationContentRow from './OperationContentRow'
import OperationStatus from './OperationStatus'

export default function Operation({ index }: { index: string }) {
  const t = useI18n()
  const { localizeOperationType } = useLocalize()

  const { data, isLoading, isLoadingError, isEmpty } = useLoading<GetOperationByIndexQuery>(
    {} as GetOperationByIndexQuery,
    () => getOperationByIndex(index),
  )

  const operation = useMemo(() => data?.operation?.[0], [data])
  const confirmation = useMemo(() => data?.confirmation?.[0], [data])
  const tx = useMemo(() => data?.transaction?.[0], [data])
  const operationType = useMemo(
    () => localizeOperationType(operation?.operation_type),
    [localizeOperationType, operation?.operation_type],
  )

  const withSkeleton = useSkeleton(isLoading)

  const rows = [
    {
      head: t('operation.index-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={operation?.index}>
          {operation?.index}
        </CopyToClipboardWrapper>,
        TABLE_BIG_SKELETON_SX,
      ),
    },
    {
      head: t('operation.tx-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={tx?.hash}>
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Transaction, {
              hash: String(tx?.hash),
            })}
          >
            {tx?.hash}
          </MuiLink>
        </CopyToClipboardWrapper>,
        TABLE_BIG_SKELETON_SX,
      ),
    },
    {
      head: t('operation.block-col-lbl'),
      body: withSkeleton(
        <CopyToClipboardWrapper value={tx?.block?.height}>
          <MuiLink
            component={Link}
            href={generatePath(RoutePaths.Block, {
              height: String(tx?.block?.height),
            })}
          >
            {tx?.block?.height}
          </MuiLink>
        </CopyToClipboardWrapper>,
        TABLE_SMALL_TEXT_SKELETON_SX,
      ),
    },
    {
      head: t('operation.creator-col-lbl'),
      body: withSkeleton(
        <AvatarName abbrAddress={false} address={operation?.creator ?? ''} />,
        TABLE_LARGE_SKELETON_SX,
      ),
    },
    ...(confirmation?.root
      ? [
          {
            head: t('operation.confirmation-col-lbl'),
            body: withSkeleton(
              <CopyToClipboardWrapper value={confirmation?.root}>
                <MuiLink
                  component={Link}
                  href={generatePath(RoutePaths.Confirmation, {
                    root: String(confirmation?.root),
                  })}
                >
                  {confirmation?.root}
                </MuiLink>
              </CopyToClipboardWrapper>,
              TABLE_BIG_SKELETON_SX,
            ),
          },
        ]
      : []),
    {
      head: t('operation.type-col-lbl'),
      body: withSkeleton(<Chip label={operationType} />, TABLE_TYPE_BOX_SKELETON_SX),
    },
    {
      head: t('operation.status-col-lbl'),
      body: withSkeleton(
        <OperationStatus status={operation?.status} />,
        TABLE_TYPE_BOX_SKELETON_SX,
      ),
    },
    {
      head: t('operation.age-col-lbl'),
      body: withSkeleton(formatTimestamp(operation?.timestamp), TABLE_MEDIUM_TEXT_SKELETON_SX),
    },
  ]

  return (
    <ContentSection withBackButton title={t('operation.title')}>
      <ContentBox>
        <ContentWrapper>
          <OverviewTable
            label={t('operation.title')}
            noDataMessage={t('operation.no-data-msg')}
            isEmpty={isEmpty}
            isLoadingError={isLoadingError}
            rows={rows}
            sx={{}}
          />
          <OverviewTable
            sx={{
              '& > tr:last-child td, & > tr:last-child th, & > tr:nth-last-of-type(-n + 2) td': {
                borderBottom: 0,
              },
            }}
          >
            <OperationContentRow label={operationType} operation={operation} />
          </OverviewTable>
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
