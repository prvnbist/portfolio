export const SITE = 'https://www.prvnbist.com'

export const canonical = (path: string) => [{ rel: 'canonical', href: `${SITE}${path}` }]
