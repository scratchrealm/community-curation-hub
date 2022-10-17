import { Dataset, isDataset } from "../../src/types/Dataset";
import { SetDatasetAttributesRequest, SetDatasetAttributesResponse } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';
import { invalidateDataset } from "../common/getDatabaseItems";

const setDatasetAttributesHandler = async (request: SetDatasetAttributesRequest, verifiedUserId?: string): Promise<SetDatasetAttributesResponse> => {
    const { projectId, datasetId, description, curationUrl } = request

    const db = firestoreDatabase()
    const collection = db.collection('cch.datasets')
    const k = `${projectId}:${datasetId}`
    const result = await collection.doc(k).get()
    if (!result.exists) {
        throw Error('Dataset does not exist.')
    }
    const dataset = result.data()
    if (!isDataset(dataset)) {
        throw Error('Invalid dataset in database')
    }
    const dataset2: Dataset = {
        ...dataset
    }
    if (description !== undefined) {
        dataset2.description = description
    }
    if (curationUrl !== undefined) {
        dataset2.curationUrl = curationUrl
    }
    await result.ref.set(dataset2)

    invalidateDataset(projectId, datasetId)

    return {
        type: 'setDatasetAttributes'
    }
}

export default setDatasetAttributesHandler