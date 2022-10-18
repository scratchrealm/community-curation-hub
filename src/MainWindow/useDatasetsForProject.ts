import { useCallback, useEffect, useState } from "react"
import { useSignedIn } from "../components/googleSignIn/GoogleSignIn"
import useErrorMessage from "../errorMessageContext/useErrorMessage"
import { Dataset } from "../types/Dataset"
import { AddDatasetRequest, DeleteDatasetRequest, GetDatasetsForProjectRequest, isAddDatasetResponse, isDeleteDatasetResponse, isGetDatasetsForProjectResponse } from "../types/GuiRequest"
import guiApiRequest from "./guiApiRequest"

const useDatasetsForProject = (projectId: string) => {
    const [datasets, setDatasets] = useState<Dataset[] | undefined>(undefined)
    const { userId, googleIdToken } = useSignedIn()
    const [refreshCode, setRefreshCode] = useState<number>(0)
    const refreshDatasets = useCallback(() => {
        setRefreshCode(c => (c + 1))
    }, [])
    const {setErrorMessage} = useErrorMessage()

    useEffect(() => {
        ; (async () => {
            setErrorMessage('')
            setDatasets(undefined)
            if (!userId) return
            let canceled = false
            const req: GetDatasetsForProjectRequest = {
                type: 'getDatasetsForProject',
                projectId,
                auth: { userId, googleIdToken }
            }
            const resp = await guiApiRequest(req, { reCaptcha: false, setErrorMessage })
            if (!resp) return
            if (!isGetDatasetsForProjectResponse(resp)) {
                console.warn(resp)
                throw Error('Unexpected response')
            }
            console.log(resp)
            if (canceled) return
            setDatasets(resp.datasets)
            return () => { canceled = true }
        })()
    }, [projectId, userId, googleIdToken, refreshCode, setErrorMessage])

    const addDataset = useCallback((label: string, o: {curationUrl: string}) => {
        if (!userId) return
            ; (async () => {
                const req: AddDatasetRequest = {
                    type: 'addDataset',
                    projectId,
                    label,
                    curationUrl: o.curationUrl,
                    auth: { userId, googleIdToken }
                }
                const resp = await guiApiRequest(req, { reCaptcha: true, setErrorMessage })
                if (!resp) return
                if (!isAddDatasetResponse(resp)) {
                    throw Error('Unexpected response')
                }
                refreshDatasets()
            })()
    }, [projectId, userId, googleIdToken, refreshDatasets, setErrorMessage])

    const deleteDataset = useCallback((datasetId: string) => {
        if (!userId) return
            ; (async () => {
                const req: DeleteDatasetRequest = {
                    type: 'deleteDataset',
                    datasetId,
                    auth: { userId, googleIdToken }
                }
                const resp = await guiApiRequest(req, { reCaptcha: true, setErrorMessage })
                if (!resp) return
                if (!isDeleteDatasetResponse(resp)) {
                    throw Error('Unexpected response')
                }
                refreshDatasets()
            })()
    }, [userId, googleIdToken, refreshDatasets, setErrorMessage])

    return { datasets, refreshDatasets, addDataset, deleteDataset }
}

export default useDatasetsForProject