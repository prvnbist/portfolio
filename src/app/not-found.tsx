import Link from 'next/link'

const NotFound = () => {
	return (
		<div className="text-center h-full grid gap-4 place-content-center">
			<h2 className="font-serif text-3xl">Not Found</h2>
			<p className="text-md md:text-lg text-zinc-400">
				Oops seems like you landed upon unchartered teritory.
			</p>
			<Link href="/" className="text-lg">
				Go Back Home
			</Link>
		</div>
	)
}

export default NotFound
