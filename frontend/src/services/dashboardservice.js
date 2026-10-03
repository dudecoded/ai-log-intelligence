import { requestJson } from './apiClient.js'

export async function getDashboardOverview() {
	return requestJson('/dashboard/overview')
}
