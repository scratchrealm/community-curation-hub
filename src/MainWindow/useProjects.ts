import { useCallback, useEffect, useState } from "react"
import { useSignedIn } from "../components/googleSignIn/GoogleSignIn"
import useErrorMessage from "../errorMessageContext/useErrorMessage"
import { AddProjectRequest, DeleteProjectRequest, GetProjectsForUserRequest, GetPublicProjectsRequest, isAddProjectResponse, isDeleteProjectResponse, isGetProjectsForUserResponse, isGetPublicProjectsResponse } from "../types/GuiRequest"
import { Project } from "../types/Project"
import guiApiRequest from "./guiApiRequest"

const useProjects = (mode: 'public' | 'user') => {
    const [projects, setProjects] = useState<Project[] | undefined>(undefined)
    const { userId, googleIdToken } = useSignedIn()
    const [refreshCode, setRefreshCode] = useState<number>(0)
    const refreshProjects = useCallback(() => {
        setRefreshCode(c => (c + 1))
    }, [])
    const {setErrorMessage} = useErrorMessage()

    useEffect(() => {
        ; (async () => {
            setErrorMessage('')
            setProjects(undefined)
            if (!userId) return
            let canceled = false
            if (mode === 'user') {
                const req: GetProjectsForUserRequest = {
                    type: 'getProjectsForUser',
                    userId,
                    auth: { userId, googleIdToken }
                }
                const resp = await guiApiRequest(req, { reCaptcha: false, setErrorMessage })
                if (!resp) return
                if (!isGetProjectsForUserResponse(resp)) {
                    console.warn(resp)
                    throw Error('Unexpected response')
                }
                console.log(resp)
                if (canceled) return
                setProjects(resp.projects)
            }
            else if (mode === 'public') {
                const req: GetPublicProjectsRequest = {
                    type: 'getPublicProjects',
                    auth: { userId, googleIdToken }
                }
                const resp = await guiApiRequest(req, { reCaptcha: false, setErrorMessage })
                if (!resp) return
                if (!isGetPublicProjectsResponse(resp)) {
                    console.warn(resp)
                    throw Error('Unexpected response')
                }
                console.log(resp)
                if (canceled) return
                setProjects(resp.projects)
            }
            return () => { canceled = true }
        })()
    }, [userId, googleIdToken, refreshCode, setErrorMessage, mode])

    const addProject = useCallback((label: string) => {
        if (!userId) return
            ; (async () => {
                const req: AddProjectRequest = {
                    type: 'addProject',
                    label,
                    ownerId: userId,
                    auth: { userId, googleIdToken }
                }
                const resp = await guiApiRequest(req, { reCaptcha: true, setErrorMessage })
                if (!resp) return
                if (!isAddProjectResponse(resp)) {
                    throw Error('Unexpected response')
                }
                refreshProjects()
            })()
    }, [userId, googleIdToken, refreshProjects, setErrorMessage])

    const deleteProject = useCallback((projectId: string) => {
        if (!userId) return
            ; (async () => {
                const req: DeleteProjectRequest = {
                    type: 'deleteProject',
                    projectId,
                    auth: { userId, googleIdToken }
                }
                const resp = await guiApiRequest(req, { reCaptcha: true, setErrorMessage })
                if (!resp) return
                if (!isDeleteProjectResponse(resp)) {
                    throw Error('Unexpected response')
                }
                refreshProjects()
            })()
    }, [userId, googleIdToken, refreshProjects, setErrorMessage])

    return { projects, refreshProjects, addProject, deleteProject }
}

export default useProjects