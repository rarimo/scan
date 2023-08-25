import { Skeleton, SxProps } from '@mui/material'
import { ReactNode } from 'react'

export const useSkeleton = (isLoading?: boolean) => {
  // eslint-disable-next-line react/display-name
  return (children: ReactNode, sx = {} as SxProps) => {
    return isLoading ? <Skeleton sx={sx} /> : children
  }
}
