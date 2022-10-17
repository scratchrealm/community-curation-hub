import { Dataset } from "../../src/types/Dataset";
import { AddDatasetRequest, AddDatasetResponse } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';
import { getProject } from "../common/getDatabaseItems";

const addDatasetHandler = async (request: AddDatasetRequest, verifiedUserId?: string): Promise<AddDatasetResponse> => {
    const { projectId, datasetId } = request
    const project = await getProject(projectId)
    if (verifiedUserId !== project.ownerId) {
        throw Error('Not authorized')
    }

    const db = firestoreDatabase()
    const collection = db.collection('cch.datasets')
    const k = `${projectId}:${datasetId}`
    const x = await collection.doc(k).get()
    if (x.exists) {
        throw Error('Dataset with this ID already exists.')
    }
    const dataset: Dataset = {
        projectId,
        datasetId,
        description: '',
        curationUrl: ''
    }
    await collection.doc(k).set(dataset)

    return {
        type: 'addDataset'
    }
}

export default addDatasetHandler