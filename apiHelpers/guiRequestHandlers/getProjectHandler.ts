import { GetProjectRequest, GetProjectResponse } from "../../src/types/GuiRequest";
import { getProject } from "../common/getDatabaseItems";

const getProjectHandler = async (request: GetProjectRequest, verifiedUserId?: string): Promise<GetProjectResponse> => {
    const { projectId } = request

    const project = await getProject(projectId)

    // if (project.ownerId !== verifiedUserId) {
    //     if (!isAdminUser(verifiedUserId)) {
    //         throw Error('Not owner of project and not admin user.')
    //     }
    // }

    return {
        type: 'getProject',
        project
    }
}

export default getProjectHandler