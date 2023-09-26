'use client'

import SearchIcon from '@mui/icons-material/Search'
import { Button, TextField, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { KeyboardEvent, useState } from 'react'

import {
  apolloClient,
  Search as SearchQuery,
  SearchQuery as TSearchQuery,
  SearchQueryVariables,
} from '@/graphql'
import { Bus, generatePath } from '@/helpers'
import { useLoading } from '@/hooks'
import { useI18n } from '@/locales/client'
import { RoutePaths } from '@/types'

const getSearchResults = async (value: string) => {
  const valueInt = Number(value)

  const { data } = await apolloClient.query<TSearchQuery, SearchQueryVariables>({
    query: SearchQuery,
    fetchPolicy: 'network-only',
    variables: {
      valueStr: value,
      ...(Number.isNaN(valueInt) ? { valueInt: '0' } : { valueInt: value }),
    },
  })

  return data
}

export default function Search({
  size = 'default',
  onRedirect,
}: {
  size?: 'default' | 'small' | 'medium'
  onRedirect?: () => void
}) {
  const t = useI18n()
  const router = useRouter()
  const theme = useTheme()

  const isSmallSize = size === 'small'
  const isMediumSize = size === 'medium'

  const [searchValue, setSearchValue] = useState('')

  const { isLoading, reload } = useLoading<TSearchQuery>(
    {
      transaction: [],
      block: [],
      account: [],
    },
    () => getSearchResults(searchValue),
    {
      loadOnMount: false,
      onLoad: data => {
        const { transaction, account, block } = data

        if (transaction?.length) {
          redirect(RoutePaths.Transaction, {
            hash: transaction?.[0]?.hash ?? '',
          })
          return
        }

        if (block?.length) {
          redirect(RoutePaths.Block, {
            height: block?.[0]?.height ?? '',
          })
          return
        }

        if (account?.length) {
          redirect(RoutePaths.Account, {
            address: account?.[0]?.address ?? '',
          })
          return
        }

        if (!isLoading) {
          Bus.info(t('search.no-results-msg'))
          return
        }
      },
    },
  )

  const redirect = (route: RoutePaths, params: Record<string, string | number>) => {
    router.push(generatePath(route, params))
    setSearchValue('')
    onRedirect?.()
  }

  const searchAndRedirect = async () => {
    if (!searchValue || isLoading) return
    await reload()
  }

  const handleEnterPress = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    ;(event?.target as HTMLInputElement)?.blur?.()
    await searchAndRedirect()
  }

  const endAdornment = (
    <Button size={'small'} onClick={searchAndRedirect} disabled={isLoading}>
      {t('search.search-btn')}
    </Button>
  )

  return (
    <TextField
      value={searchValue}
      onChange={event => setSearchValue(event.target.value)}
      onKeyDown={handleEnterPress}
      placeholder={
        isSmallSize || isMediumSize
          ? t('search.placeholder-small-lbl')
          : t('search.placeholder-lbl')
      }
      autoComplete={'off'}
      InputProps={{
        startAdornment: (
          <SearchIcon
            style={{ marginRight: 16, color: theme.palette.action.active, width: 24, height: 24 }}
            width={24}
            height={24}
          />
        ),
        ...(!isSmallSize && !isMediumSize && { endAdornment }),
      }}
      sx={{
        ...(isSmallSize && {
          maxWidth: 300,
          '& > .MuiInputBase-root': {
            height: 40,
          },
        }),
        '& > .MuiInputBase-root.MuiOutlinedInput-root': {
          p: theme.spacing(0, isSmallSize ? 1 : 2),
          bgcolor: theme.palette.background.paper,

          '& > .MuiOutlinedInput-input': {
            p: theme.spacing(isSmallSize ? 1 : 2, 0),
            fontSize: isSmallSize ? 14 : 16,
          },
          '& > .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--col-divider)',
            borderWidth: 1,
          },
        },
        height: 'fit-content',
        width: '100%',
      }}
    />
  )
}
