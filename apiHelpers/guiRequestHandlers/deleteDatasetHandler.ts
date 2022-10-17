import { DeleteDatasetRequest, DeleteDatasetResponse } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';
import { getProject } from "../common/getDatabaseItems";

const deleteDatasetHandler = async (request: DeleteDatasetRequest, verifiedUserId?: string): Promise<DeleteDatasetResponse> => {
    const { projectId, datasetId } = request

    const db = firestoreDatabase()

    const project = await getProject(projectId)
    if (project.ownerId !== verifiedUserId) {
        throw Error('Not authorized')
    }
    const batch = db.batch();
    const collection = db.collection('cch.datasets')
    const k = `${projectId}:${datasetId}`
    batch.delete(collection.doc(k))

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