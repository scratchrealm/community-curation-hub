import { SetProjectAttributesRequest, SetProjectAttributesResponse } from "../../src/types/GuiRequest";
import { isProject, Project } from "../../src/types/Project";
import firestoreDatabase from '../common/firestoreDatabase';
import { invalidateProject } from "../common/getDatabaseItems";

const setProjectAttributesHandler = async (request: SetProjectAttributesRequest, verifiedUserId?: string): Promise<SetProjectAttributesResponse> => {
    const { projectId, label, description, publicProject } = request

    const db = firestoreDatabase()
    const collection = db.collection('cch.projects')
    const result = await collection.doc(projectId).get()
    if (!result.exists) {
        throw Error('Project does not exist.')
    }
    const project = result.data()
    if (!isProject(project)) {
        throw Error('Invalid project in database')
    }
    if (project.ownerId !== verifiedUserId) {
        throw Error('Not authorized')
    }
    const project2: Project = {
        ...project
    }
    if (label !== undefined) {
        project2.label = label
    }
    if (description !== undefined) {
        project2.description = description
    }
    if (publicProject !== undefined) {
        project2.publicProject = publicProject
    }
    await result.ref.set(project2)

    invalidateProject(projectId)

    return {
        type: 'setProjectAttributes'
    }
}

export default setProjectAttributesHandler