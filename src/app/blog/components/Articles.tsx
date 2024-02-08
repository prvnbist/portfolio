import Link from 'next/link'

import { Article } from '../types'

const Articles = ({ articles }: { articles: Article[] }) => {
   return Array.isArray(articles) && articles.length > 0 ? (
      <ul className="rounded-lg mt-4 border border-dark-200 divide-y divide-dark-200">
         {articles.map(article => (
            <li key={article.id} className="h-auto p-4 list-none">
               <header className="flex items-center justify-between">
                  <Link
                     href={`/blog/${article.path}`}
                     className="cursor-pointer text-white text-lg font-medium hover:text-indigo-400"
                  >
                     <h2>{article.title}</h2>
                  </Link>
                  {article.date && (
                     <span className="flex-shrink-0 text-gray-500 font-medium">
                        {new Intl.DateTimeFormat('en-US', {
                           year: 'numeric',
                           month: 'short',
                           day: 'numeric',
                        }).format(new Date(article.date))}
                     </span>
                  )}
               </header>
            </li>
         ))}
      </ul>
   ) : (
      <h4 className="mt-4 text-3xl text-center">No articles</h4>
   )
}

export default Articles
