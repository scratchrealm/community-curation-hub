import validateObject, { isString } from "./validateObject"

export type Dataset = {
    projectId: string
    datasetId: string
    label: string
    curationUrl: string
    description: string
}

export const isDataset = (x: any): x is Dataset => {
    return validateObject(x, {
        projectId: isString,
        datasetId: isString,
        label: isString,
        curationUrl: isString,
        description: isString
    })
}