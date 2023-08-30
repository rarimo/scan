import ReceiptLong from '@mui/icons-material/ReceiptLong'
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material'
import { Property } from 'csstype'
import { ReactNode } from 'react'
import FlexDirection = Property.FlexDirection
import { useSkeleton } from '@/hooks'

const sx = {
  textBlock: {
    display: 'inline',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  item: {
    item: true,
    display: 'flex',
    overflow: 'hidden',
    flexDirection: { xs: 'row' as FlexDirection, md: 'column' as FlexDirection },
    alignItems: { xs: 'center', md: 'flex-start' },
    justifyContent: { xs: 'space-between', md: 'start' },
    sx: {
      height: { md: 45 },
    },
  },
  iconWrapper: {
    width: 40,
    height: 40,
    sx: {
      bgcolor: 'var(--col-divider)',
      p: 1.5,
    },
    display: { xs: 'none', md: 'block' },
  },
  skeleton: {
    width: '90%',
  },
}

export default function HomeLatestDataRow({
  head,
  subfooter,
  footer,
  subhead,
  isLoading,
  headLabel,
}: {
  isLoading?: boolean
  head?: ReactNode
  headLabel?: ReactNode
  footer?: ReactNode
  subfooter?: ReactNode
  subhead?: ReactNode
}) {
  const theme = useTheme()
  const withSkeleton = useSkeleton(isLoading)

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={{ xs: 0, md: 3 }}
      sx={{
        borderBottom: 'var(--ui-border)',
        p: theme.spacing(2, 0),

        '&:last-child': {
          borderBottom: 'none',
          pb: 2,
        },
      }}
    >
      <Box {...sx.iconWrapper}>
        <ReceiptLong
          sx={{
            color: theme.palette.action.active,
            width: 16,
            height: 16,
          }}
        />
      </Box>
      <Grid container>
        <Grid {...sx.item} md={5} xs={12}>
          <Typography
            variant={'overline'}
            sx={{
              display: { xs: 'inline', md: 'none' },
              mt: 0.5,
              fontSize: 10,
              lineHeight: 1.2,
              color: theme.palette.text.secondary,
              mr: 0.5,
            }}
          >
            {withSkeleton(headLabel, sx.skeleton)}
          </Typography>
          {withSkeleton(head, sx.skeleton)}
          <Typography
            variant={'caption'}
            {...sx.textBlock}
            sx={{
              mt: {
                xs: 0,
                sm: 1,
              },
              ml: {
                xs: 'auto',
                md: 0,
              },
              color: theme.palette.text.secondary,
            }}
          >
            {withSkeleton(subhead, sx.skeleton)}
          </Typography>
        </Grid>
        <Grid
          {...sx.item}
          md={7}
          xs={12}
          sx={{
            mt: {
              xs: 1,
              sm: 0,
            },
          }}
        >
          {withSkeleton(
            <Typography
              variant={'overline'}
              sx={{
                ...(isLoading && { width: '100%' }),
                mt: { xs: 0.5, md: 0 },
                mb: { xs: 0, md: 1 },
                fontSize: 10,
                lineHeight: 1.2,
                color: theme.palette.text.secondary,
              }}
            >
              {footer}
            </Typography>,
            sx.skeleton,
          )}

          {withSkeleton(subfooter, sx.skeleton)}
        </Grid>
      </Grid>
    </Stack>
  )
}
