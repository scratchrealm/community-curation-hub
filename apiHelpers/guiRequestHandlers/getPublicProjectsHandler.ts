import { GetPublicProjectsRequest, GetPublicProjectsResponse } from "../../src/types/GuiRequest";
import { isProject, Project } from "../../src/types/Project";
import firestoreDatabase from '../common/firestoreDatabase';
import isAdminUser from "../helpers/isAdminUser";

const getPublicProjectsHandler = async (request: GetPublicProjectsRequest, verifiedUserId?: string): Promise<GetPublicProjectsResponse> => {
    if (!verifiedUserId) {
        throw Error('No verified user')
    }

    const db = firestoreDatabase()
    const collection = db.collection('cch.projects')
    const results = await collection.where('publicProject', '==', true).get()
    const projects: Project[] = []
    for (let doc of results.docs) {
        const x = doc.data()
        if (isProject(x)) {
            projects.push(x)
        }
        else {
            console.warn(x)
            console.warn('Invalid project in database')
            // await doc.ref.delete() // only delete if we are sure we want to -- don't risk losing data!
        }
    }
    return {
        type: 'getPublicProjects',
        projects
    }
}

export default getPublicProjectsHandler