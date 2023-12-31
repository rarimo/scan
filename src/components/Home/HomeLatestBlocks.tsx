'use client'

import { time } from '@distributedlab/tools'
import { Link as MuiLink, Typography } from '@mui/material'
import Link from 'next/link'
import { ReactNode } from 'react'

import { AvatarName } from '@/components/Avatar'
import { ContentWrapper } from '@/components/Content'
import HomeLatestDataRow from '@/components/Home/HomeLatestDataRow'
import NoData from '@/components/NoData'
import PreviewList from '@/components/PreviewList'
import { Block, BlockBaseFragment } from '@/graphql'
import { generatePath } from '@/helpers'
import { useI18n } from '@/locales/client'
import { RoutePaths } from '@/types'

export default function HomeLatestBlocks({
  isLoading,
  isLoadingError,
  blockList,
  limitRow,
}: {
  isLoadingError: boolean
  isLoading: boolean
  blockList: BlockBaseFragment[]
  limitRow: number
}) {
  const t = useI18n()

  const typoWithMinWidth = (minWidth: number, children: ReactNode) => (
    <Typography
      sx={{
        minWidth: {
          xs: minWidth,
          md: 'unset',
        },
        font: 'inherit',
        color: 'inherit',
      }}
    >
      {children}
    </Typography>
  )

  const list = (
    <PreviewList
      actions={{ label: t('block-list.view-all'), link: RoutePaths.Blocks }}
      title={t('block-list.title')}
      isError={isLoadingError}
      isLoading={isLoading}
    >
      {(isLoading ? new Array(limitRow).fill({} as BlockBaseFragment) : blockList).map(
        (el: Block, idx) => (
          <HomeLatestDataRow
            key={idx}
            isLoading={isLoading}
            head={
              <MuiLink
                component={Link}
                href={generatePath(RoutePaths.Block, {
                  height: String(el.height),
                })}
                sx={{ pl: { xs: 1, md: 0 } }}
              >
                {el?.height}
              </MuiLink>
            }
            headLabel={typoWithMinWidth(57, t('block-list.block') + ':')}
            subhead={time(el.timestamp, { utc: true }).fromNow}
            footer={typoWithMinWidth(62, t('block-list.validator') + ':')}
            subfooter={
              <AvatarName
                address={el?.validator?.validator_info?.operator_address ?? ''}
                name={el?.validator?.validator_descriptions?.[0]?.moniker ?? ''}
                imageUrl={el?.validator?.validator_descriptions?.[0]?.avatar_url ?? ''}
                direction={{ xs: 'row-reverse', md: 'row' }}
                justifyContent={{ xs: 'space-between', md: 'flex-start' }}
              />
            }
          />
        ),
      )}
    </PreviewList>
  )

  return !isLoading && (!blockList.length || isLoadingError) ? (
    <ContentWrapper>
      <NoData
        title={t('block-list.no-data-title')}
        subtitle={t('block-list.no-data-subtitle')}
        errorTitle={t('block-list.error-title')}
        errorSubtitle={t('block-list.error-subtitle')}
        isError={isLoadingError}
      />
    </ContentWrapper>
  ) : (
    list
  )
}
