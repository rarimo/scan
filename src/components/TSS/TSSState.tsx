import { Stack, Typography } from '@mui/material'
import { useMemo } from 'react'

import { getRarimocoreParams } from '@/callers'
import DataBox from '@/components/DataBox'
import { CONFIG } from '@/config'
import { GetRarimocoreParamsQuery } from '@/graphql'
import { useInterval, useLoading } from '@/hooks'
import { useI18n } from '@/locales/client'

export default function TSSState() {
  const t = useI18n()

  const { data, isLoading, isLoadingError, update } = useLoading<GetRarimocoreParamsQuery>(
    {} as GetRarimocoreParamsQuery,
    getRarimocoreParams,
  )

  useInterval(update, CONFIG.UPDATE_INTERVAL)

  const isUpdateRequired = useMemo(
    () =>
      data?.rarimocore_params?.[0]?.is_update_required
        ? t('tss-state.is-update-required-yes-lbl')
        : t('tss-state.is-update-required-no-lbl'),
    [data?.rarimocore_params, t],
  )

  return (
    <Stack spacing={2}>
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
              title: t('tss-state.threshold-lbl'),
              body: data?.rarimocore_params?.[0]?.threshold,
            }}
            footer={{
              title: t('tss-state.is-update-required-lbl'),
              body: isUpdateRequired,
            }}
            isLoading={isLoading}
          />
          <Stack flex={1}>
            <DataBox
              header={{
                title: t('tss-state.max-violation-count-lbl'),
                body: data?.rarimocore_params?.[0]?.max_violations_count,
              }}
              footer={{
                title: t('tss-state.public-key-lbl'),
                body: (
                  <Typography
                    component={'span'}
                    sx={{
                      fontWeight: 600,
                      color: 'inherit',
                      fontSize: 14,
                      lineHeight: 1,
                    }}
                  >
                    {data?.rarimocore_params?.[0]?.key_ecdsa}
                  </Typography>
                ),
              }}
              isLoading={isLoading}
            />
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}
