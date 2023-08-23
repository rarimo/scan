import { Select, SelectChangeEvent, useTheme } from '@mui/material'
import { ReactNode, useState } from 'react'

export default function MouseOverDropdown({
  variant = 'outlined',
  value,
  handleChange,
  children,
}: {
  variant?: 'outlined' | 'text'
  children: ReactNode
  value?: string
  handleChange: (event: SelectChangeEvent) => void
}) {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const isOutlined = variant === 'outlined'
  const borderColor = isOutlined ? 'var(--col-primary-outlined-border)' : 'transparent'

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Select
      value={value}
      onChange={handleChange}
      onMouseEnter={() => setOpen(true)}
      onClose={handleClose}
      open={open}
      displayEmpty
      MenuProps={{
        PaperProps: {
          sx: {
            '& > .MuiList-root': {
              '& > .MuiMenuItem-root[aria-disabled=true]': {
                display: 'none',
              },
            },
          },
          onMouseLeave: handleClose,
        },
        sx: {
          '& > .MuiPaper-root': {
            width: 220,
            top: '89px !important',
            boxShadow: 'var(--ui-dropdown-shadow)',
          },
        },
      }}
      sx={{
        height: isOutlined ? 40 : 'auto',
        textTransform: 'uppercase',
        fontSize: 14,
        color: theme.palette.primary.main,
        lineHeight: 1.7,
        fontWeight: 700,
        p: isOutlined ? theme.spacing(1, 2) : 0.5,
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor,
        },
        '&:has(> .MuiSelect-select[aria-expanded="true"])': {
          backgroundColor: 'var(--col-primary-hover)',
        },
        '& > .MuiSelect-select': {
          p: 0,
        },
        '& > .MuiOutlinedInput-notchedOutline': {
          borderColor,
        },
        '& > .MuiSvgIcon-root': {
          ...(!isOutlined && { top: '6px' }),
          color: theme.palette.primary.main,
          transform: 'rotate(0deg)',
        },
      }}
    >
      {children}
    </Select>
  )
}
