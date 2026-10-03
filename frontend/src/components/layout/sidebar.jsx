import {
	Activity,
	ChartNoAxesCombined,
	FileText,
	LayoutDashboard,
	Settings,
	ShieldAlert,
	Upload,
} from 'lucide-react'

const navigationItems = [
	{ label: 'Dashboard', icon: LayoutDashboard, current: true },
	{ label: 'Logs', icon: FileText },
	{ label: 'Upload logs', icon: Upload },
	{ label: 'Analytics', icon: ChartNoAxesCombined },
	{ label: 'Anomalies', icon: ShieldAlert },
]

function Sidebar() {
	return (
		<aside className="dashboard-sidebar">
			<a className="sidebar-brand" href="#overview" aria-label="LogLens home">
				<span className="brand-mark"><Activity size={18} strokeWidth={2.4} /></span>
				<span className="brand-copy">
					<span className="brand-name">Log<span>Lens</span></span>
					<span className="brand-caption">AI INCIDENT INTELLIGENCE</span>
				</span>
			</a>

			<nav className="sidebar-navigation" aria-label="Main navigation">
				<span className="navigation-label">WORKSPACE</span>
				{navigationItems.map(({ label, icon: Icon, current }) => (
					<button
						className={`navigation-item${current ? ' is-current' : ''}`}
						key={label}
						type="button"
						aria-label={label}
						aria-current={current ? 'page' : undefined}
						title={label}
					>
						<Icon size={17} strokeWidth={1.8} />
						<span>{label}</span>
						{label === 'Anomalies' && <span className="navigation-count">3</span>}
					</button>
				))}

				<span className="navigation-label navigation-label-lower">PREFERENCES</span>
				<button className="navigation-item" type="button" aria-label="Settings" title="Settings">
					<Settings size={17} strokeWidth={1.8} />
					<span>Settings</span>
				</button>
			</nav>

			<div className="sidebar-bottom">
				<div className="connection-status">
					<span className="status-dot" />
					<span>Systems operational</span>
				</div>
				<div className="sidebar-user">
					<span className="user-avatar">AM</span>
					<span className="user-copy">
						<span className="user-name">Alex Morgan</span>
						<span className="user-role">Platform engineer</span>
					</span>
					<span className="user-menu-dots" aria-hidden="true">•••</span>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar
