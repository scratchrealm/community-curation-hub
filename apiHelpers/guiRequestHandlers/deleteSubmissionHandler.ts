import { DeleteSubmissionRequest, DeleteSubmissionResponse } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';
import { getSubmission, getProject } from "../common/getDatabaseItems";

const deleteSubmissionHandler = async (request: DeleteSubmissionRequest, verifiedUserId?: string): Promise<DeleteSubmissionResponse> => {
    const { submissionId } = request

    const db = firestoreDatabase()

    const submission = await getSubmission(submissionId)
    if (!submission) throw Error('Unable to find submission')
    const project = await getProject(submission.projectId)
    if (!project) throw Error('Unable to find project')

    if (project.ownerId !== verifiedUserId) {
        throw Error('Not authorized')
    }
    const batch = db.batch();
    const collection = db.collection('cch.submissions')
    batch.delete(collection.doc(submissionId))

    await batch.commit()
    
    return {
        type: 'deleteSubmission'
    }
}

export default deleteSubmissionHandler