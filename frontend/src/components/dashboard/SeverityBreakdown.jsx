import { AlertTriangle } from 'lucide-react'

const severityColors = {
	critical: '#ff7185',
	high: '#ffac6b',
	medium: '#49d2dc',
	low: '#a98bff',
}

function SeverityBreakdown({ severity }) {
	const total = severity.reduce((sum, item) => sum + item.count, 0)
	const circumference = 2 * Math.PI * 43
	const segments = severity.reduce((result, item) => {
		const previousSegment = result[result.length - 1]
		const segmentLength = (item.count / total) * circumference
		const segmentOffset = previousSegment ? previousSegment.offset + previousSegment.length : 0
		return [...result, { ...item, length: segmentLength, offset: segmentOffset }]
	}, [])

	return (
		<article className="overview-panel severity-panel" aria-labelledby="severity-heading">
			<div className="panel-heading">
				<div>
					<h2 id="severity-heading">Severity breakdown</h2>
					<p>Distribution across active anomalies</p>
				</div>
				<AlertTriangle className="severity-heading-icon" size={15} />
			</div>
			<div className="severity-content">
				<svg className="severity-donut" viewBox="0 0 120 120" role="img" aria-label={`${total.toLocaleString()} anomalies by severity`}>
					<circle className="donut-track" cx="60" cy="60" r="43" />
					{segments.map((item) => (
							<circle
								className="donut-segment"
								cx="60"
								cy="60"
								key={item.level}
								r="43"
								stroke={severityColors[item.tone]}
								strokeDasharray={`${item.length} ${circumference - item.length}`}
								strokeDashoffset={-item.offset}
							/>
					))}
					<text className="donut-total" x="60" y="58" textAnchor="middle">{total.toLocaleString()}</text>
					<text className="donut-caption" x="60" y="72" textAnchor="middle">TOTAL</text>
				</svg>
				<ul className="severity-list">
					{severity.map((item) => (
						<li key={item.level}>
							<span className="severity-label"><i style={{ '--severity-color': severityColors[item.tone] }} />{item.level}</span>
							<strong>{item.count.toLocaleString()}</strong>
						</li>
					))}
				</ul>
			</div>
		</article>
	)
}

export default SeverityBreakdown
