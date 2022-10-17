import { GetDatasetRequest, GetDatasetResponse } from "../../src/types/GuiRequest";
import { getDataset } from "../common/getDatabaseItems";

const getDatasetHandler = async (request: GetDatasetRequest, verifiedUserId?: string): Promise<GetDatasetResponse> => {
    const { projectId, datasetId } = request

    const dataset = await getDataset(projectId, datasetId)

    return {
        type: 'getDataset',
        dataset
    }
}

export default getDatasetHandler