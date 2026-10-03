import { requestJson } from './apiClient.js'

export async function getIncidents() {
	return requestJson('/incidents')
}
