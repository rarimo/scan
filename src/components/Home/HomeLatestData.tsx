'use client'

import { Stack, useTheme } from '@mui/material'

import { getLatestTxAndBlocks } from '@/callers'
import { ContentBox, ContentSection } from '@/components/Content'
import HomeLatestBlocks from '@/components/Home/HomeLatestBlocks'
import HomeLatestTransactions from '@/components/Home/HomeLatestTransactions'
import { CONFIG } from '@/config'
import { GetLatestTxAndBlocksQuery } from '@/graphql'
import { useInterval, useLoading } from '@/hooks'

const ITEM_PROPS = { sx: { flex: 1, minWidth: 0 } }
const ROW_LIMIT = 5

export default function HomeLatestData() {
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
      <Stack spacing={theme.spacing(4)} direction={{ xs: 'column-reverse', md: 'row' }}>
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
