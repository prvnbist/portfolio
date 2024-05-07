'use client'

import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import remarkMdxCodeMeta from 'remark-mdx-code-meta'

import { CodeBlock } from '@/components'

type ContentProps = {
   content: string
}

const MDX_OPTIONS = {
   mdxOptions: {
      remarkPlugins: [remarkMdxCodeMeta],
      development: process.env.NODE_ENV === 'development',
   },
}

const Content = ({ content }: ContentProps) => {
   return (
      <MDXRemote
         source={content}
         options={MDX_OPTIONS}
         components={components}
      />
   )
}

const components: MDXRemoteProps['components'] = {
   // @ts-ignore
   pre: CodeBlock,
   h1: props => (
      <h1
         {...props}
         className="border-b border-gray-800 pb-3 text-4xl mt-5 mb-3"
      />
   ),
   h2: props => (
      <h2
         {...props}
         className="border-b border-gray-800 pb-3 text-3xl mt-5 mb-3"
      />
   ),
   h3: props => (
      <h3
         {...props}
         className="border-b border-gray-800 pb-3 text-2xl mt-5 mb-2"
      />
   ),
   h4: props => (
      <h4
         {...props}
         className="border-b border-gray-800 pb-3 text-xl mt-5 mb-2"
      />
   ),
   blockquote: props => (
      <blockquote {...props} className="border-l-4 border-gray-700 pl-3" />
   ),
   code: props => (
      <code
         {...props}
         className="inline-block text-gray-400 text-sm bg-gray-800 px-2 rounded"
      />
   ),
   a: props => <a {...props} className="text-blue-500 hover:text-blue-700" />,
   table: props => (
      <table {...props} className="table my-3 w-full border-collapse" />
   ),
   p: props => <p {...props} className="text-gray-400 mb-3 text-lg" />,
   tbody: props => <tbody {...props} className="border-t border-gray-700" />,
   thead: props => <thead {...props} className="h-8 border-gray-700" />,
   th: props => <th {...props} className="px-3 border-gray-700" />,
   tr: props => <tr {...props} className="h-10 px-3 border-gray-700" />,
   td: props => <td {...props} className="my-4 overflow-hidden rounded" />,
   img: props => (
      // eslint-disable-next-line
      <img
         {...props}
         alt={props.alt}
         className="rounded-md w-full object-cover"
      />
   ),
   ul: props => <ul {...props} className="list-disc pl-6" />,
   li: props => <li {...props} className="text-gray-400 my-1 text-lg" />,
   ol: props => <ol {...props} className="list-decimal pl-4" />,
   Video: props => (
      <video width="100%" controls className="my-4 rounded-md overflow-hidden">
         <source src={props.url} type="video/mp4" />
      </video>
   ),
}

export default Content
