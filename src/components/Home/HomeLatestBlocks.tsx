'use client'

import { time } from '@distributedlab/tools'
import { Link as MuiLink } from '@mui/material'
import Link from 'next/link'

import { AvatarName } from '@/components/Avatar/AvatarName'
import { HomeLatestDataRow } from '@/components/Home/HomeLatestDataRow'
import { NoDataRow } from '@/components/NoDataRow'
import { PreviewList } from '@/components/PreviewList'
import { RoutePaths } from '@/enums'
import { generatePath } from '@/helpers'
import { useI18n } from '@/locales/client'
import { Block, BlockBaseFragment } from '@/types'

export const HomeLatestBlocks = ({
  isLoading,
  isLoadingError,
  blockList,
  limitRow,
}: {
  isLoadingError: boolean
  isLoading: boolean
  blockList: BlockBaseFragment[]
  limitRow: number
}) => {
  const t = useI18n()

  return (
    <PreviewList
      actions={{ label: t('block-list.view-all'), link: RoutePaths.Blocks }}
      title={t('block-list.title')}
      isError={isLoadingError}
      isLoading={isLoading}
    >
      <>
        {!isLoading && (!blockList.length || isLoadingError) && (
          <NoDataRow message={t('block-list.no-data-msg')} error={isLoadingError} />
        )}
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
                >
                  {el?.height}
                </MuiLink>
              }
              subhead={time(el.timestamp, { utc: true }).fromNow}
              footer={t('block-list.validator') + ':'}
              subfooter={
                <AvatarName
                  address={el?.validator?.validator_info?.operator_address ?? ''}
                  name={el?.validator?.validator_descriptions?.[0]?.moniker ?? ''}
                  imageUrl={el?.validator?.validator_descriptions?.[0]?.avatar_url ?? ''}
                  imageSize={20}
                  fontSize={'14px'}
                />
              }
            />
          ),
        )}
      </>
    </PreviewList>
  )
}
