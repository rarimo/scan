'use client'

import SearchIcon from '@mui/icons-material/Search'
import { Button, TextField, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { KeyboardEvent, useState } from 'react'

import { RoutePaths } from '@/enums'
import { apolloClient } from '@/graphql'
import { Bus, generatePath } from '@/helpers'
import { useLoading } from '@/hooks'
import { useI18n } from '@/locales/client'
import { Search as SearchQuery, SearchQuery as TSearchQuery, SearchQueryVariables } from '@/types'

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

export const Search = ({ size = 'default' }: { size?: 'default' | 'big' }) => {
  const t = useI18n()
  const router = useRouter()
  const theme = useTheme()

  const [searchValue, setSearchValue] = useState('')

  const { data, isLoading, reload } = useLoading<TSearchQuery>(
    {
      transaction: [],
      block: [],
      account: [],
    },
    () => getSearchResults(searchValue),
    { loadOnMount: false },
  )

  const redirect = (route: RoutePaths, params: Record<string, string | number>) => {
    router.push(generatePath(route, params))
  }

  const searchAndRedirect = async () => {
    if (!searchValue || isLoading) return

    await reload()

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
  }

  const handleEnterPress = async (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return
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
      placeholder={t('search.placeholder-lbl')}
      autoComplete={'off'}
      InputProps={{
        startAdornment: (
          <SearchIcon style={{ marginRight: 16, color: theme.palette.action.active }} />
        ),
        endAdornment,
      }}
      sx={{
        '& > .MuiInputBase-root.MuiOutlinedInput-root': {
          p: theme.spacing(0, 2),
          ...(size === 'big' && { bgcolor: theme.palette.background.paper }),

          '& > .MuiOutlinedInput-input': {
            p: theme.spacing(size === 'default' ? 2 : 2.5, 0),
          },
        },
        '& > .MuiOutlinedInput-notchedOutline': {
          border: 'var(--ui-border)',
        },
        width: '100%',
      }}
    />
  )
}
