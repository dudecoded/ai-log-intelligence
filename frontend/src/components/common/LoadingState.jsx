function LoadingState({ label = 'Loading data...' }) {
	return (
		<div className="section-loading" role="status">
			<span className="loading-indicator" aria-hidden="true" />
			<span>{label}</span>
		</div>
	)
}

export default LoadingState
