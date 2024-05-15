import { ReactNode } from 'react'

type TextProps = {
   children: ReactNode
   variant?: 'outline'
}

const Button = {
   Text: (props: TextProps) => {
      return (
         <button className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-[400] rounded-lg text-sm px-5 py-2.5">
            {props.children}
         </button>
      )
   },
}

export default Button
