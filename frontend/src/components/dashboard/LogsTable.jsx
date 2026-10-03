import { useState } from 'react'
import { Search } from 'lucide-react'
import EmptyState from '../common/EmptyState'
import StatusBadge from '../common/StatusBadge'

const severityOptions = ['All severities', 'Critical', 'High', 'Medium', 'Low']

function LogsTable({ logs }) {
	const [query, setQuery] = useState('')
	const [severityFilter, setSeverityFilter] = useState('All severities')
	const normalizedQuery = query.trim().toLowerCase()
	const filteredLogs = logs.filter((log) => {
		const matchesSeverity = severityFilter === 'All severities' || log.severity === severityFilter
		const searchableText = `${log.service} ${log.message} ${log.traceId} ${log.status}`.toLowerCase()
		return matchesSeverity && searchableText.includes(normalizedQuery)
	})

	return (
		<section className="logs-section" aria-labelledby="logs-heading">
			<div className="logs-section-header">
				<div className="section-heading-row">
					<div>
						<h2 id="logs-heading">Recent logs</h2>
						<p>Structured events from your production services</p>
					</div>
					<span className="logs-count">{filteredLogs.length} <span>of {logs.length} events</span></span>
				</div>
				<div className="logs-controls">
					<label className="logs-search">
						<Search size={14} aria-hidden="true" />
						<input
							aria-label="Filter logs"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Filter logs..."
							type="search"
						/>
					</label>
					<label className="logs-severity-select">
						<span>Severity</span>
						<select aria-label="Filter by severity" value={severityFilter} onChange={(event) => setSeverityFilter(event.target.value)}>
							{severityOptions.map((option) => <option key={option}>{option}</option>)}
						</select>
					</label>
				</div>
			</div>
			{filteredLogs.length === 0 ? (
				<EmptyState title="No matching logs" description="Try another search term or severity." />
			) : (
				<div className="logs-table-scroll">
					<table className="logs-table">
						<thead>
							<tr>
								<th scope="col">Timestamp</th>
								<th scope="col">Severity</th>
								<th scope="col">Service</th>
								<th scope="col">Event</th>
								<th scope="col">Anomaly score</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							{filteredLogs.map((log) => (
								<tr key={log.id}>
									<td className="log-time">{log.time} <span>UTC</span></td>
									<td><StatusBadge tone={log.severity.toLowerCase()}>{log.severity}</StatusBadge></td>
									<td><strong className="log-service-name">{log.service}</strong><span className="log-trace-id">{log.traceId}</span></td>
									<td className="log-message">{log.message}</td>
									<td>
										<div className="log-score"><span><i style={{ width: `${log.score}%` }} /></span><strong>{log.score}%</strong></div>
									</td>
									<td><StatusBadge tone={log.status.toLowerCase()} dot>{log.status}</StatusBadge></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	)
}

export default LogsTable
