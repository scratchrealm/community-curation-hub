import { Dataset } from "../../src/types/Dataset";
import { AddDatasetRequest, AddDatasetResponse } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';
import { getProject } from "../common/getDatabaseItems";
import randomAlphaString from "../helpers/randomAlphaString";

const addDatasetHandler = async (request: AddDatasetRequest, verifiedUserId?: string): Promise<AddDatasetResponse> => {
    const { projectId, label, curationUrl } = request
    const project = await getProject(projectId)
    if (verifiedUserId !== project.ownerId) {
        throw Error('Not authorized')
    }

    const datasetId = randomAlphaString(12)

    const db = firestoreDatabase()
    const collection = db.collection('cch.datasets')
    const x = await collection.doc(datasetId).get()
    if (x.exists) {
        throw Error('Dataset with this ID already exists.')
    }
    const dataset: Dataset = {
        projectId,
        datasetId,
        label,
        curationUrl,
        description: ''
    }
    await collection.doc(datasetId).set(dataset)

    return {
        type: 'addDataset',
        datasetId
    }
}

export default addDatasetHandler