const SITE_URL = 'https://bruegger.dev'
const SITE_TITLE = 'Yannic Brügger'
const SITE_DESCRIPTION = 'People-first software development. Advocate for open source, education & digital sovereignty in Europe.'

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}#person`,
    name: 'Yannic Brügger',
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    knowsAbout: [
      'Software Development',
      'Open Source',
      'Web Development',
      'Digital Sovereignty',
      'Education'
    ],
    sameAs: [
      'https://github.com/yannic-bruegger'
    ]
  }
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@id': `${SITE_URL}#person`
    }
  }
}

export function getWebPageSchema(title: string, description?: string, url?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url: url,
    name: title,
    description: description || SITE_DESCRIPTION,
    inLanguage: 'en-US',
    isPartOf: {
      '@id': `${SITE_URL}#website`
    },
    about: {
      '@id': `${SITE_URL}#person`
    }
  }
}

export function getBreadcrumbListSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  }
}

export function getCombinedSchema(title: string, description?: string, url?: string, breadcrumbs?: Array<{ name: string; url: string }>) {
  const schemas: any[] = [getPersonSchema(), getWebSiteSchema(), getWebPageSchema(title, description, url)]
  
  if (breadcrumbs) {
    schemas.push(getBreadcrumbListSchema(breadcrumbs))
  }
  
  return {
    '@context': 'https://schema.org',
    '@graph': schemas
  }
}