import { ArrowUpRight, Check, ChevronDown, Radio } from 'lucide-react'
import '../styles/dashboard.css'
import AnomalyTrendCard from '../components/dashboard/AnomalyTrendCard'
import IncidentOverview from '../components/dashboard/IncidentOverview'
import KpiSection from '../components/dashboard/KpiSection'
import LogsTable from '../components/dashboard/LogsTable'
import ServiceDiagnostics from '../components/dashboard/ServiceDiagonistic'
import SeverityBreakdown from '../components/dashboard/SeverityBreakdown'
import LoadingState from '../components/common/LoadingState'
import DashboardLayout from '../components/layout/dashboardlayout'
import useDashboardData from '../hooks/useDashboardData'
import useIncidents from '../hooks/useIncidents'
import useLogs from '../hooks/useLogs'

function Dashboard() {
	const { dashboardData, isLoading, error, retry } = useDashboardData()
	const incidentsState = useIncidents()
	const logsState = useLogs()

	return (
		<DashboardLayout>
			<section className="dashboard-heading" aria-labelledby="dashboard-title">
				<div>
					<div className="breadcrumb">Workspace <span>/</span> Overview</div>
					<h1 id="dashboard-title">Dashboard</h1>
					<p className="dashboard-subtitle">A real-time view of your production systems.</p>
				</div>
				<button className="outline-action" type="button">
					<span className="button-live-dot" />
					Live view
					<ChevronDown size={15} />
				</button>
			</section>

			<section className="dashboard-status-row" aria-label="Environment status">
				<div className="status-summary">
					<span className="status-summary-icon"><Radio size={15} /></span>
					<span><strong>Live telemetry</strong><span className="status-divider">/</span> Production cluster</span>
					<span className="status-summary-check"><Check size={13} /> Connected</span>
				</div>
				<span className="status-updated">Updated just now <ArrowUpRight size={13} /></span>
			</section>

			{isLoading && <div className="dashboard-fetch-state" role="status">Loading dashboard metrics...</div>}
			{error && (
				<div className="dashboard-fetch-error" role="alert">
					<span>Dashboard data could not be loaded.</span>
					<button type="button" onClick={retry}>Try again</button>
				</div>
			)}
			{dashboardData && !isLoading && (
				<div className="dashboard-overview-content">
					<KpiSection metrics={dashboardData.metrics} />
					<section className="charts-grid" aria-label="Anomaly charts">
						<AnomalyTrendCard trend={dashboardData.anomalyTrend} />
						<SeverityBreakdown severity={dashboardData.severity} />
					</section>
					<ServiceDiagnostics services={dashboardData.services} />
					{incidentsState.isLoading ? (
						<LoadingState label="Loading incidents..." />
					) : incidentsState.error ? (
						<div className="dashboard-fetch-error" role="alert">
							<span>Incident data could not be loaded.</span>
							<button type="button" onClick={incidentsState.retry}>Try again</button>
						</div>
					) : (
						<IncidentOverview incidents={incidentsState.incidents} />
					)}
					{logsState.isLoading ? (
						<LoadingState label="Loading recent logs..." />
					) : logsState.error ? (
						<div className="dashboard-fetch-error" role="alert">
							<span>Recent logs could not be loaded.</span>
							<button type="button" onClick={logsState.retry}>Try again</button>
						</div>
					) : (
						<LogsTable logs={logsState.logs} />
					)}
				</div>
			)}
		</DashboardLayout>
	)
}

export default Dashboard
