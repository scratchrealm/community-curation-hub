import { isProject, Project } from "../../src/types/Project"
import { isDataset, Dataset } from "../../src/types/Dataset"
import { isSubmission, Submission } from "../../src/types/Submission"
import firestoreDatabase from "./firestoreDatabase"

export class ObjectCache<ObjectType> {
    #cache: {[key: string]: {object: ObjectType, timestamp: number}} = {}
    constructor(private expirationMsec: number) {
    }
    set(key: string, object: ObjectType) {
        this.#cache[key] = {
            object,
            timestamp: Date.now()
        }
    }
    get(key: string) {
        const a = this.#cache[key]
        if (!a) return undefined
        const elapsed = Date.now() - a.timestamp
        if (elapsed > this.expirationMsec) {
            delete this.#cache[key]
            return undefined
        }
        return a.object
    }
    delete(key: string) {
        if (this.#cache[key]) {
            delete this.#cache[key]
        }
    }
}

const expirationMSec = 20000
const projectObjectCache = new ObjectCache<Project>(expirationMSec)
const datasetObjectCache = new ObjectCache<Dataset>(expirationMSec)
const submissionObjectCache = new ObjectCache<Submission>(expirationMSec)

export const getProject = async (projectId: string) => {
    const x = projectObjectCache.get(projectId.toString())
    if (x) return x
    const db = firestoreDatabase()
    const projectsCollection = db.collection('cch.projects')
    const projectSnapshot = await projectsCollection.doc(projectId).get()
    if (!projectSnapshot.exists) throw Error(`Project does not exist: ${projectId}`)
    const project = projectSnapshot.data()
    if (!isProject(project)) throw Error('Invalid project in database')
    projectObjectCache.set(projectId.toString(), project)
    return project
}

export const invalidateProject = (projectId: string) => {
    projectObjectCache.delete(projectId)
}

export const getDataset = async (projectId: string, datasetId: string) => {
    const k = `${projectId}:${datasetId}`
    const x = datasetObjectCache.get(k)
    if (x) return x
    const db = firestoreDatabase()
    const datasetsCollection = db.collection('cch.datasets')
    const datasetSnapshot = await datasetsCollection.doc(k).get()
    if (!datasetSnapshot.exists) throw Error(`Dataset does not exist: ${k}`)
    const dataset = datasetSnapshot.data()
    if (!isDataset(dataset)) throw Error('Invalid dataset in database')
    datasetObjectCache.set(datasetId.toString(), dataset)
    return dataset
}

export const invalidateDataset = (projectId: string, datasetId: string) => {
    const k = `${projectId}:${datasetId}`
    datasetObjectCache.delete(k)
}

export const getSubmission = async (projectId: string, datasetId: string, submissionId: string) => {
    const k = `${projectId}:${datasetId}:${submissionId}`
    const x = submissionObjectCache.get(k)
    if (x) return x
    const db = firestoreDatabase()
    const submissionsCollection = db.collection('cch.submissions')
    const submissionSnapshot = await submissionsCollection.doc(k).get()
    if (!submissionSnapshot.exists) throw Error(`Submission does not exist: ${k}`)
    const submission = submissionSnapshot.data()
    if (!isSubmission(submission)) throw Error('Invalid submission in database')
    submissionObjectCache.set(submissionId.toString(), submission)
    return submission
}