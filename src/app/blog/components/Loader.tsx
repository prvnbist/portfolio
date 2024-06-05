const Loader = () => {
	return (
		<div className="flex flex-col gap-6">
			<div className="h-10 rounded-lg w-full bg-dark-300" />
			<div className="flex flex-col gap-3">
				<div className="h-5 rounded-lg w-[80px] bg-dark-300" />
				<div className="flex gap-2">
					<div className="h-4 rounded-lg w-[80px] bg-dark-300" />
					<div className="h-4 rounded-lg w-[50px] bg-dark-300" />
					<div className="h-4 rounded-lg w-[90px] bg-dark-300" />
					<div className="h-4 rounded-lg w-[60px] bg-dark-300" />
				</div>
			</div>
		</div>
	)
}

export default Loader
