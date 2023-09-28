import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import { Link as MuiLink, Stack, useTheme } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import Link from 'next/link'

import { CONFIG } from '@/config'
import { useAppState } from '@/hooks'
import { useI18n } from '@/locales/client'

const LINK_ICON_SIZE = 16

export default function NavbarLinks() {
  const { toggleMobileNavbar } = useAppState()
  const t = useI18n()
  const theme = useTheme()

  const linkProps = {
    variant: 'body2' as Variant,
    color: theme.palette.text.secondary,
    onClick: toggleMobileNavbar,
    sx: {
      display: 'flex',
      alignItems: 'center',
      transitionProperty: 'color',
      transitionDuration: '0.3s',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.text.primary,
      },
    },
  }

  const externalLinks = [
    {
      href: CONFIG.DISCORD_URL,
      label: t('navbar-links.discord-lbl'),
    },
    {
      href: CONFIG.TWITTER_URL,
      label: t('navbar-links.twitter-lbl'),
    },
    {
      href: CONFIG.TELEGRAM_URL,
      label: t('navbar-links.telegram-lbl'),
    },
  ]

  const includeLinks = [
    {
      label: t('navbar-links.use-cases-lbl'),
      href: CONFIG.USE_CASES_URL,
    },
    {
      label: t('navbar-links.documentation-lbl'),
      href: CONFIG.DOCUMENTATION_URL,
    },
    {
      label: t('navbar-links.support-lbl'),
      href: CONFIG.SUPPORT_URL,
    },
  ]

  return (
    <Stack direction={'row'} spacing={3} flex={1}>
      <Stack flex={1} spacing={2.625}>
        {includeLinks.map(({ href, label }, idx) => (
          <MuiLink
            {...linkProps}
            component={Link}
            href={href}
            target={'_blank'}
            rel={'noopener noreferrer'}
            key={idx}
          >
            {label}
          </MuiLink>
        ))}
      </Stack>
      <Stack flex={1} spacing={2.625}>
        {externalLinks.map(({ href, label }, idx) => (
          <MuiLink
            {...linkProps}
            href={href}
            target={'_blank'}
            rel={'noopener noreferrer'}
            key={idx}
          >
            <span key={`${idx}-lbl`}>{label}</span>
            <ArrowOutwardIcon
              width={LINK_ICON_SIZE}
              height={LINK_ICON_SIZE}
              sx={{
                color: 'inherit',
                ml: theme.spacing(1),
                width: LINK_ICON_SIZE,
                height: LINK_ICON_SIZE,
              }}
              key={`${idx}-icon`}
            />
          </MuiLink>
        ))}
      </Stack>
    </Stack>
  )
}
