import './md-styles.scss'

import { Stack, Typography } from '@mui/material'
import { getOverrides, MuiMarkdown } from 'mui-markdown'

export default function MarkdownViewer({ children }: { children: string }) {
  return (
    <Stack className='markdown-viewer'>
      <MuiMarkdown
        overrides={{
          ...getOverrides({}),
          h2: {
            component: Typography,
            props: { variant: 'subtitle2', component: 'h2', sx: { mb: 2 } },
          },
          h3: {
            component: Typography,
            props: { variant: 'subtitle3', component: 'h3', sx: { mb: 2 } },
          },
          p: {
            component: Typography,
            props: { variant: 'body3', component: 'p', sx: { mb: 3 } },
          },
          em: {
            component: Typography,
            props: { variant: 'body3', component: 'em', sx: { fontStyle: 'italic' } },
          },
          ul: {
            component: Stack,
            props: { component: 'ul', sx: { listStyleType: 'disc', pl: 5, mt: 0, mb: 3 } },
          },
          ol: {
            component: Stack,
            props: { component: 'ul', sx: { listStyleType: 'decimal', pl: 5, mt: 0, mb: 3 } },
          },
          li: {
            component: Typography,
            props: { variant: 'subtitle4', component: 'li', sx: { listStyleType: 'inherit' } },
          },
        }}
      >
        {children}
      </MuiMarkdown>
    </Stack>
  )
}
