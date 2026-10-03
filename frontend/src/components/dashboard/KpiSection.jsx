import { Activity, Clock3, Database, ShieldAlert } from 'lucide-react'
import StatCard from './StatCard'

const metricIcons = {
	logVolume: Database,
	anomalies: ShieldAlert,
	errorRate: Activity,
	resolutionTime: Clock3,
}

function KpiSection({ metrics }) {
	return (
		<section className="kpi-section" aria-labelledby="kpi-heading">
			<div className="section-heading-row">
				<div>
					<h2 id="kpi-heading">Key metrics</h2>
					<p>Production activity at a glance</p>
				</div>
				<span className="section-period">LAST 15 MINUTES</span>
			</div>
			<div className="kpi-grid">
				{metrics.map((metric) => (
					<StatCard key={metric.id} metric={metric} icon={metricIcons[metric.id]} />
				))}
			</div>
		</section>
	)
}

export default KpiSection
