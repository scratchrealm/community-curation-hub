import { GetSubmissionsForDatasetRequest, GetSubmissionsForDatasetResponse } from "../../src/types/GuiRequest";
import { isSubmission, Submission } from "../../src/types/Submission";
import firestoreDatabase from '../common/firestoreDatabase';

const getSubmissionsForDatasetHandler = async (request: GetSubmissionsForDatasetRequest, verifiedUserId?: string): Promise<GetSubmissionsForDatasetResponse> => {
    const { datasetId } = request

    const db = firestoreDatabase()
    const collection = db.collection('cch.submissions')
    const results = await collection.where('datasetId', '==', datasetId).get()
    const submissions: Submission[] = []
    for (let doc of results.docs) {
        const x = doc.data()
        if (isSubmission(x)) {
            submissions.push(x)
        }
        else {
            console.warn(x)
            console.warn('Invalid submission in database')
            // await doc.ref.delete() // only delete if we are sure we want to -- don't risk losing data!
        }
    }
    return {
        type: 'getSubmissionsForDataset',
        submissions
    }
}

export default getSubmissionsForDatasetHandler