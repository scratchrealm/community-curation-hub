import { Submission, isSubmission } from "../../src/types/Submission";
import { SetSubmissionAttributesRequest, SetSubmissionAttributesResponse } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';
import { invalidateSubmission } from "../common/getDatabaseItems";

const setSubmissionAttributesHandler = async (request: SetSubmissionAttributesRequest, verifiedUserId?: string): Promise<SetSubmissionAttributesResponse> => {
    const { submissionId, description } = request

    const db = firestoreDatabase()
    const collection = db.collection('cch.submissions')
    const result = await collection.doc(submissionId).get()
    if (!result.exists) {
        throw Error('Submission does not exist.')
    }
    const submission = result.data()
    if (!isSubmission(submission)) {
        throw Error('Invalid submission in database')
    }
    if (submission.userId !== verifiedUserId) {
        throw Error('Not authorized')
    }
    const submission2: Submission = {
        ...submission
    }
    if (description !== undefined) {
        submission2.description = description
    }
    await result.ref.set(submission2)

    invalidateSubmission(submissionId)

    return {
        type: 'setSubmissionAttributes'
    }
}

export default setSubmissionAttributesHandler