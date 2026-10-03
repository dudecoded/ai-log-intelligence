import { SearchX } from 'lucide-react'

function EmptyState({ title, description }) {
	return (
		<div className="section-empty-state">
			<SearchX size={18} aria-hidden="true" />
			<strong>{title}</strong>
			<span>{description}</span>
		</div>
	)
}

export default EmptyState
