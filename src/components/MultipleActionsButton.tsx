import { Button, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material'
import { useMemo, useState } from 'react'

export default function MultipleActionsButton({
  actions,
  isDisabled = false,
}: {
  isDisabled?: boolean
  actions: {
    label: string
    handler: () => void | Promise<void>
  }[]
}) {
  const [value, setValue] = useState<string>('0')

  const handler = useMemo(() => actions[Number(value)]?.handler, [actions, value])

  const handleChange = (event: SelectChangeEvent) => {
    setValue(String(event.target.value))
  }

  return (
    <Stack>
      <Button onClick={handler} disabled={isDisabled}>
        {actions[Number(value)]?.label}
      </Button>
      <Select displayEmpty value={value} onChange={handleChange} disabled={isDisabled}>
        {actions.map((item, idx) => (
          <MenuItem value={idx} key={idx}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  )
}
