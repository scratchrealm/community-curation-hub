import validateObject, { isNumber, isString } from "./validateObject"

export type Project = {
    projectId: string
    label: string
    ownerId: string
    timestampCreated: number
    description: string
}

export const isProject = (x: any): x is Project => {
    return validateObject(x, {
        projectId: isString,
        label: isString,
        ownerId: isString,
        timestampCreated: isNumber,
        description: isString
    })
}