import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { Components } from '@mui/material'

import { BaseTheme } from '@/types'

export const COMPONENTS: Components<BaseTheme> = {
  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: 14,
        lineHeight: 1.57,
        color: theme.palette.text.primary,
        textDecorationStyle: 'dotted',
        textDecorationColor: theme.palette.text.disabled,
        textUnderlineOffset: 3,
        textDecorationThickness: 1,
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
    },
    styleOverrides: {
      root: {
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      },
      outlinedSizeMedium: {
        height: 40,
        padding: '8 16px',
      },
      containedSizeMedium: {
        height: 40,
        padding: '8px 16px',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'unset',
        boxShadow: 'unset',
      },
    },
  },
  MuiSkeleton: {
    defaultProps: {
      animation: 'wave',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        transform: 'none',
        borderRadius: theme.spacing(0.5),
        backgroundColor: 'var(--col-bg-tertiary)',
      }),
    },
  },
  MuiFormControl: {
    defaultProps: {
      fullWidth: true,
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: {
        width: 20,
        height: 20,
        pointerEvents: 'none',
        top: 10,
      },
    },
    defaultProps: {
      IconComponent: KeyboardArrowDownOutlinedIcon,
    },
  },
}
