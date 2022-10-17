import { Project } from "../../src/types/Project";
import { AddProjectRequest, AddProjectResponse } from "../../src/types/GuiRequest";
import firestoreDatabase from '../common/firestoreDatabase';
import { randomAlphaLowerString } from "../helpers/randomAlphaString";

const MAX_NUM_PROJECTS_PER_USER = 12

const addProjectHandler = async (request: AddProjectRequest, verifiedUserId?: string): Promise<AddProjectResponse> => {
    const { label, ownerId } = request
    if (verifiedUserId !== ownerId) {
        throw Error('Not authorized')
    }

    const db = firestoreDatabase()
    const collection = db.collection('cch.projects')
    const results2 = await collection.where('ownerId', '==', ownerId).get()
    if (results2.docs.length + 1 > MAX_NUM_PROJECTS_PER_USER) {
        throw Error(`User cannot own more than ${MAX_NUM_PROJECTS_PER_USER} projects`)
    }
    const projectId = randomAlphaLowerString(10)
    
    const project: Project = {
        label,
        projectId,
        ownerId,
        timestampCreated: Date.now(),
        description: ''
    }
    await collection.doc(projectId).set(project)

    return {
        type: 'addProject',
        projectId
    }
}

export default addProjectHandler