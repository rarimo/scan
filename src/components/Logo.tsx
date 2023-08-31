'use client'

import { Box, SxProps, useTheme } from '@mui/material'
import Link from 'next/link'

import LogoSmall from '@/components/LogoSmall'
import { useAppState } from '@/hooks'
import { RoutePaths } from '@/types'

export default function Logo({
  isInsideNavbar = false,
  isSmall = false,
  withoutMarginTop = false,
  width = 102,
  height = 56,
  sx = {},
}: {
  isSmall?: boolean
  withoutMarginTop?: boolean
  isInsideNavbar?: boolean
  width?: number
  height?: number
  sx?: SxProps
}) {
  const theme = useTheme()
  const { toggleMobileNavbar } = useAppState()

  return (
    <Box
      component={Link}
      href={RoutePaths.Main}
      sx={{
        ...sx,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: withoutMarginTop ? 0 : theme.spacing(-1),
        color: theme.palette.text.primary,
      }}
      onClick={isInsideNavbar ? toggleMobileNavbar : () => {}}
    >
      {isSmall ? (
        <LogoSmall />
      ) : (
        <svg
          style={{ marginLeft: width > 100 ? '-7px' : '-12px' }}
          width={width}
          height={height}
          viewBox='0 0 1024.000000 307.000000'
          color={theme.palette.text.primary}
        >
          <g
            transform='translate(0.000000,307.000000) scale(0.100000,-0.100000)'
            fill='currentColor'
            stroke='none'
          >
            <path d='M4500 2480 l0 -170 170 0 170 0 0 170 0 170 -170 0 -170 0 0 -170z' />
            <path
              d='M1350 2085 c-8 -2 -49 -9 -90 -15 -251 -41 -390 -191 -429 -465 -6
-40 -11 -306 -11 -627 l0 -558 169 0 170 0 4 537 c4 585 6 604 62 705 30 54
55 77 123 110 44 22 62 23 282 28 l235 5 3 143 3 142 -253 -1 c-139 -1 -260
-3 -268 -4z'
            />
            <path
              d='M2114 2077 c-2 -7 -3 -71 -2 -143 l3 -129 275 -6 c151 -3 276 -6 277
-7 88 -68 113 -125 113 -253 l0 -78 -397 -3 c-452 -4 -453 -4 -543 -85 -99
-89 -144 -226 -144 -438 1 -268 66 -410 224 -484 l55 -26 485 0 486 0 49 26
c61 31 101 87 115 160 13 67 13 1024 0 1104 -31 193 -142 321 -312 360 -91 20
-676 22 -684 2z m664 -1110 l2 -208 -29 -30 -29 -29 -269 0 c-306 0 -330 5
-373 76 -46 74 -38 284 13 347 41 52 74 56 392 54 l290 -2 3 -208z'
            />
            <path
              d='M3812 2074 c-249 -42 -392 -178 -437 -415 -12 -67 -15 -181 -15 -660
l0 -579 169 0 170 0 3 558 3 557 25 64 c32 82 85 142 152 172 46 20 74 24 208
29 l155 5 3 143 3 142 -178 -1 c-101 -1 -214 -7 -261 -15z'
            />
            <path d='M4500 1255 l0 -835 170 0 170 0 -2 833 -3 832 -167 3 -168 2 0 -835z' />
            <path
              d='M8397 2059 c-132 -10 -277 -47 -376 -97 -162 -80 -261 -228 -302
-452 -18 -98 -19 -440 -1 -535 55 -300 196 -456 474 -524 296 -72 682 -46 905
61 92 44 189 140 231 230 71 151 98 325 89 568 -8 190 -32 304 -89 420 -99
202 -294 304 -632 330 -143 11 -143 11 -299 -1z m391 -299 c197 -69 272 -233
259 -570 -6 -151 -22 -233 -65 -316 -32 -63 -108 -125 -188 -154 -63 -23 -83
-25 -234 -25 -201 0 -267 17 -350 92 -105 94 -135 195 -135 453 0 200 11 263
59 359 46 90 148 157 276 181 25 5 106 7 180 5 107 -3 148 -8 198 -25z'
            />
            <path
              d='M5365 2043 c-89 -20 -141 -58 -178 -127 -22 -41 -22 -42 -25 -764
l-3 -722 178 2 178 3 5 646 c5 618 6 648 24 668 19 20 27 21 302 21 l284 0 2
-667 3 -668 178 -3 177 -2 0 671 0 670 203 -3 c180 -3 207 -5 247 -24 89 -41
141 -117 159 -234 7 -39 11 -270 11 -573 l0 -507 178 2 177 3 0 585 c0 635 -1
650 -56 766 -37 79 -108 145 -202 189 -147 70 -123 68 -1017 71 -443 1 -814 0
-825 -3z'
            />
          </g>
        </svg>
      )}
    </Box>
  )
}
