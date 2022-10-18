import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { FunctionComponent } from "react";
import Hyperlink from "../components/Hyperlink/Hyperlink";
import useRoute from "./useRoute";
import useSubmission from "./useSubmission";

type Props ={
	submissionId: string
}

const SubmissionPage: FunctionComponent<Props> = ({submissionId}) => {
	const {submission} = useSubmission(submissionId)
	const {setRoute} = useRoute()
	return (
		<div style={{paddingTop: 30}}>
			<div>
				{submission && <Hyperlink onClick={() => setRoute({page: 'dataset', datasetId: submission.datasetId})}>Back to dataset</Hyperlink>}
			</div>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>Submission ID</TableCell>
						<TableCell>{submissionId}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>User</TableCell>
						<TableCell>{submission?.userId}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Submission URI</TableCell>
						<TableCell>{submission?.submissionUri}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Description</TableCell>
						<TableCell>{submission?.description}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}

export default SubmissionPage