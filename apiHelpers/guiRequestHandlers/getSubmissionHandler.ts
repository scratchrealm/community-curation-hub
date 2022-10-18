import { GetSubmissionRequest, GetSubmissionResponse } from "../../src/types/GuiRequest";
import { getSubmission } from "../common/getDatabaseItems";

const getSubmissionHandler = async (request: GetSubmissionRequest, verifiedUserId?: string): Promise<GetSubmissionResponse> => {
    const { submissionId } = request

    const submission = await getSubmission(submissionId)

    return {
        type: 'getSubmission',
        submission
    }
}

export default getSubmissionHandler