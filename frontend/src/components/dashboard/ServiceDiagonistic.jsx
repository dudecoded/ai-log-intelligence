import { Activity, Cpu, Network, RadioTower, ShieldCheck, Workflow } from 'lucide-react'
import StatusBadge from '../common/StatusBadge'

const serviceIcons = [Network, Cpu, ShieldCheck, Activity, Workflow, RadioTower]

function ServiceDiagnostics({ services }) {
	return (
		<section className="service-diagnostics" aria-labelledby="service-diagnostics-heading">
			<div className="section-heading-row">
				<div>
					<h2 id="service-diagnostics-heading">Service diagnostics &amp; drift</h2>
					<p>Health signals and baseline changes across production services</p>
				</div>
				<span className="service-summary"><span className="status-dot" />{services.filter((service) => service.state === 'healthy').length} healthy</span>
			</div>
			<div className="service-grid">
				{services.map((service, index) => {
					const Icon = serviceIcons[index % serviceIcons.length]
					return (
						<article className={`service-card service-card-${service.state}`} key={service.id}>
							<div className="service-card-heading">
								<span className="service-icon"><Icon size={15} /></span>
								<StatusBadge tone={service.state} dot>{service.state === 'healthy' ? 'Healthy' : service.state === 'watch' ? 'Watch' : 'Investigating'}</StatusBadge>
							</div>
							<span className="service-category">{service.category}</span>
							<h3>{service.name}</h3>
							<div className="service-health-line"><span>Health score</span><strong>{service.health}%</strong></div>
							<div className="service-health-track"><span style={{ width: `${service.health}%` }} /></div>
							<div className="service-metrics">
								<span><small>Latency</small><strong>{service.latency}</strong></span>
								<span><small>Error rate</small><strong>{service.errorRate}</strong></span>
							</div>
							<div className="service-drift"><span>Drift</span><strong>{service.drift}</strong></div>
						</article>
					)
				})}
			</div>
		</section>
	)
}

export default ServiceDiagnostics
