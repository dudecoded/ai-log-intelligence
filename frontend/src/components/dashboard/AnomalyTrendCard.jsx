import { ArrowUpRight } from 'lucide-react'

const chartBounds = { left: 42, right: 18, top: 18, bottom: 34, width: 840, height: 250 }

function createLinePath(points, key, maximum) {
	const chartWidth = chartBounds.width - chartBounds.left - chartBounds.right
	const chartHeight = chartBounds.height - chartBounds.top - chartBounds.bottom

	return points.map((point, index) => {
		const xPosition = chartBounds.left + (index / (points.length - 1)) * chartWidth
		const yPosition = chartBounds.top + (1 - point[key] / maximum) * chartHeight
		return `${index === 0 ? 'M' : 'L'} ${xPosition} ${yPosition}`
	}).join(' ')
}

function AnomalyTrendCard({ trend }) {
	const maximum = Math.max(...trend.points.map((point) => Math.max(point.expected, point.actual))) * 1.12
	const actualPath = createLinePath(trend.points, 'actual', maximum)
	const expectedPath = createLinePath(trend.points, 'expected', maximum)
	const anomalyIndex = trend.points.findIndex((point) => point.isAnomaly)
	const anomalyPoint = trend.points[anomalyIndex]
	const chartWidth = chartBounds.width - chartBounds.left - chartBounds.right
	const chartHeight = chartBounds.height - chartBounds.top - chartBounds.bottom
	const anomalyX = chartBounds.left + (anomalyIndex / (trend.points.length - 1)) * chartWidth
	const anomalyY = chartBounds.top + (1 - anomalyPoint.actual / maximum) * chartHeight
	const timeLabels = [0, 6, 12, 18, 23]

	return (
		<article className="overview-panel anomaly-panel" aria-labelledby="anomaly-heading">
			<div className="panel-heading">
				<div>
					<h2 id="anomaly-heading">Anomalies over time</h2>
					<p>Real-time deviations from expected baseline behavior</p>
				</div>
				<span className="anomaly-count"><span /> 3 active</span>
			</div>
			<div className="chart-legend" aria-label="Chart legend">
				<span><i className="legend-swatch legend-expected" />Expected baseline</span>
				<span><i className="legend-swatch legend-actual" />Anomaly activity</span>
			</div>
			<div className="anomaly-chart-wrap">
				<div className="anomaly-callout">
					<span className="callout-time">{anomalyPoint.time} UTC</span>
					<strong>Spike detected</strong>
					<span>{anomalyPoint.actual} events/min <ArrowUpRight size={12} /></span>
				</div>
				<svg className="anomaly-chart" viewBox={`0 0 ${chartBounds.width} ${chartBounds.height}`} role="img" aria-label="Anomaly activity spiked above baseline at 14:50 UTC">
					{[0, 1, 2, 3].map((line) => {
						const yPosition = chartBounds.top + (line / 3) * chartHeight
						return <line className="chart-grid-line" key={line} x1={chartBounds.left} x2={chartBounds.width - chartBounds.right} y1={yPosition} y2={yPosition} />
					})}
					<path className="chart-expected-line" d={expectedPath} />
					<path className="chart-actual-line" d={actualPath} />
					<line className="chart-anomaly-marker" x1={anomalyX} x2={anomalyX} y1={chartBounds.top} y2={chartBounds.height - chartBounds.bottom} />
					<circle className="chart-anomaly-point" cx={anomalyX} cy={anomalyY} r="4" />
					{timeLabels.map((pointIndex) => {
						const xPosition = chartBounds.left + (pointIndex / (trend.points.length - 1)) * chartWidth
						return <text className="chart-time-label" key={trend.points[pointIndex].time} x={xPosition} y={chartBounds.height - 10} textAnchor="middle">{trend.points[pointIndex].time}</text>
					})}
				</svg>
			</div>
		</article>
	)
}

export default AnomalyTrendCard
