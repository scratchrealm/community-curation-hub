import { Dataset, isDataset } from "../../src/types/Dataset";
import { GetProjectDataRequest, GetProjectDataResponse } from "../../src/types/GuiRequest";
import { isSubmission, Submission } from "../../src/types/Submission";
import firestoreDatabase from "../common/firestoreDatabase";
import { getProject } from "../common/getDatabaseItems";
import getDatasetsForProjectHandler from "./getDatasetsForProjectHandler";

const getProjectDataHandler = async (request: GetProjectDataRequest, verifiedUserId?: string): Promise<GetProjectDataResponse> => {
    const { projectId } = request

    const project = await getProject(projectId)

    const db = firestoreDatabase()

    const datasetsCollection = db.collection('cch.datasets')
    const results = await datasetsCollection.where('projectId', '==', projectId).get()
    const datasets: Dataset[] = []
    for (let doc of results.docs) {
        const x = doc.data()
        if (isDataset(x)) {
            datasets.push(x)
        }
        else {
            console.warn(x)
            console.warn('Invalid dataset in database')
            // await doc.ref.delete() // only delete if we are sure we want to -- don't risk losing data!
        }
    }

    const submissionsCollection = db.collection('cch.submissions')
    const results2 = await submissionsCollection.where('projectId', '==', projectId).get()
    const submissions: Submission[] = []
    for (let doc of results2.docs) {
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
        type: 'getProjectData',
        project,
        datasets,
        submissions
    }
}

export default getProjectDataHandler