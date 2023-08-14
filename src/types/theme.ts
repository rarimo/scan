import { Theme } from '@mui/material/styles'

import { FontWeight } from '@/enums'
import { ColorString } from '@/types'

export type BaseTheme = Omit<Theme, 'components'>

export type Typography = {
  txtFontFamily: string

  txtFontWeightLight: FontWeight.Light
  txtFontWeightRegular: FontWeight.Regular
  txtFontWeightMedium: FontWeight.Medium
  txtFontWeightSemiBold: FontWeight.SemiBold
  txtFontWeightBold: FontWeight.Bold
  txtFontWeightExtraBold: FontWeight.ExtraBold

  txtFontSizeRegular: string
  txtFontSizeH1: string
  txtFontSizeH2: string
  txtFontSizeH3: string
  txtFontSizeH4: string
  txtFontSizeH5: string
  txtFontSizeH6: string
  txtFontSizeSubtitle1: string
  txtFontSizeSubtitle2: string
  txtFontSizeBody1: string
  txtFontSizeBody2: string
  txtFontSizeButton: string
  txtFontSizeCaption: string
  txtFontSizeOverline: string

  txtFontLineHeightH1: number
  txtFontLineHeightH2: number
  txtFontLineHeightH3: number
  txtFontLineHeightH4: number
  txtFontLineHeightH5: number
  txtFontLineHeightH6: number
  txtFontLineHeightSubtitle1: number
  txtFontLineHeightSubtitle2: number
  txtFontLineHeightBody1: number
  txtFontLineHeightBody2: number
  txtFontLineHeightButton: number
  txtFontLineHeightCaption: number
  txtFontLineHeightOverline: number

  txtFontWeightH1: number
  txtFontWeightH2: number
  txtFontWeightH3: number
  txtFontWeightH4: number
  txtFontWeightH5: number
  txtFontWeightH6: number
  txtFontWeightSubtitle1: number
  txtFontWeightSubtitle2: number
  txtFontWeightBody1: number
  txtFontWeightBody2: number
  txtFontWeightButton: number
  txtFontWeightCaption: number
  txtFontWeightOverline: number
}

export type PaletteColors = {
  colBlack: ColorString
  colWhite: ColorString
  colDark: ColorString
  colLight: ColorString
  colBgDivider: ColorString
  colTxtPrimary: ColorString
  colTxtSecondary: ColorString
  colTxtDisabled: ColorString
  colTxtHover: ColorString
  colTxtSelected: ColorString
  colTxtFocus: ColorString
  colTxtFocusVisible: ColorString
  colPrimaryMain: ColorString
  colPrimaryDark: ColorString
  colPrimaryLight: ColorString
  colPrimaryContrast: ColorString
  colSecondaryMain: ColorString
  colSecondaryDark: ColorString
  colSecondaryLight: ColorString
  colSecondaryContrast: ColorString
  colErrorMain: ColorString
  colErrorDark: ColorString
  colErrorLight: ColorString
  colErrorContrast: ColorString
  colWarningMain: ColorString
  colWarningDark: ColorString
  colWarningLight: ColorString
  colWarningContrast: ColorString
  colInfoMain: ColorString
  colInfoDark: ColorString
  colInfoLight: ColorString
  colInfoContrast: ColorString
  colSuccessMain: ColorString
  colSuccessDark: ColorString
  colSuccessLight: ColorString
  colSuccessContrast: ColorString
  colActionActive: ColorString
  colActionHover: ColorString
  colActionSelected: ColorString
  colActionFocus: ColorString
  colActionDisabled: ColorString
  colActionDisabledBg: ColorString
  colBgPrimary: ColorString
  colBgPaper: ColorString
}
