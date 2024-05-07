import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Box, Button, MenuItem, Select, SelectChangeEvent, Stack, useTheme } from '@mui/material'
import { uniqueId } from 'lodash-es'
import { useEffect, useMemo, useRef, useState } from 'react'

const BUTTON_ID = `multiple-actions-button-${uniqueId()}`

const SELECT_SIZE = {
  width: 40,
  height: 40,
}

const BUTTON_POSITION = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}

export default function MultipleActionsButton({
  actions,
  isDisabled = false,
}: {
  isDisabled?: boolean
  actions: {
    label: string
    handler: () => void | Promise<void>
    isDisabled?: boolean
  }[]
}) {
  const theme = useTheme()

  const anchorEl = useRef(null)
  const [value, setValue] = useState<string>('0')
  const [open, setOpen] = useState(false)

  const handler = useMemo(() => actions[Number(value)]?.handler, [actions, value])
  const isHandlerDisabled = useMemo(() => actions[Number(value)]?.isDisabled, [actions, value])

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setValue(String(event.target.value))
    handleClose()
  }

  useEffect(() => {
    setValue(actions?.[Number(value)] ? value : '0')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions])

  return (
    <Stack ref={anchorEl} direction={'row'}>
      <Button id={BUTTON_ID} disabled={isDisabled || isHandlerDisabled} onClick={handler}>
        {actions[Number(value)]?.label}
      </Button>
      <Box
        sx={{
          ...SELECT_SIZE,
          position: 'relative',
          bgcolor: theme.palette.primary.dark,
        }}
      >
        <Select
          displayEmpty
          open={open}
          value={value}
          onChange={handleChange}
          onClose={handleClose}
          renderValue={() => ''}
          disabled={isDisabled}
          sx={{
            ...SELECT_SIZE,
            opacity: 0,
          }}
          MenuProps={{
            anchorEl: anchorEl.current,
            id: BUTTON_ID,
            'aria-labelledby': BUTTON_ID,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          }}
        >
          {actions.map((item, idx) => (
            <MenuItem
              value={idx}
              key={idx}
              disabled={item.isDisabled}
              sx={{
                minWidth: 220,
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
        <Button
          sx={{
            ...SELECT_SIZE,
            ...BUTTON_POSITION,
            minWidth: SELECT_SIZE.width,
            ml: '1px',
            zIndex: 1,
          }}
          onClick={() => setOpen(!open)}
        >
          <ArrowDropDownIcon
            aria-hidden='true'
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          />
        </Button>
      </Box>
    </Stack>
  )
}
