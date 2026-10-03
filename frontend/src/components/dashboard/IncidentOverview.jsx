import { ArrowUpRight, Clock3 } from 'lucide-react'
import EmptyState from '../common/EmptyState'
import StatusBadge from '../common/StatusBadge'

function IncidentOverview({ incidents }) {
	const activeIncidents = incidents.filter((incident) => incident.status !== 'Resolved').length

	return (
		<section className="incidents-section" aria-labelledby="incidents-heading">
			<div className="section-heading-row">
				<div>
					<h2 id="incidents-heading">Incident overview</h2>
					<p>Active incidents requiring attention</p>
				</div>
				<span className="incident-total"><strong>{activeIncidents}</strong> active</span>
			</div>
			{incidents.length === 0 ? (
				<EmptyState title="No active incidents" description="New incidents will appear here." />
			) : (
				<div className="incident-list">
					{incidents.map((incident) => (
						<article className="incident-row" key={incident.id}>
							<div className="incident-severity">
								<StatusBadge tone={incident.severity.toLowerCase()}>{incident.severity}</StatusBadge>
								<span>{incident.id}</span>
							</div>
							<div className="incident-details">
								<h3>{incident.title}</h3>
								<div className="incident-meta"><span>{incident.service}</span><span>{incident.impact}</span></div>
							</div>
							<div className="incident-state">
								<StatusBadge tone={incident.status.toLowerCase()} dot>{incident.status}</StatusBadge>
								<span><Clock3 size={12} />{incident.started}</span>
							</div>
							<ArrowUpRight className="incident-arrow" size={15} aria-hidden="true" />
						</article>
					))}
				</div>
			)}
		</section>
	)
}

export default IncidentOverview
