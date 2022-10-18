import { useCallback, useEffect, useState } from "react"
import { useSignedIn } from "../components/googleSignIn/GoogleSignIn"
import useErrorMessage from "../errorMessageContext/useErrorMessage"
import { Dataset } from "../types/Dataset"
import { GetProjectDataRequest, isGetProjectDataResponse } from "../types/GuiRequest"
import { Project } from "../types/Project"
import { Submission } from "../types/Submission"
import guiApiRequest from "./guiApiRequest"

const useProjectData = (projectId: string) => {
    const [projectData, setProjectData] = useState<{project: Project, datasets: Dataset[], submissions: Submission[]} | undefined>(undefined)
    const { userId, googleIdToken } = useSignedIn()
    const [refreshCode, setRefreshCode] = useState<number>(0)
    const refreshProjectData = useCallback(() => {
        setRefreshCode(c => (c + 1))
    }, [])
    const {setErrorMessage} = useErrorMessage()

    useEffect(() => {
        ; (async () => {
            setErrorMessage('')
            setProjectData(undefined)
            if (!projectId) return
            let canceled = false
            const req: GetProjectDataRequest = {
                type: 'getProjectData',
                projectId,
                auth: { userId, googleIdToken }
            }
            const resp = await guiApiRequest(req, { reCaptcha: false, setErrorMessage })
            if (!resp) return
            if (!isGetProjectDataResponse(resp)) {
                console.warn(resp)
                throw Error('Unexpected response')
            }
            console.log(resp)
            if (canceled) return
            setProjectData({project: resp.project, datasets: resp.datasets, submissions: resp.submissions})
            return () => { canceled = true }
        })()
    }, [userId, googleIdToken, projectId, refreshCode, setErrorMessage])

    return { projectData, refreshProjectData }
}

export default useProjectData