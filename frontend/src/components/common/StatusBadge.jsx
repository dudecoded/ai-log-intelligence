function StatusBadge({ children, tone = 'neutral', dot = false }) {
	return (
		<span className={`status-badge status-badge-${tone}`}>
			{dot && <i aria-hidden="true" />}
			{children}
		</span>
	)
}

export default StatusBadge
