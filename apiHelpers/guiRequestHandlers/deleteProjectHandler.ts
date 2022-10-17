import { DeleteProjectRequest, DeleteProjectResponse } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';
import { getProject } from "../common/getDatabaseItems";

const deleteProjectHandler = async (request: DeleteProjectRequest, verifiedUserId?: string): Promise<DeleteProjectResponse> => {
    const { projectId } = request

    const db = firestoreDatabase()

    const batch = db.batch();

    const collection = db.collection('cch.projects')
    const project = await getProject(projectId)
    if (project.ownerId !== verifiedUserId) {
        throw Error('Not authorized')
    }
    batch.delete(collection.doc(projectId.toString()))

    const datasetsCollection = db.collection('cch.datasets')
    const datasetsResult = await datasetsCollection.where('projectId', '==', projectId).get()
    datasetsResult.forEach(doc => {
        batch.delete(doc.ref)
    })

    const submissionsCollection = db.collection('cch.submissions')
    const submissionsResult = await submissionsCollection.where('projectId', '==', projectId).get()
    submissionsResult.forEach(doc => {
        batch.delete(doc.ref)
    })

    await batch.commit()
    
    return {
        type: 'deleteProject'
    }
}

export default deleteProjectHandler