import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { FunctionComponent } from "react";
import useSubmission from "./useSubmission";

type Props ={
	submissionId: string
}

const SubmissionPage: FunctionComponent<Props> = ({submissionId}) => {
	const {submission} = useSubmission(submissionId)
	return (
		<div>
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