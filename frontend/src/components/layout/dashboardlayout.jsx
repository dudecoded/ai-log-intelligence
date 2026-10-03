import Sidebar from './sidebar'
import Topbar from './topbar'

function DashboardLayout({ children }) {
	return (
		<div className="dashboard-shell">
			<Sidebar />
			<div className="dashboard-main-column">
				<Topbar />
				<main className="dashboard-main">{children}</main>
			</div>
		</div>
	)
}

export default DashboardLayout
