import { Badge } from '@mui/material'

export default function ValidatorCondition({ condition = 0 }: { condition: number }) {
  // @ts-ignore
  const getColor = (c: number) => {
    if (!c) return 'info'
    if (c >= 1 && c < 70) return 'error'
    if (c >= 70 && c < 90) return 'warning'
    if (c >= 90 && c <= 100) return 'success'
  }

  const size = 8

  return (
    <Badge
      sx={{
        width: size,
        height: size,

        '& > .MuiBadge-badge': {
          position: 'initial',
          transform: 'initial',
          minWidth: size,
          height: size,
          p: 0,
        },
      }}
      badgeContent={' '}
      color={getColor(condition)}
    />
  )
}
