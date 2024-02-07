export const SKILLS = `
   query skills {
      skills {
         id
         title
         category
         sub_category
      }
   }
`

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
