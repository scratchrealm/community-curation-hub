import { useCallback, useEffect, useState } from "react"
import { useSignedIn } from "../components/googleSignIn/GoogleSignIn"
import useErrorMessage from "../errorMessageContext/useErrorMessage"
import { GetDatasetRequest, isGetDatasetResponse } from "../types/GuiRequest"
import { Dataset } from "../types/Dataset"
import guiApiRequest from "./guiApiRequest"

const useDataset = (datasetId: string) => {
    const [dataset, setDataset] = useState<Dataset | undefined>(undefined)
    const { userId, googleIdToken } = useSignedIn()
    const [refreshCode, setRefreshCode] = useState<number>(0)
    const refreshDataset = useCallback(() => {
        setRefreshCode(c => (c + 1))
    }, [])
    const {setErrorMessage} = useErrorMessage()

    useEffect(() => {
        ; (async () => {
            setErrorMessage('')
            setDataset(undefined)
            if (!datasetId) return
            let canceled = false
            const req: GetDatasetRequest = {
                type: 'getDataset',
                datasetId,
                auth: { userId, googleIdToken }
            }
            const resp = await guiApiRequest(req, { reCaptcha: false, setErrorMessage })
            if (!resp) return
            if (!isGetDatasetResponse(resp)) {
                console.warn(resp)
                throw Error('Unexpected response')
            }
            console.log(resp)
            if (canceled) return
            setDataset(resp.dataset)
            return () => { canceled = true }
        })()
    }, [userId, googleIdToken, datasetId, refreshCode, setErrorMessage])

    return { dataset, refreshDataset }
}

export default useDataset