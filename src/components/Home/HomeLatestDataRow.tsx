import ReceiptLong from '@mui/icons-material/ReceiptLong'
import { Box, Grid, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import { Property } from 'csstype'
import { ReactNode } from 'react'
import FlexDirection = Property.FlexDirection

const sx = {
  textBlock: {
    display: 'inline',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
  },
  item: {
    item: true,
    display: 'flex',
    flexDirection: 'column' as FlexDirection,
    sx: {
      height: 45,
    },
  },
  iconWrapper: {
    width: 40,
    height: 40,
    sx: {
      bgcolor: 'var(--col-divider)',
      p: 1.5,
    },
  },
}

export const HomeLatestDataRow = ({
  head,
  subfooter,
  footer,
  subhead,
  isLoading,
}: {
  isLoading?: boolean
  head?: ReactNode
  footer?: ReactNode
  subfooter?: ReactNode
  subhead?: ReactNode
}) => {
  const theme = useTheme()
  const withSkeleton = (children: ReactNode) => (isLoading ? <Skeleton /> : children)

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={3}
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
        <ReceiptLong sx={{ color: theme.palette.action.active, width: 16, height: 16 }} />
      </Box>
      <Grid container>
        <Grid {...sx.item} sm={5} xs={7}>
          {withSkeleton(head)}
          <Typography
            variant={'caption'}
            {...sx.textBlock}
            sx={{
              mt: 1,
              color: theme.palette.text.secondary,
            }}
          >
            {withSkeleton(subhead)}
          </Typography>
        </Grid>
        <Grid
          {...sx.item}
          sm={7}
          xs={9}
          sx={{
            mt: {
              xs: 1,
              sm: 0,
            },
          }}
        >
          <Typography
            {...sx.textBlock}
            variant={'overline'}
            sx={{
              mb: 1,
              fontSize: 10,
              lineHeight: 1.2,
              color: theme.palette.text.secondary,
            }}
          >
            {withSkeleton(footer)}
          </Typography>
          {withSkeleton(subfooter)}
        </Grid>
      </Grid>
    </Stack>
  )
}
