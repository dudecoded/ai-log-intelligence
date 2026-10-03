import { useEffect, useState } from 'react'
import { getDashboardOverview } from '../services/dashboardservice.js'

function useDashboardData() {
	const [dashboardData, setDashboardData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [requestNumber, setRequestNumber] = useState(0)

	useEffect(() => {
		let isActive = true

		getDashboardOverview()
			.then((result) => {
				if (isActive) setDashboardData(result)
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
		dashboardData,
		isLoading,
		error,
		retry: () => {
			setIsLoading(true)
			setError(null)
			setRequestNumber((currentNumber) => currentNumber + 1)
		},
	}
}

export default useDashboardData
