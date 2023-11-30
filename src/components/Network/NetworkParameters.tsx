import { Chip, Stack, SxProps } from '@mui/material'
import { NetworkParams, networkParamTypeFromJSON } from '@rarimo/client'

import { useLocalize } from '@/hooks'

export default function NetworkParameters({
  params = [],
  sx = {},
}: {
  params?: NetworkParams[]
  sx?: SxProps
}) {
  const { localizeNetworkParamType } = useLocalize()

  return (
    <Stack direction={'row'} spacing={1} sx={sx}>
      {params.map((item, idx) => (
        <Chip
          label={localizeNetworkParamType(
            networkParamTypeFromJSON((item as unknown as { name: string })?.name),
          )}
          key={idx}
        />
      ))}
    </Stack>
  )
}
