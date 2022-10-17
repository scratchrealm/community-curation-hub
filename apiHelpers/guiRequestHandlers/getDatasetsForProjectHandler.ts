import { Dataset, isDataset } from "../../src/types/Dataset";
import { GetDatasetsForProjectRequest, GetDatasetsForProjectResponse } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';

const getDatasetsForProjectHandler = async (request: GetDatasetsForProjectRequest, verifiedUserId?: string): Promise<GetDatasetsForProjectResponse> => {
    const { projectId } = request

    const db = firestoreDatabase()
    const collection = db.collection('cch.datasets')
    const results = await collection.where('projectId', '==', projectId).get()
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
    return {
        type: 'getDatasetsForProject',
        datasets
    }
}

export default getDatasetsForProjectHandler