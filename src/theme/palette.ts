import { PaletteOptions } from '@mui/material/styles'

import { PaletteColors, ThemeMode } from '@/types'

import { DARK_COLORS, LIGHT_COLORS } from './variables'

const variablesToPalette = (colors: PaletteColors): PaletteOptions => ({
  divider: colors.colBgDivider,
  common: {
    black: colors.colBlack,
    white: colors.colWhite,
  },
  text: {
    primary: colors.colTxtPrimary,
    secondary: colors.colTxtSecondary,
    disabled: colors.colTxtDisabled,
  },
  background: {
    default: colors.colBgPrimary,
    paper: colors.colBgPaper,
  },
  primary: {
    light: colors.colPrimaryLight,
    main: colors.colPrimaryMain,
    dark: colors.colPrimaryDark,
    contrastText: colors.colPrimaryContrast,
  },
  secondary: {
    light: colors.colSecondaryLight,
    main: colors.colSecondaryMain,
    dark: colors.colSecondaryDark,
    contrastText: colors.colSecondaryContrast,
  },
  error: {
    light: colors.colErrorLight,
    main: colors.colErrorMain,
    dark: colors.colErrorDark,
    contrastText: colors.colErrorContrast,
  },
  success: {
    light: colors.colSuccessLight,
    main: colors.colSuccessMain,
    dark: colors.colSuccessDark,
    contrastText: colors.colSuccessContrast,
  },
  warning: {
    light: colors.colWarningLight,
    main: colors.colWarningMain,
    dark: colors.colWarningDark,
    contrastText: colors.colWarningContrast,
  },
  info: {
    light: colors.colInfoLight,
    main: colors.colInfoMain,
    dark: colors.colInfoDark,
    contrastText: colors.colInfoContrast,
  },
  action: {
    active: colors.colActionActive,
    hover: colors.colActionHover,
    selected: colors.colActionSelected,
    disabled: colors.colActionDisabled,
    disabledBackground: colors.colActionDisabledBg,
    focus: colors.colActionFocus,
  },
})

export const PALETTE = {
  [ThemeMode.Light]: variablesToPalette(LIGHT_COLORS),
  [ThemeMode.Dark]: variablesToPalette(DARK_COLORS),
}
