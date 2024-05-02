import { ProposalType } from '@rarimo/client'
import { useMemo } from 'react'

import { PROPOSAL_TYPES_MAP } from '@/const'
import { ProposalBaseFragment, ProposalFragment } from '@/graphql'
import { useLocalize } from '@/hooks'
import { useI18n } from '@/locales/client'

export const useProposalMetadata = (proposal?: ProposalBaseFragment | ProposalFragment) => {
  const { localizeProposalType } = useLocalize()
  const t = useI18n()

  const isContentArray = useMemo(() => Array.isArray(proposal?.content), [proposal])

  // @ts-ignore
  const getProposalType = (type: string) => {
    for (const key in PROPOSAL_TYPES_MAP) {
      if (type.includes(key)) {
        return PROPOSAL_TYPES_MAP[key as keyof typeof PROPOSAL_TYPES_MAP]
      }
    }
  }

  const proposalType = useMemo(() => {
    if (!proposal) return ''

    const content = proposal?.content

    if (isContentArray) {
      return getProposalType(content[0]?.content?.['@type'] ?? '')
    }

    return getProposalType(content?.['@type'] ?? '')
  }, [proposal, isContentArray])

  const proposalTypesLocalized = useMemo(() => {
    if (!proposal) return []
    if (!isContentArray) {
      return [localizeProposalType(proposalType as ProposalType) || t('proposal-type.unknown-lbl')]
    }

    return proposal?.content?.reduce((acc: string[], i: { content: { [x: string]: string } }) => {
      const type = getProposalType(i?.content['@type'])
      if (type) {
        acc.push(localizeProposalType(type as ProposalType) || t('proposal-type.unknown-lbl'))
      }
      return acc
    }, [])
  }, [proposal, isContentArray, proposalType, localizeProposalType, t])

  // @ts-ignore
  const metadata = useMemo(() => {
    const metadata = { title: '', description: '', type: '' }

    if (!proposal) return metadata

    const content = proposal?.content

    metadata.type =
      localizeProposalType(proposalType as ProposalType) || t('proposal-type.unknown-lbl')

    if (isContentArray) {
      metadata.title = content?.[0]?.content?.title ?? ''
      metadata.description = content?.content?.description ?? ''
    } else {
      metadata.title = content?.title ?? ''
      metadata.description = content?.description ?? ''
    }

    if (metadata.title && metadata.description) return metadata

    let parseErr = false

    if (proposal?.metadata) {
      try {
        const parsedMetadata = JSON.parse(proposal.metadata)
        if (parsedMetadata.title) {
          metadata.title = parsedMetadata.title
        }
        if (parsedMetadata.description) {
          metadata.description = parsedMetadata.description
        }
      } catch (e) {
        parseErr = true
      }
    }

    if (proposal?.metadata && !parseErr) return metadata
  }, [proposal, localizeProposalType, proposalType, t, isContentArray])

  return { metadata, proposalTypesLocalized }
}
