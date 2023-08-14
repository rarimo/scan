'use client'

import { Stack, useTheme } from '@mui/material'

import { getLatestTxAndBlocks } from '@/callers'
import { ContentBox } from '@/components/Content/ContentBox'
import { ContentSection } from '@/components/Content/ContentSection'
import { CONFIG } from '@/config'
import { useInterval, useLoading } from '@/hooks'
import { GetLatestTxAndBlocksQuery } from '@/types'

import { HomeLatestBlocks } from './HomeLatestBlocks'
import { HomeLatestTransactions } from './HomeLatestTransactions'

const ITEM_PROPS = { sx: { flex: 1, minWidth: 0 } }
const ROW_LIMIT = 5

export const HomeLatestData = () => {
  const theme = useTheme()

  const {
    data: { transaction, block },
    isLoading,
    isLoadingError,
    update,
  } = useLoading<GetLatestTxAndBlocksQuery>({ transaction: [], block: [] }, getLatestTxAndBlocks)

  useInterval(update, CONFIG.UPDATE_INTERVAL)

  return (
    <ContentSection>
      <Stack spacing={theme.spacing(4)} direction={{ xs: 'column', md: 'row' }}>
        <ContentBox {...ITEM_PROPS}>
          <HomeLatestTransactions
            isLoadingError={isLoadingError}
            isLoading={isLoading}
            transactionList={transaction}
            limitRow={ROW_LIMIT}
          />
        </ContentBox>
        <ContentBox {...ITEM_PROPS}>
          <HomeLatestBlocks
            isLoadingError={isLoadingError}
            isLoading={isLoading}
            blockList={block}
            limitRow={ROW_LIMIT}
          />
        </ContentBox>
      </Stack>
    </ContentSection>
  )
}
