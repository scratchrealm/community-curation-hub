import { useCallback, useEffect, useState } from "react"
import { useSignedIn } from "../components/googleSignIn/GoogleSignIn"
import useErrorMessage from "../errorMessageContext/useErrorMessage"
import { Submission } from "../types/Submission"
import { AddSubmissionRequest, DeleteSubmissionRequest, GetSubmissionsForDatasetRequest, isAddSubmissionResponse, isDeleteSubmissionResponse, isGetSubmissionsForDatasetResponse } from "../types/GuiRequest"
import guiApiRequest from "./guiApiRequest"

const useSubmissionsForDataset = (datasetId: string) => {
    const [submissions, setSubmissions] = useState<Submission[] | undefined>(undefined)
    const { userId, googleIdToken } = useSignedIn()
    const [refreshCode, setRefreshCode] = useState<number>(0)
    const refreshSubmissions = useCallback(() => {
        setRefreshCode(c => (c + 1))
    }, [])
    const {setErrorMessage} = useErrorMessage()

    useEffect(() => {
        ; (async () => {
            setErrorMessage('')
            setSubmissions(undefined)
            if (!userId) return
            let canceled = false
            const req: GetSubmissionsForDatasetRequest = {
                type: 'getSubmissionsForDataset',
                datasetId,
                auth: { userId, googleIdToken }
            }
            const resp = await guiApiRequest(req, { reCaptcha: false, setErrorMessage })
            if (!resp) return
            if (!isGetSubmissionsForDatasetResponse(resp)) {
                console.warn(resp)
                throw Error('Unexpected response')
            }
            console.log(resp)
            if (canceled) return
            setSubmissions(resp.submissions)
            return () => { canceled = true }
        })()
    }, [datasetId, userId, googleIdToken, refreshCode, setErrorMessage])

    const addSubmission = useCallback((o: {submissionUri: string, userId: string}) => {
        if (!userId) return
            ; (async () => {
                const req: AddSubmissionRequest = {
                    type: 'addSubmission',
                    datasetId,
                    submissionUri: o.submissionUri,
                    userId: o.userId,
                    auth: { userId, googleIdToken }
                }
                const resp = await guiApiRequest(req, { reCaptcha: true, setErrorMessage })
                if (!resp) return
                if (!isAddSubmissionResponse(resp)) {
                    throw Error('Unexpected response')
                }
                refreshSubmissions()
            })()
    }, [datasetId, userId, googleIdToken, refreshSubmissions, setErrorMessage])

    const deleteSubmission = useCallback((submissionId: string) => {
        if (!userId) return
            ; (async () => {
                const req: DeleteSubmissionRequest = {
                    type: 'deleteSubmission',
                    submissionId,
                    auth: { userId, googleIdToken }
                }
                const resp = await guiApiRequest(req, { reCaptcha: true, setErrorMessage })
                if (!resp) return
                if (!isDeleteSubmissionResponse(resp)) {
                    throw Error('Unexpected response')
                }
                refreshSubmissions()
            })()
    }, [userId, googleIdToken, refreshSubmissions, setErrorMessage])

    return { submissions, refreshSubmissions, addSubmission, deleteSubmission }
}

export default useSubmissionsForDataset