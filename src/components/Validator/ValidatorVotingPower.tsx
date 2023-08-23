import { BN } from '@distributedlab/tools'
import { LinearProgress, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'

import { CONFIG } from '@/config'
import { AMOUNT_CFG, formatAmount, formatToPercent } from '@/helpers'

type ValidatorVotingPowerProps = {
  votingPower?: number
  bondedTokens?: string
  maxWidth?: number | string
}

export default function ValidatorVotingPower({
  votingPower,
  bondedTokens,
  maxWidth = '230px',
}: ValidatorVotingPowerProps) {
  const votingPowerOverall = useMemo(
    () => BN.fromBigInt(bondedTokens ?? '0', CONFIG.DECIMALS),
    [bondedTokens],
  )

  const votingPowerPercent = useMemo(() => {
    return votingPowerOverall.isZero
      ? 0
      : BN.fromRaw(100, CONFIG.DECIMALS).mul(
          BN.fromRaw(votingPower ?? '0', CONFIG.DECIMALS).div(votingPowerOverall),
        )
  }, [votingPower, votingPowerOverall])

  const sx = {
    fontSize: '0.875rem',
  }

  return (
    <Stack sx={{ maxWidth }}>
      <Stack
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        paddingBottom={0.2}
      >
        <Typography sx={sx}>{formatAmount(votingPower, { ...AMOUNT_CFG, decimals: 0 })}</Typography>
        <Typography sx={sx}>{formatToPercent(votingPowerPercent)}</Typography>
      </Stack>
      <LinearProgress
        color='primary'
        variant='determinate'
        value={Number.isNaN(+votingPowerPercent) ? 0 : +votingPowerPercent}
        sx={{
          mt: 0.5,
          height: '1px',
          borderRadius: 0,
        }}
      />
    </Stack>
  )
}
