import validateObject, { isString } from "./validateObject"

export type Submission = {
    projectId: string
    datasetId: string
    submissionId: string
    uri: string
}

export const isSubmission = (x: any): x is Submission => {
    return validateObject(x, {
        projectId: isString,
        datasetId: isString,
        submissionId: isString,
        uri: isString
    })
}