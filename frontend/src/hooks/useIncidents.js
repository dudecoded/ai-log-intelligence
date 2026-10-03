import { useEffect, useState } from 'react'
import { getIncidents } from '../services/incidentsService.js'

function useIncidents() {
	const [incidents, setIncidents] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [requestNumber, setRequestNumber] = useState(0)

	useEffect(() => {
		let isActive = true

		getIncidents()
			.then((result) => {
				if (isActive) setIncidents(result)
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
		incidents,
		isLoading,
		error,
		retry: () => {
			setIsLoading(true)
			setError(null)
			setRequestNumber((currentNumber) => currentNumber + 1)
		},
	}
}

export default useIncidents
