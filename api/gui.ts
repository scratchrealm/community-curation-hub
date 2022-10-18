import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'
import googleVerifyIdToken from '../apiHelpers/common/googleVerifyIdToken'
import addDatasetHandler from '../apiHelpers/guiRequestHandlers/addDatasetHandler'
import addProjectHandler from '../apiHelpers/guiRequestHandlers/addProjectHandler'
import addSubmissionHandler from '../apiHelpers/guiRequestHandlers/addSubmissionHandler'
import deleteDatasetHandler from '../apiHelpers/guiRequestHandlers/deleteDatasetHandler'
import deleteProjectHandler from '../apiHelpers/guiRequestHandlers/deleteProjectHandler'
import deleteSubmissionHandler from '../apiHelpers/guiRequestHandlers/deleteSubmissionHandler'
import getDatasetHandler from '../apiHelpers/guiRequestHandlers/getDatasetHandler'
import getDatasetsForProjectHandler from '../apiHelpers/guiRequestHandlers/getDatasetsForProjectHandler'
import getProjectHandler from '../apiHelpers/guiRequestHandlers/getProjectHandler'
import getProjectsForUserHandler from '../apiHelpers/guiRequestHandlers/getProjectsForUserHandler'
import getPublicProjectsHandler from '../apiHelpers/guiRequestHandlers/getPublicProjectsHandler'
import getSubmissionHandler from '../apiHelpers/guiRequestHandlers/getSubmissionHandler'
import getSubmissionsForDatasetHandler from '../apiHelpers/guiRequestHandlers/getSubmissionsForDatasetHandler'
import setDatasetAttributesHandler from '../apiHelpers/guiRequestHandlers/setDatasetAttributesHandler'
import setProjectAttributesHandler from '../apiHelpers/guiRequestHandlers/setProjectAttributesHandler'
import setSubmissionAttributesHandler from '../apiHelpers/guiRequestHandlers/setSubmissionAttributesHandler'
import { isGuiRequest } from '../src/types/GuiRequest'

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY

const verifyReCaptcha = async (token: string | undefined) => {
    if (!RECAPTCHA_SECRET_KEY) return undefined
    if (!token) return undefined

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`
    const x = await axios.post(url)
    return x.data
}

export type VerifiedReCaptchaInfo = {
    success: boolean,
    challenge_ts: string,
    hostname: string,
    score: number,
    action: string
}

module.exports = (req: VercelRequest, res: VercelResponse) => {    
    const {body: request} = req
    if (!isGuiRequest(request)) {
        res.status(400).send(`Invalid request: ${JSON.stringify(request)}`)
        return
    }

    const auth = request.auth
    const {userId, googleIdToken, reCaptchaToken} = auth
    if ((userId) && (!googleIdToken)) throw Error('No google id token')

    ;(async () => {
        const verifiedUserId = userId ? await googleVerifyIdToken(userId.toString(), googleIdToken) as any as string : undefined
        const verifiedReCaptchaInfo: VerifiedReCaptchaInfo | undefined = await verifyReCaptcha(reCaptchaToken)
        if (verifiedReCaptchaInfo) {
            if (!verifiedReCaptchaInfo.success) {
                throw Error('Error verifying reCaptcha token')
            }
            if (verifiedReCaptchaInfo.score < 0.4) {
                throw Error(`reCaptcha score is too low: ${verifiedReCaptchaInfo.score}`)
            }
        }
        if (request.type === 'addProject') {
            if (!verifiedReCaptchaInfo) {
                throw Error('ReCaptcha required')
            }
            return await addProjectHandler(request, verifiedUserId)
        }
        else if (request.type === 'deleteProject') {
            if (!verifiedReCaptchaInfo) {
                throw Error('ReCaptcha required')
            }
            return await deleteProjectHandler(request, verifiedUserId)
        }
        else if (request.type === 'getProjectsForUser') {
            // no recaptcha required
            return await getProjectsForUserHandler(request, verifiedUserId)
        }
        else if (request.type === 'getPublicProjects') {
            // no recaptcha required
            return await getPublicProjectsHandler(request, verifiedUserId)
        }
        else if (request.type === 'getProject') {
            // no recaptcha required
            return await getProjectHandler(request, verifiedUserId)
        }
        else if (request.type === 'setProjectAttributes') {
            if (!verifiedReCaptchaInfo) {
                throw Error('ReCaptcha required')
            }
            return await setProjectAttributesHandler(request, verifiedUserId)
        }
        else if (request.type === 'addDataset') {
            if (!verifiedReCaptchaInfo) {
                throw Error('ReCaptcha required')
            }
            return await addDatasetHandler(request, verifiedUserId)
        }
        else if (request.type === 'deleteDataset') {
            if (!verifiedReCaptchaInfo) {
                throw Error('ReCaptcha required')
            }
            return await deleteDatasetHandler(request, verifiedUserId)
        }
        else if (request.type === 'getDatasetsForProject') {
            // no recaptcha required
            return await getDatasetsForProjectHandler(request, verifiedUserId)
        }
        else if (request.type === 'getDataset') {
            // no recaptcha required
            return await getDatasetHandler(request, verifiedUserId)
        }
        else if (request.type === 'setDatasetAttributes') {
            if (!verifiedReCaptchaInfo) {
                throw Error('ReCaptcha required')
            }
            return await setDatasetAttributesHandler(request, verifiedUserId)
        }
        else if (request.type === 'addSubmission') {
            if (!verifiedReCaptchaInfo) {
                throw Error('ReCaptcha required')
            }
            return await addSubmissionHandler(request, verifiedUserId)
        }
        else if (request.type === 'deleteSubmission') {
            if (!verifiedReCaptchaInfo) {
                throw Error('ReCaptcha required')
            }
            return await deleteSubmissionHandler(request, verifiedUserId)
        }
        else if (request.type === 'getSubmissionsForDataset') {
            // no recaptcha required
            return await getSubmissionsForDatasetHandler(request, verifiedUserId)
        }
        else if (request.type === 'getSubmission') {
            // no recaptcha required
            return await getSubmissionHandler(request, verifiedUserId)
        }
        else if (request.type === 'setSubmissionAttributes') {
            if (!verifiedReCaptchaInfo) {
                throw Error('ReCaptcha required')
            }
            return await setSubmissionAttributesHandler(request, verifiedUserId)
        }
        else {
            throw Error(`Unexpected request type: ${request.type}`)
        }
    })().then((result) => {
        res.json(result)
    }).catch((error: Error) => {
        console.warn(error.message)
        res.status(500).send(`Error: ${error.message}`)
    })
}