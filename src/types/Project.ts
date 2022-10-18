import validateObject, { isBoolean, isNumber, isString, optional } from "./validateObject"

export type Project = {
    projectId: string
    label: string
    ownerId: string
    timestampCreated: number
    description: string
    publicProject?: boolean
}

export const isProject = (x: any): x is Project => {
    return validateObject(x, {
        projectId: isString,
        label: isString,
        ownerId: isString,
        timestampCreated: isNumber,
        description: isString,
        publicProject: optional(isBoolean)
    })
}