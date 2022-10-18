import { Auth, isAuth } from "./Auth"
import { Dataset, isDataset } from "./Dataset"
import { isProject, Project } from "./Project"
import { isSubmission, Submission } from "./Submission"
import validateObject, { isArrayOf, isBoolean, isEqualTo, isOneOf, isString, optional } from "./validateObject"

//////////////////////////////////////////////////////////////////////////////////
// getProjectsForUser

export type GetProjectsForUserRequest = {
    type: 'getProjectsForUser'
    userId?: string
    auth: Auth
}

export const isGetProjectsForUserRequest = (x: any): x is GetProjectsForUserRequest => {
    return validateObject(x, {
        type: isEqualTo('getProjectsForUser'),
        userId: optional(isString),
        auth: isAuth
    })
}

export type GetProjectsForUserResponse = {
    type: 'getProjectsForUser'
    projects: Project[]
}

export const isGetProjectsForUserResponse = (x: any): x is GetProjectsForUserResponse => {
    return validateObject(x, {
        type: isEqualTo('getProjectsForUser'),
        projects: isArrayOf(isProject)
    })
}

//////////////////////////////////////////////////////////////////////////////////
// getPublicProjects

export type GetPublicProjectsRequest = {
    type: 'getPublicProjects'
    auth: Auth
}

export const isGetPublicProjectsRequest = (x: any): x is GetPublicProjectsRequest => {
    return validateObject(x, {
        type: isEqualTo('getPublicProjects'),
        auth: isAuth
    })
}

export type GetPublicProjectsResponse = {
    type: 'getPublicProjects'
    projects: Project[]
}

export const isGetPublicProjectsResponse = (x: any): x is GetPublicProjectsResponse => {
    return validateObject(x, {
        type: isEqualTo('getPublicProjects'),
        projects: isArrayOf(isProject)
    })
}

//////////////////////////////////////////////////////////////////////////////////
// getProject

export type GetProjectRequest = {
    type: 'getProject'
    projectId: string
    auth: Auth
}

export const isGetProjectRequest = (x: any): x is GetProjectRequest => {
    return validateObject(x, {
        type: isEqualTo('getProject'),
        projectId: isString,
        auth: isAuth
    })
}

export type GetProjectResponse = {
    type: 'getProject'
    project: Project
}

export const isGetProjectResponse = (x: any): x is GetProjectResponse => {
    return validateObject(x, {
        type: isEqualTo('getProject'),
        project: isProject
    })
}

//////////////////////////////////////////////////////////////////////////////////
// addProject

export type AddProjectRequest = {
    type: 'addProject'
    label: string
    ownerId: string
    auth: Auth
}

export const isAddProjectRequest = (x: any): x is AddProjectRequest => {
    return validateObject(x, {
        type: isEqualTo('addProject'),
        label: isString,
        ownerId: isString,
        auth: isAuth
    })
}

export type AddProjectResponse = {
    type: 'addProject',
    projectId: string
}

export const isAddProjectResponse = (x: any): x is AddProjectResponse => {
    return validateObject(x, {
        type: isEqualTo('addProject'),
        projectId: optional(isString)
    })
}

//////////////////////////////////////////////////////////////////////////////////
// deleteProject

export type DeleteProjectRequest = {
    type: 'deleteProject'
    projectId: string
    auth: Auth
}

export const isDeleteProjectRequest = (x: any): x is DeleteProjectRequest => {
    return validateObject(x, {
        type: isEqualTo('deleteProject'),
        projectId: isString,
        auth: isAuth
    })
}

export type DeleteProjectResponse = {
    type: 'deleteProject'
}

export const isDeleteProjectResponse = (x: any): x is DeleteProjectResponse => {
    return validateObject(x, {
        type: isEqualTo('deleteProject')
    })
}

//////////////////////////////////////////////////////////////////////////////////
// setProjectAttributes

export type SetProjectAttributesRequest = {
    type: 'setProjectAttributes'
    projectId: string
    label?: string
    description?: string
    publicProject?: boolean
    auth: Auth
}

export const isSetProjectAttributesRequest = (x: any): x is SetProjectAttributesRequest => {
    return validateObject(x, {
        type: isEqualTo('setProjectAttributes'),
        projectId: isString,
        label: optional(isString),
        description: optional(isString),
        publicProject: optional(isBoolean),
        auth: isAuth
    })
}

export type SetProjectAttributesResponse = {
    type: 'setProjectAttributes'
}

export const isSetProjectAttributesResponse = (x: any): x is SetProjectAttributesResponse => {
    return validateObject(x, {
        type: isEqualTo('setProjectAttributes')
    })
}

//////////////////////////////////////////////////////////////////////////////////
// getDatasetsForProject

export type GetDatasetsForProjectRequest = {
    type: 'getDatasetsForProject'
    projectId: string
    auth: Auth
}

export const isGetDatasetsForProjectRequest = (x: any): x is GetDatasetsForProjectRequest => {
    return validateObject(x, {
        type: isEqualTo('getDatasetsForProject'),
        projectId: optional(isString),
        auth: isAuth
    })
}

export type GetDatasetsForProjectResponse = {
    type: 'getDatasetsForProject'
    datasets: Dataset[]
}

export const isGetDatasetsForProjectResponse = (x: any): x is GetDatasetsForProjectResponse => {
    return validateObject(x, {
        type: isEqualTo('getDatasetsForProject'),
        datasets: isArrayOf(isDataset)
    })
}

//////////////////////////////////////////////////////////////////////////////////
// getDataset

export type GetDatasetRequest = {
    type: 'getDataset'
    datasetId: string
    auth: Auth
}

export const isGetDatasetRequest = (x: any): x is GetDatasetRequest => {
    return validateObject(x, {
        type: isEqualTo('getDataset'),
        datasetId: isString,
        auth: isAuth
    })
}

export type GetDatasetResponse = {
    type: 'getDataset'
    dataset: Dataset
}

export const isGetDatasetResponse = (x: any): x is GetDatasetResponse => {
    return validateObject(x, {
        type: isEqualTo('getDataset'),
        dataset: isDataset
    })
}

//////////////////////////////////////////////////////////////////////////////////
// addDataset

export type AddDatasetRequest = {
    type: 'addDataset'
    projectId: string
    label: string
    curationUrl: string
    auth: Auth
}

export const isAddDatasetRequest = (x: any): x is AddDatasetRequest => {
    return validateObject(x, {
        type: isEqualTo('addDataset'),
        projectId: isString,
        label: isString,
        curationUrl: isString,
        auth: isAuth
    })
}

export type AddDatasetResponse = {
    type: 'addDataset'
    datasetId: string
}

export const isAddDatasetResponse = (x: any): x is AddDatasetResponse => {
    return validateObject(x, {
        type: isEqualTo('addDataset'),
        datasetId: isString
    })
}

//////////////////////////////////////////////////////////////////////////////////
// deleteDataset

export type DeleteDatasetRequest = {
    type: 'deleteDataset'
    datasetId: string
    auth: Auth
}

export const isDeleteDatasetRequest = (x: any): x is DeleteDatasetRequest => {
    return validateObject(x, {
        type: isEqualTo('deleteDataset'),
        datasetId: isString,
        auth: isAuth
    })
}

export type DeleteDatasetResponse = {
    type: 'deleteDataset'
}

export const isDeleteDatasetResponse = (x: any): x is DeleteDatasetResponse => {
    return validateObject(x, {
        type: isEqualTo('deleteDataset')
    })
}

//////////////////////////////////////////////////////////////////////////////////
// setDatasetAttributes

export type SetDatasetAttributesRequest = {
    type: 'setDatasetAttributes'
    datasetId: string
    label?: string
    description?: string
    curationUrl?: string
    auth: Auth
}

export const isSetDatasetAttributesRequest = (x: any): x is SetDatasetAttributesRequest => {
    return validateObject(x, {
        type: isEqualTo('setDatasetAttributes'),
        datasetId: isString,
        label: isString,
        description: optional(isString),
        curationUrl: optional(isString),
        auth: isAuth
    })
}

export type SetDatasetAttributesResponse = {
    type: 'setDatasetAttributes'
}

export const isSetDatasetAttributesResponse = (x: any): x is SetDatasetAttributesResponse => {
    return validateObject(x, {
        type: isEqualTo('setDatasetAttributes')
    })
}

//////////////////////////////////////////////////////////////////////////////////
// getSubmissionsForDataset

export type GetSubmissionsForDatasetRequest = {
    type: 'getSubmissionsForDataset'
    datasetId: string
    auth: Auth
}

export const isGetSubmissionsForDatasetRequest = (x: any): x is GetSubmissionsForDatasetRequest => {
    return validateObject(x, {
        type: isEqualTo('getSubmissionsForDataset'),
        datasetId: optional(isString),
        auth: isAuth
    })
}

export type GetSubmissionsForDatasetResponse = {
    type: 'getSubmissionsForDataset'
    submissions: Submission[]
}

export const isGetSubmissionsForDatasetResponse = (x: any): x is GetSubmissionsForDatasetResponse => {
    return validateObject(x, {
        type: isEqualTo('getSubmissionsForDataset'),
        submissions: isArrayOf(isSubmission)
    })
}

//////////////////////////////////////////////////////////////////////////////////
// getSubmission

export type GetSubmissionRequest = {
    type: 'getSubmission'
    submissionId: string
    auth: Auth
}

export const isGetSubmissionRequest = (x: any): x is GetSubmissionRequest => {
    return validateObject(x, {
        type: isEqualTo('getSubmission'),
        submissionId: isString,
        auth: isAuth
    })
}

export type GetSubmissionResponse = {
    type: 'getSubmission'
    submission: Submission
}

export const isGetSubmissionResponse = (x: any): x is GetSubmissionResponse => {
    return validateObject(x, {
        type: isEqualTo('getSubmission'),
        submission: isSubmission
    })
}

//////////////////////////////////////////////////////////////////////////////////
// addSubmission

export type AddSubmissionRequest = {
    type: 'addSubmission'
    datasetId: string
    userId: string
    submissionUri: string
    auth: Auth
}

export const isAddSubmissionRequest = (x: any): x is AddSubmissionRequest => {
    return validateObject(x, {
        type: isEqualTo('addSubmission'),
        datasetId: isString,
        userId: isString,
        submissionUri: isString,
        auth: isAuth
    })
}

export type AddSubmissionResponse = {
    type: 'addSubmission'
    submissionId: string
}

export const isAddSubmissionResponse = (x: any): x is AddSubmissionResponse => {
    return validateObject(x, {
        type: isEqualTo('addSubmission'),
        submissionId: isString
    })
}

//////////////////////////////////////////////////////////////////////////////////
// deleteSubmission

export type DeleteSubmissionRequest = {
    type: 'deleteSubmission'
    submissionId: string
    auth: Auth
}

export const isDeleteSubmissionRequest = (x: any): x is DeleteSubmissionRequest => {
    return validateObject(x, {
        type: isEqualTo('deleteSubmission'),
        submissionId: isString,
        auth: isAuth
    })
}

export type DeleteSubmissionResponse = {
    type: 'deleteSubmission'
}

export const isDeleteSubmissionResponse = (x: any): x is DeleteSubmissionResponse => {
    return validateObject(x, {
        type: isEqualTo('deleteSubmission')
    })
}

//////////////////////////////////////////////////////////////////////////////////
// setSubmissionAttributes

export type SetSubmissionAttributesRequest = {
    type: 'setSubmissionAttributes'
    submissionId: string
    description?: string
    submissionUri?: string
    auth: Auth
}

export const isSetSubmissionAttributesRequest = (x: any): x is SetSubmissionAttributesRequest => {
    return validateObject(x, {
        type: isEqualTo('setSubmissionAttributes'),
        submissionId: isString,
        description: optional(isString),
        submissionUri: optional(isString),
        auth: isAuth
    })
}

export type SetSubmissionAttributesResponse = {
    type: 'setSubmissionAttributes'
}

export const isSetSubmissionAttributesResponse = (x: any): x is SetSubmissionAttributesResponse => {
    return validateObject(x, {
        type: isEqualTo('setSubmissionAttributes')
    })
}

//////////////////////////////////////////////////////////////////////////////////
// getProjectData

export type GetProjectDataRequest = {
    type: 'getProjectData'
    projectId: string
    auth: Auth
}

export const isGetProjectDataRequest = (x: any): x is GetProjectDataRequest => {
    return validateObject(x, {
        type: isEqualTo('getProjectData'),
        projectId: isString,
        auth: isAuth
    })
}

export type GetProjectDataResponse = {
    type: 'getProjectData'
    project: Project
    datasets: Dataset[]
    submissions: Submission[]
}

export const isGetProjectDataResponse = (x: any): x is GetProjectDataResponse => {
    return validateObject(x, {
        type: isEqualTo('getProjectData'),
        project: isProject,
        datasets: isArrayOf(isDataset),
        submissions: isArrayOf(isSubmission)
    })
}


//////////////////////////////////////////////////////////////////////////////////

export type GuiRequest =
    GetProjectsForUserRequest |
    GetPublicProjectsRequest |
    GetProjectRequest |
    AddProjectRequest |
    DeleteProjectRequest |
    SetProjectAttributesRequest |
    GetDatasetsForProjectRequest |
    GetDatasetRequest |
    AddDatasetRequest |
    DeleteDatasetRequest |
    SetDatasetAttributesRequest |
    GetSubmissionsForDatasetRequest |
    GetSubmissionRequest |
    AddSubmissionRequest |
    DeleteSubmissionRequest |
    SetSubmissionAttributesRequest |
    GetProjectDataRequest

export const isGuiRequest = (x: any): x is GuiRequest => {
    return isOneOf([
        isGetProjectsForUserRequest,
        isGetPublicProjectsRequest,
        isGetProjectRequest,
        isAddProjectRequest,
        isDeleteProjectRequest,
        isSetProjectAttributesRequest,
        isGetDatasetsForProjectRequest,
        isGetDatasetRequest,
        isAddDatasetRequest,
        isDeleteDatasetRequest,
        isSetDatasetAttributesRequest,
        isGetSubmissionsForDatasetRequest,
        isGetSubmissionRequest,
        isAddSubmissionRequest,
        isDeleteSubmissionRequest,
        isSetSubmissionAttributesRequest,
        isGetProjectDataRequest
    ])(x)
}

export type GuiResponse =
    GetProjectsForUserResponse |
    GetPublicProjectsResponse |
    GetProjectResponse |
    AddProjectResponse |
    DeleteProjectResponse |
    SetProjectAttributesResponse |
    GetDatasetsForProjectResponse |
    GetDatasetResponse |
    AddDatasetResponse |
    DeleteDatasetResponse |
    SetDatasetAttributesResponse |
    GetSubmissionsForDatasetResponse |
    GetSubmissionResponse |
    AddSubmissionResponse |
    DeleteSubmissionResponse |
    SetSubmissionAttributesResponse |
    GetProjectDataResponse

export const isGuiResponse = (x: any): x is GuiResponse => {
    return isOneOf([
        isGetProjectsForUserResponse,
        isGetPublicProjectsResponse,
        isGetProjectResponse,
        isAddProjectResponse,
        isDeleteProjectResponse,
        isSetProjectAttributesResponse,
        isGetDatasetsForProjectResponse,
        isGetDatasetResponse,
        isAddDatasetResponse,
        isDeleteDatasetResponse,
        isSetDatasetAttributesResponse,
        isGetSubmissionsForDatasetResponse,
        isGetSubmissionResponse,
        isAddSubmissionResponse,
        isDeleteSubmissionResponse,
        isSetSubmissionAttributesResponse,
        isGetProjectDataResponse
    ])(x)
}