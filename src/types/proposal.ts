import { TallyResultFragment } from '@/graphql'

export type TallyResult = Omit<TallyResultFragment, '__typename'>
