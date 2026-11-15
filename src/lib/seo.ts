import { SITE_URL } from '@/config/site'

export { SITE_URL as SITE }

export const canonical = (path: string) => [{ rel: 'canonical', href: `${SITE_URL}${path}` }]
