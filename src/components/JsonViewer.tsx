import { useTheme } from '@mui/material'
import ReactJson from 'react-json-view'

import { useThemeMode } from '@/hooks'

export const JsonViewer = ({ value }: { value: object }) => {
  const { isDarkThemeMode } = useThemeMode()
  const theme = useTheme()

  return (
    <ReactJson
      style={{ padding: theme.spacing(2, 0), backgroundColor: 'transparent', fontSize: 12 }}
      src={value}
      theme={isDarkThemeMode ? 'monokai' : 'rjv-default'}
    />
  )
}
