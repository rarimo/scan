'use client'

import { ArrowUpward } from '@mui/icons-material'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import { Divider, IconButton, Link as MuiLink, Stack, Typography, useTheme } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import Link from 'next/link'

import Logo from '@/components/Logo'
import { CONFIG } from '@/config'
import { useI18n } from '@/locales/client'

const SCROLL_ICON_SIZE = 36
const LINKS_SPACING = 2.7
const LINK_ICON_SIZE = 16
const HIDE_ON_MOBILE_SX = {
  display: {
    xs: 'none',
    sm: 'flex',
  },
}

export default function Footer() {
  const theme = useTheme()
  const t = useI18n()

  const descriptionTypoProps = {
    variant: 'body2' as Variant,
    color: theme.palette.text.secondary,
  }

  const linksHeaderTypoProps = {
    variant: 'subtitle2' as Variant,
  }

  const externalLinks = [
    {
      href: CONFIG.DISCORD_URL,
      label: t('footer.discord-lbl'),
    },
    {
      href: CONFIG.TWITTER_URL,
      label: t('footer.twitter-lbl'),
    },
    {
      href: CONFIG.TELEGRAM_URL,
      label: t('footer.telegram-lbl'),
    },
  ]

  const includeLinks = [
    {
      label: t('footer.use-cases-lbl'),
      href: CONFIG.USE_CASES_URL,
    },
    {
      label: t('footer.documentation-lbl'),
      href: CONFIG.DOCUMENTATION_URL,
    },
    {
      label: t('footer.support-lbl'),
      href: CONFIG.SUPPORT_URL,
    },
  ]

  let interval: NodeJS.Timer | undefined

  const scrollToTop = () => {
    if (interval) return

    window.scrollTo({ top: 0, behavior: 'smooth' })

    interval = setInterval(() => {
      if (window.scrollY !== 0) return
      // dispatch event to trigger header animation
      window.dispatchEvent(new Event('wheel'))
      clearInterval(interval)
      interval = undefined
    }, 100)
  }

  const linkProps = {
    ...descriptionTypoProps,
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

  return (
    <Stack component='footer' sx={{ bgcolor: 'var(--ui-app-background)' }}>
      <Divider />
      <Stack
        sx={{
          p: {
            xs: 'var(--ui-footer-padding-xs)',
            sm: 'var(--ui-footer-padding-sm)',
            lg: 'var(--ui-footer-padding-lg)',
          },
        }}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          sx={{
            width: '100%',
            m: theme.spacing(0, 'auto'),
            maxWidth: 'var(--ui-max-width)',
          }}
        >
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            sx={{
              maxWidth: {
                xs: '100%',
                sm: '60%',
              },
              width: '100%',
            }}
          >
            <Stack
              sx={{
                width: {
                  xs: '100%',
                  sm: 'auto',
                },
                alignItems: {
                  xs: 'space-between',
                  sm: 'flex-start',
                },
                flexDirection: {
                  xs: 'row',
                  sm: 'column',
                },
                justifyContent: {
                  xs: 'space-between',
                  sm: 'flex-start',
                },
              }}
            >
              <Logo withoutMarginTop width={93} height={24} />
              <Typography
                {...descriptionTypoProps}
                mt={theme.spacing(4)}
                maxWidth={260}
                sx={HIDE_ON_MOBILE_SX}
              >
                {t('footer.promo-lbl')}
              </Typography>
              <Typography {...descriptionTypoProps} mt={{ xs: 0, sm: theme.spacing(8) }}>
                {'© ' + new Date().getFullYear()}
              </Typography>
            </Stack>
            <Stack sx={HIDE_ON_MOBILE_SX} spacing={theme.spacing(LINKS_SPACING)}>
              <Typography {...linksHeaderTypoProps}>{t('footer.navigation-links-lbl')}</Typography>
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
            <Stack sx={HIDE_ON_MOBILE_SX} spacing={theme.spacing(LINKS_SPACING)}>
              <Typography {...linksHeaderTypoProps}>{t('footer.follow-us-links-lbl')}</Typography>
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
          <IconButton
            onClick={scrollToTop}
            sx={{
              ...HIDE_ON_MOBILE_SX,
              maxWidth: SCROLL_ICON_SIZE,
              width: SCROLL_ICON_SIZE,
              height: SCROLL_ICON_SIZE,
              mt: `-${SCROLL_ICON_SIZE / 2}px`,
            }}
          >
            <ArrowUpward />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  )
}
