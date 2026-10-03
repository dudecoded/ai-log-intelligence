import {
	Bell,
	ChevronDown,
	CircleHelp,
	Clock3,
	Search,
} from 'lucide-react'

function Topbar() {
	return (
		<header className="dashboard-topbar">
			<div className="topbar-search-wrap">
				<Search size={16} strokeWidth={1.8} />
				<input
					aria-label="Search logs, traces, services, and events"
					placeholder="Search logs, traces, services..."
					type="search"
				/>
				<kbd>⌘ K</kbd>
			</div>

			<div className="topbar-actions">
				<button className="topbar-select" type="button" aria-label="Environment: Production Global">
					<span className="environment-dot" />
					<span>Production Global</span>
					<ChevronDown size={14} />
				</button>
				<button className="topbar-select time-select" type="button" aria-label="Time range: Last 15 minutes">
					<Clock3 size={15} />
					<span>Last 15 min</span>
					<ChevronDown size={14} />
				</button>
				<button className="topbar-icon-button help-button" type="button" aria-label="Help">
					<CircleHelp size={17} />
				</button>
				<button className="topbar-icon-button notification-button" type="button" aria-label="Notifications, 3 unread">
					<Bell size={17} />
					<span className="notification-indicator" />
				</button>
				<button className="topbar-avatar" type="button" aria-label="Account menu: Alex Morgan">A</button>
			</div>
		</header>
	)
}

export default Topbar
