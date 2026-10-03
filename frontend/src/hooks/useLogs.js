import { useEffect, useState } from 'react'
import { getRecentLogs } from '../services/logsService.js'

function useLogs() {
	const [logs, setLogs] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [requestNumber, setRequestNumber] = useState(0)

	useEffect(() => {
		let isActive = true

		getRecentLogs()
			.then((result) => {
				if (isActive) setLogs(result)
			})
			.catch((requestError) => {
				if (isActive) setError(requestError)
			})
			.finally(() => {
				if (isActive) setIsLoading(false)
			})

		return () => {
			isActive = false
		}
	}, [requestNumber])

	return {
		logs,
		isLoading,
		error,
		retry: () => {
			setIsLoading(true)
			setError(null)
			setRequestNumber((currentNumber) => currentNumber + 1)
		},
	}
}

export default useLogs
