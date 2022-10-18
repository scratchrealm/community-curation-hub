import { Submission } from "../../src/types/Submission";
import { AddSubmissionRequest, AddSubmissionResponse } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';
import { getDataset, getProject } from "../common/getDatabaseItems";
import randomAlphaString from "../helpers/randomAlphaString";

const addSubmissionHandler = async (request: AddSubmissionRequest, verifiedUserId?: string): Promise<AddSubmissionResponse> => {
    const { datasetId, userId, submissionUri } = request

    if (userId !== verifiedUserId) {
        throw Error('Mismatch between userId and verifiedUserId')
    }

    const dataset = await getDataset(datasetId)
    if (!dataset) throw Error('Dataset not found')
    const projectId = dataset.projectId

    await getProject(projectId)

    const submissionId = randomAlphaString(12)

    const db = firestoreDatabase()
    const collection = db.collection('cch.submissions')
    const x = await collection.doc(submissionId).get()
    if (x.exists) {
        throw Error('Submission with this ID already exists.')
    }
    const submission: Submission = {
        projectId,
        datasetId,
        submissionId,
        userId,
        description: '',
        submissionUri
    }
    await collection.doc(submissionId).set(submission)

    return {
        type: 'addSubmission',
        submissionId
    }
}

export default addSubmissionHandler