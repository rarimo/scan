'use client'

import { Stack, Typography, useTheme } from '@mui/material'

import { getStatisticData } from '@/callers'
import ContentSection from '@/components/Content/ContentSection'
import DataBox from '@/components/DataBox'
import { CONFIG } from '@/config'
import { GetStatisticQuery } from '@/graphql'
import { formatCurrency, formatSeconds } from '@/helpers'
import { useInterval, useLoading } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function HomeStatistics() {
  const theme = useTheme()
  const t = useI18n()
  const { data, isLoading, isLoadingError, update } = useLoading<GetStatisticQuery>(
    {} as GetStatisticQuery,
    getStatisticData,
  )

  useInterval(update, CONFIG.UPDATE_INTERVAL)

  return (
    <ContentSection>
      <Stack spacing={theme.spacing(2)} direction={{ xs: 'column', md: 'row' }}>
        {!isLoadingError && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={4}
            justifyContent={'space-between'}
            flex={'1'}
          >
            <DataBox
              direction={'horizontal'}
              header={{
                title: t('home-statistics.height-lbl'),
                body: data?.block?.[0]?.height,
              }}
              footer={{
                title: t('home-statistics.transaction-lbl'),
                body: data?.transaction_aggregate?.aggregate?.count,
              }}
              isLoading={isLoading}
            />
            <Stack flex={1}>
              <DataBox
                header={{
                  title: t('home-statistics.supply-lbl'),
                  body: (
                    <>
                      <Typography
                        component={'span'}
                        sx={{
                          font: 'inherit',
                          color: 'inherit',
                        }}
                      >
                        {formatCurrency(data?.supply?.[0]?.coins?.[0]?.amount)}
                      </Typography>
                      <Typography
                        component={'span'}
                        sx={{
                          font: 'inherit',
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {' ' + CONFIG.DENOM}
                      </Typography>
                    </>
                  ),
                }}
                footer={{
                  title: t('home-statistics.average-block-time-lbl'),
                  body: formatSeconds(data?.averageBlockTime?.[0]?.averageTime || 0),
                }}
                isLoading={isLoading}
              />
            </Stack>
          </Stack>
        )}
      </Stack>
    </ContentSection>
  )
}
