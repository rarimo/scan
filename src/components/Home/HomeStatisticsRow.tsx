import ReceiptLong from '@mui/icons-material/ReceiptLong'
import { Box, Paper, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import { ResponsiveStyleValue } from '@mui/system'
import { ReactNode, useMemo } from 'react'

interface HomeStatisticsBoxProps {
  direction?: 'vertical' | 'horizontal'
  isLoading: boolean
  header: {
    body: ReactNode
    title: ReactNode
  }
  footer: {
    body: ReactNode
    title: ReactNode
  }
  marginLeft?: string
}

const sx = {
  wordBreak: 'break-word',
}

export default function HomeStatisticsRow({
  isLoading,
  header,
  footer,
  direction = 'vertical',
}: HomeStatisticsBoxProps) {
  const theme = useTheme()
  const isVertical = useMemo(() => direction === 'vertical', [direction])

  const content = (titleContent: ReactNode, bodyContent: ReactNode) => (
    <>
      <Stack
        direction={'column'}
        alignItems={'flex-start'}
        minWidth={0}
        flex={isVertical ? 1 : 0}
        width={'100%'}
      >
        <Typography
          sx={{ ...sx, color: theme.palette.text.secondary }}
          paddingBottom={2}
          variant={'overline'}
        >
          {titleContent}
        </Typography>
        <Box width={'100%'}>
          {isLoading ? (
            <Skeleton width={'100%'} />
          ) : (
            <Typography
              sx={{
                ...sx,
                ...(isVertical
                  ? {}
                  : {
                      fontSize: '30px',
                      lineHeight: '36px',
                    }),
              }}
              variant={'h6'}
            >
              {bodyContent}
            </Typography>
          )}
        </Box>
      </Stack>
      <Box marginLeft={isVertical ? 1.5 : 0} marginBottom={'auto'}>
        <ReceiptLong aria-hidden='true' sx={{ color: theme.palette.text.secondary }} />
      </Box>
    </>
  )

  const blockProps = {
    p: isVertical ? 0 : 3,
    border: isVertical ? 'none' : 'var(--ui-border)',
    direction: (isVertical ? 'row' : 'column-reverse') as ResponsiveStyleValue<
      'row' | 'column-reverse'
    >,
    alignItems: isVertical ? 'center' : 'flex-start',
    justifyContent: isVertical ? 'unset' : 'space-between',
    component: isVertical ? 'div' : Paper,
    flex: 1,
  }

  const vertical = () => (
    <>
      <Stack {...blockProps} paddingBottom={2} borderBottom={'var(--ui-border)'}>
        {content(header.title, header.body)}
      </Stack>
      <Stack {...blockProps}>{content(footer.title, footer.body)}</Stack>
    </>
  )

  const horizontal = () => (
    <Stack spacing={4} direction={'row'} flex={1}>
      {vertical()}
    </Stack>
  )

  return (
    <Stack
      padding={isVertical ? 3 : 0}
      spacing={3}
      component={isVertical ? Paper : 'div'}
      direction={'column'}
      flex={1}
      sx={{
        border: isVertical ? 'var(--ui-border)' : 'none',
      }}
    >
      {isVertical ? vertical() : horizontal()}
    </Stack>
  )
}
