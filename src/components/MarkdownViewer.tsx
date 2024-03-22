import { Stack, Typography } from '@mui/material'
import { getOverrides, MuiMarkdown } from 'mui-markdown'

export default function MarkdownViewer({ children }: { children: string }) {
  return (
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
        ul: {
          component: Stack,
          props: { component: 'ul', sx: { pl: 5, mt: 0, mb: 3 } },
        },
        li: {
          component: Typography,
          props: { variant: 'subtitle4', component: 'li' },
        },
      }}
    >
      {children}
    </MuiMarkdown>
  )
}
