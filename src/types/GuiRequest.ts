import { Auth, isAuth } from "./Auth"
import { Dataset, isDataset } from "./Dataset"
import { isProject, Project } from "./Project"
import validateObject, { isArrayOf, isEqualTo, isOneOf, isString, optional } from "./validateObject"

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
    auth: Auth
}

export const isSetProjectAttributesRequest = (x: any): x is SetProjectAttributesRequest => {
    return validateObject(x, {
        type: isEqualTo('setProjectAttributes'),
        projectId: isString,
        label: optional(isString),
        description: optional(isString),
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
        type: isEqualTo('getDatasetsForUser'),
        datasets: isArrayOf(isDataset)
    })
}

//////////////////////////////////////////////////////////////////////////////////
// getDataset

export type GetDatasetRequest = {
    type: 'getDataset'
    projectId: string
    datasetId: string
    auth: Auth
}

export const isGetDatasetRequest = (x: any): x is GetDatasetRequest => {
    return validateObject(x, {
        type: isEqualTo('getDataset'),
        projectId: isString,
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
    datasetId: string
    auth: Auth
}

export const isAddDatasetRequest = (x: any): x is AddDatasetRequest => {
    return validateObject(x, {
        type: isEqualTo('addDataset'),
        projectId: isString,
        datasetId: isString,
        auth: isAuth
    })
}

export type AddDatasetResponse = {
    type: 'addDataset'
}

export const isAddDatasetResponse = (x: any): x is AddDatasetResponse => {
    return validateObject(x, {
        type: isEqualTo('addDataset')
    })
}

//////////////////////////////////////////////////////////////////////////////////
// deleteDataset

export type DeleteDatasetRequest = {
    type: 'deleteDataset'
    projectId: string
    datasetId: string
    auth: Auth
}

export const isDeleteDatasetRequest = (x: any): x is DeleteDatasetRequest => {
    return validateObject(x, {
        type: isEqualTo('deleteDataset'),
        projectId: isString,
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
    projectId: string
    datasetId: string
    description?: string
    curationUrl?: string
    auth: Auth
}

export const isSetDatasetAttributesRequest = (x: any): x is SetDatasetAttributesRequest => {
    return validateObject(x, {
        type: isEqualTo('setDatasetAttributes'),
        projectId: isString,
        datasetId: isString,
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

export type GuiRequest =
    GetProjectsForUserRequest |
    GetProjectRequest |
    AddProjectRequest |
    DeleteProjectRequest |
    SetProjectAttributesRequest |
    GetDatasetsForProjectRequest |
    GetDatasetRequest |
    AddDatasetRequest |
    DeleteDatasetRequest |
    SetDatasetAttributesRequest

export const isGuiRequest = (x: any): x is GuiRequest => {
    return isOneOf([
        isGetProjectsForUserRequest,
        isGetProjectRequest,
        isAddProjectRequest,
        isDeleteProjectRequest,
        isSetProjectAttributesRequest,
        isGetDatasetsForProjectRequest,
        isGetDatasetRequest,
        isAddDatasetRequest,
        isDeleteDatasetRequest,
        isSetDatasetAttributesRequest
    ])(x)
}

export type GuiResponse =
    GetProjectsForUserResponse |
    GetProjectResponse |
    AddProjectResponse |
    DeleteProjectResponse |
    SetProjectAttributesResponse |
    GetDatasetsForProjectResponse |
    GetDatasetResponse |
    AddDatasetResponse |
    DeleteDatasetResponse |
    SetDatasetAttributesResponse

export const isGuiResponse = (x: any): x is GuiResponse => {
    return isOneOf([
        isGetProjectsForUserResponse,
        isGetProjectResponse,
        isAddProjectResponse,
        isDeleteProjectResponse,
        isSetProjectAttributesResponse,
        isGetDatasetsForProjectResponse,
        isGetDatasetResponse,
        isAddDatasetResponse,
        isDeleteDatasetResponse,
        isSetDatasetAttributesResponse
    ])(x)
}