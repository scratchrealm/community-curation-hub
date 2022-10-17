import { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export type Route = {
    page: 'home'
} | {
    page: 'project'
    projectId: string
} | {
    page: 'dataset',
    projectId: string
    datasetId: string
} | {
    page: 'submission',
    projectId: string
    datasetId: string
    submissionId: string
} | {
    page: 'admin'
}

const useRoute = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const p = location.pathname
    let route: Route = {page: 'home'}
    if (p.startsWith('/p/')) {
        const x = p.split('/')
        const projectId = x[2]
        if (x[3] === 'd') {
            const datasetId = x[4]
            if (x[5] === 's') {
                const submissionId = x[6]
                route = {
                    page: 'submission',
                    projectId,
                    datasetId,
                    submissionId
                }
            }
            else {
                route = {
                    page: 'dataset',
                    projectId,
                    datasetId
                }
            }
        }
        else {
            route = {
                page: 'project',
                projectId
            }
        }
    }
    else if (p === '/admin') {
        route = {
            page: 'admin'
        }
    }

    const setRoute = useCallback((route: Route) => {
        let pathname2 = '/home'
        if (route.page === 'project') {
            pathname2 = `/p/${route.projectId}`
        }
        else if (route.page === 'dataset') {
            pathname2 = `/p/${route.projectId}/d/${route.datasetId}`
        }
        else if (route.page === 'submission') {
            pathname2 = `/p/${route.submissionId}/d/${route.datasetId}/s/${route.submissionId}`
        }
        else if (route.page === 'admin') {
            pathname2 = `/admin`
        }
        navigate({...location, pathname: pathname2})
    }, [location, navigate])
    
    return {route, setRoute}
}

export default useRoute