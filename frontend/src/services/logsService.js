import { requestJson } from './apiClient.js'

export async function getRecentLogs() {
	return requestJson('/logs')
}
