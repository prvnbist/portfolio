export const TIMELINES = `
   query timelines {
      timelines(orderBy: from_DESC) {
         id
         url
         title
         from
         to
         location
         is_current
         description
      }
   }
`

export const DESIGNS = `
   query designs {
      designs(orderBy: priority_ASC) {
         id
         url
         title
         thumbnail {
            id
            url
         }
         description
      }
   }
`

export const CODES = `
   query codes {
      codes(orderBy: priority_ASC) {
         id
         title
         code_url
         demo_url
         thumbnail {
            id
            url
         }
         description
      }
   }
`

export const ARTICLE_TAGS = `
   query articles {
      articles {
         id
         tags
      }
   }
`

export const ARTICLES = `
   query articles($keyword: String, $tags: [ArticleTags!]) {
      articles(
         where: { title_contains: $keyword, tags_contains_all: $tags }
         orderBy: date_DESC
      ) {
         id
         title
         date
         tags
         path
      }
   }
`
