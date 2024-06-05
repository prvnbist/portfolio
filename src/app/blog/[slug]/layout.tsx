type ArticleLayoutProps = Readonly<{
	children: React.ReactNode
}>

export default function ArticleLayout({ children }: ArticleLayoutProps) {
	return (
		<div className="p-4 md:px-0 md:py-4 m-auto" style={{ maxWidth: '980px', width: '100%' }}>
			<main className="mt-6" id="article">
				{children}
			</main>
		</div>
	)
}
