import { PaletteColors, Typography } from '@/types'

import darkPalette from './dark-palette.module.scss'
import lightPalette from './light-palette.module.scss'
import typography from './typography.module.scss'

export const TYPOGRAPHY = typography as unknown as Typography
export const DARK_COLORS = darkPalette as unknown as PaletteColors
export const LIGHT_COLORS = lightPalette as unknown as PaletteColors
