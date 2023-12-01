import { Chip } from '@mui/material'
import { OpStatus, opStatusFromJSON } from '@rarimo/client'

import { useLocalize } from '@/hooks'

export default function OperationStatus({ status }: { status?: string | number }) {
  const { localizeOperationStatus } = useLocalize()

  const getStatusColor = (status?: string | number) => {
    if (!status) return 'default'

    switch (opStatusFromJSON(status)) {
      case OpStatus.Initialized:
        return 'secondary'
      case OpStatus.Approved:
        return 'primary'
      case OpStatus.NotApproved:
        return 'error'
      case OpStatus.Signed:
        return 'success'
      default:
        return 'default'
    }
  }

  return (
    <Chip
      label={localizeOperationStatus(status as OpStatus)}
      color={getStatusColor(status) ?? 'primary'}
      variant={'outlined'}
    />
  )
}
