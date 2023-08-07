import { getI18n } from '@/locales/server'

export default async function Home() {
  const t = await getI18n()
  return <div>{t('common.back-btn')}</div>
}
