import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

function StatCard({ metric, icon: Icon }) {
	const seriesPoints = metric.series
		.map((value, index) => `${(index / (metric.series.length - 1)) * 100},${28 - (value / Math.max(...metric.series)) * 24}`)
		.join(' ')

	return (
		<article className={`metric-card metric-card-${metric.trend}`}>
			<div className="metric-card-topline">
				<h3>{metric.title}</h3>
				<span className="metric-icon"><Icon size={16} strokeWidth={1.8} /></span>
			</div>
			<div className="metric-value">{metric.value}</div>
			<div className="metric-footline">
				<div>
					<span className={`metric-change metric-change-${metric.trend}`}>
						{metric.direction === 'up' ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
						{metric.change}
					</span>
					<span className="metric-context">{metric.context}</span>
				</div>
				<svg className="metric-sparkline" viewBox="0 0 100 30" role="img" aria-label={`${metric.title} trend`}>
					<polyline points={seriesPoints} />
				</svg>
			</div>
		</article>
	)
}

export default StatCard
