import { Box, Tab, Tabs } from '@mui/material'
import { ChangeEvent, SyntheticEvent } from 'react'

import { ContentBox, ContentSection, ContentWrapper } from '@/components/Content'
import ValidatorDelegationList from '@/components/Validator/ValidatorDelegationList'
import ValidatorRedelegationList from '@/components/Validator/ValidatorRedelegationList'
import ValidatorUnbondingDelegationList from '@/components/Validator/ValidatorUnbondingDelegationList'
import { VALIDATOR_DELEGATIONS_FILTERS_MAP } from '@/const'
import {
  GetValidatorDelegationListQuery,
  GetValidatorRedelegationListQuery,
  GetValidatorUnbondingDelegationListQuery,
} from '@/graphql'
import { useI18n } from '@/locales/client'
import { ValidatorDelegationsFilters } from '@/types'

export default function ValidatorDelegations({
  data,
  filter,
  limit,
  offset,
  isLoading,
  isLoadingError,
  handleChangePage,
  handleChangeRowsPerPage,
  handleFilterChange,
}: {
  data:
    | GetValidatorDelegationListQuery
    | GetValidatorRedelegationListQuery
    | GetValidatorUnbondingDelegationListQuery
  filter: number
  limit: number
  offset: number
  isLoading: boolean
  isLoadingError: boolean
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void
  handleFilterChange: (event: SyntheticEvent, newValue: number) => void
}) {
  const t = useI18n()

  const tabs = [
    {
      label: t('validator-delegations.delegations-lbl'),
      value: VALIDATOR_DELEGATIONS_FILTERS_MAP[ValidatorDelegationsFilters.Delegations],
    },
    {
      label: t('validator-delegations.redelegations-lbl'),
      value: VALIDATOR_DELEGATIONS_FILTERS_MAP[ValidatorDelegationsFilters.Redelegations],
    },
    {
      label: t('validator-delegations.unbondings-lbl'),
      value: VALIDATOR_DELEGATIONS_FILTERS_MAP[ValidatorDelegationsFilters.Unbonding],
    },
  ]

  const ListComponent = {
    [VALIDATOR_DELEGATIONS_FILTERS_MAP[ValidatorDelegationsFilters.Delegations]]:
      ValidatorDelegationList,
    [VALIDATOR_DELEGATIONS_FILTERS_MAP[ValidatorDelegationsFilters.Redelegations]]:
      ValidatorRedelegationList,
    [VALIDATOR_DELEGATIONS_FILTERS_MAP[ValidatorDelegationsFilters.Unbonding]]:
      ValidatorUnbondingDelegationList,
  }[filter]

  return (
    <ContentSection title={t('validator-delegations.title-lbl')}>
      <ContentBox>
        <ContentWrapper>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', p: theme => theme.spacing(0, 2) }}>
            <Tabs
              value={filter}
              onChange={handleFilterChange}
              aria-label={t('validator-delegations.tabs-lbl')}
            >
              {tabs.map((tab, idx) => (
                <Tab key={idx} value={tab.value} label={tab.label} />
              ))}
            </Tabs>
          </Box>
          <ListComponent
            isLoading={isLoading}
            isLoadingError={isLoadingError}
            limit={limit}
            offset={offset}
            data={data}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </ContentWrapper>
      </ContentBox>
    </ContentSection>
  )
}
