import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { Components } from '@mui/material'

import { BaseTheme } from '@/types'

export const COMPONENTS: Components<BaseTheme> = {
  MuiLink: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: 14,
        fontWeight: 500,
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
        boxShadow: 'unset',
      },
      outlinedSizeMedium: {
        height: 40,
        padding: '8 16px',
      },
      containedSizeMedium: {
        height: 40,
        padding: '8px 16px',
      },
      containedSizeSmall: {
        height: 32,
        minWidth: 'auto',
        padding: '10px 7px',
        fontSize: 13,
        lineHeight: 1.7,
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
        borderRadius: 0,
        backgroundColor: theme.palette.action.hover,
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
  MuiInputBase: {
    styleOverrides: {
      root: {
        caretColor: 'var(--col-primary-main)',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        maxWidth: 300,
        borderRadius: 0,
      },
      popper: {
        '&[data-popper-placement*="bottom"]': {
          '& > .MuiTooltip-tooltip': {
            marginTop: 4,
          },
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderColor: 'var(--col-divider)',
      },
      head: {
        background: 'var(--col-bg-secondary)',
        textTransform: 'uppercase',
        fontSize: 12,
        lineHeight: 2,
        fontWeight: 700,
        color: 'var(--col-txt-secondary)',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 1.38,
      },
    },
  },
}
