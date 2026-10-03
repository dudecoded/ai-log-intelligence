const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

export async function requestJson(path) {
	const response = await fetch(`${apiBaseUrl}${path}`)

	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`)
	}

	return response.json()
}