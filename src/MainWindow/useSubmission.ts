import { useCallback, useEffect, useState } from "react"
import { useSignedIn } from "../components/googleSignIn/GoogleSignIn"
import useErrorMessage from "../errorMessageContext/useErrorMessage"
import { GetSubmissionRequest, isGetSubmissionResponse } from "../types/GuiRequest"
import { Submission } from "../types/Submission"
import guiApiRequest from "./guiApiRequest"

const useSubmission = (submissionId: string) => {
    const [submission, setSubmission] = useState<Submission | undefined>(undefined)
    const { userId, googleIdToken } = useSignedIn()
    const [refreshCode, setRefreshCode] = useState<number>(0)
    const refreshSubmission = useCallback(() => {
        setRefreshCode(c => (c + 1))
    }, [])
    const {setErrorMessage} = useErrorMessage()

    useEffect(() => {
        ; (async () => {
            setErrorMessage('')
            setSubmission(undefined)
            if (!submissionId) return
            let canceled = false
            const req: GetSubmissionRequest = {
                type: 'getSubmission',
                submissionId,
                auth: { userId, googleIdToken }
            }
            const resp = await guiApiRequest(req, { reCaptcha: false, setErrorMessage })
            if (!resp) return
            if (!isGetSubmissionResponse(resp)) {
                console.warn(resp)
                throw Error('Unexpected response')
            }
            console.log(resp)
            if (canceled) return
            setSubmission(resp.submission)
            return () => { canceled = true }
        })()
    }, [userId, googleIdToken, submissionId, refreshCode, setErrorMessage])

    return { submission, refreshSubmission }
}

export default useSubmission