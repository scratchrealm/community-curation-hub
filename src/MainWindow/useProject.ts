import { useCallback, useEffect, useState } from "react"
import { useSignedIn } from "../components/googleSignIn/GoogleSignIn"
import useErrorMessage from "../errorMessageContext/useErrorMessage"
import { GetProjectRequest, isGetProjectResponse, isSetProjectAttributesResponse, SetProjectAttributesRequest } from "../types/GuiRequest"
import { Project } from "../types/Project"
import guiApiRequest from "./guiApiRequest"

const useProject = (projectId: string) => {
    const [project, setProject] = useState<Project | undefined>(undefined)
    const { userId, googleIdToken } = useSignedIn()
    const [refreshCode, setRefreshCode] = useState<number>(0)
    const refreshProject = useCallback(() => {
        setRefreshCode(c => (c + 1))
    }, [])
    const {setErrorMessage} = useErrorMessage()

    useEffect(() => {
        ; (async () => {
            setErrorMessage('')
            setProject(undefined)
            if (!projectId) return
            let canceled = false
            const req: GetProjectRequest = {
                type: 'getProject',
                projectId,
                auth: { userId, googleIdToken }
            }
            const resp = await guiApiRequest(req, { reCaptcha: false, setErrorMessage })
            if (!resp) return
            if (!isGetProjectResponse(resp)) {
                console.warn(resp)
                throw Error('Unexpected response')
            }
            console.log(resp)
            if (canceled) return
            setProject(resp.project)
            return () => { canceled = true }
        })()
    }, [userId, googleIdToken, projectId, refreshCode, setErrorMessage])

    const setProjectAttributes = useCallback((x: {
        label?: string,
        description?: string,
        publicProject?: boolean
    }) => {
        const {label, description, publicProject} = x
        ;(async () => {
            setErrorMessage('')
            const req: SetProjectAttributesRequest = {
                type: 'setProjectAttributes',
                projectId,
                label,
                description,
                publicProject,
                auth: { userId, googleIdToken }
            }
            const resp = await guiApiRequest(req, { reCaptcha: true, setErrorMessage })
            if (!resp) return
            if (!isSetProjectAttributesResponse(resp)) {
                console.warn(resp)
                throw Error('Unexpected response')
            }
            refreshProject()
        })()
    }, [setErrorMessage, userId, googleIdToken, projectId, refreshProject])

    return { project, refreshProject, setProjectAttributes }
}

export default useProject