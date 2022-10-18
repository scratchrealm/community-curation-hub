import { DeleteDatasetRequest, DeleteDatasetResponse } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';
import { getDataset, getProject } from "../common/getDatabaseItems";

const deleteDatasetHandler = async (request: DeleteDatasetRequest, verifiedUserId?: string): Promise<DeleteDatasetResponse> => {
    const { datasetId } = request

    const db = firestoreDatabase()

    const dataset = await getDataset(datasetId)
    if (!dataset) throw Error('Unable to find dataset')
    const project = await getProject(dataset.projectId)
    if (!project) throw Error('Unable to find project')

    if (project.ownerId !== verifiedUserId) {
        throw Error('Not authorized')
    }
    const batch = db.batch();
    const collection = db.collection('cch.datasets')
    batch.delete(collection.doc(datasetId))

    const submissionsCollection = db.collection('cch.submissions')
    const submissionsResult = await submissionsCollection.where('datasetId', '==', datasetId).get()
    submissionsResult.forEach(doc => {
        batch.delete(doc.ref)
    })

    await batch.commit()
    
    return {
        type: 'deleteDataset'
    }
}

export default deleteDatasetHandler