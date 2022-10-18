import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { FunctionComponent } from "react";
import Hyperlink from "../components/Hyperlink/Hyperlink";
import SubmissionsTable from "./SubmissionsTable";
import useDataset from "./useDataset";
import useRoute from "./useRoute";

type Props ={
	datasetId: string
}

const DatasetPage: FunctionComponent<Props> = ({datasetId}) => {
	const {dataset} = useDataset(datasetId)
	const {setRoute} = useRoute()
	return (
		<div style={{paddingTop: 30}}>
			<div>
				{
					dataset && <Hyperlink onClick={() => setRoute({page: 'project', projectId: dataset.projectId})}>Back to project</Hyperlink>
				}
			</div>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>Dataset ID</TableCell>
						<TableCell>{datasetId}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Label</TableCell>
						<TableCell>{dataset?.label || ''}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Description</TableCell>
						<TableCell>{dataset?.description}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Curation URL</TableCell>
						<TableCell>{
							dataset ? (
								<Hyperlink href={dataset.curationUrl} target="_blank">{dataset.curationUrl}</Hyperlink>
							) : <span />
						}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<hr />
			<div>
				<p>
					Below is a list of curation submissions for this dataset.
					To add your own submission:
					(a) click the curation URL above;
					(b) perform the curation and save as snapshot;
					(c) copy the curation URI for the snapshot;
					(d) click below to add a new submission, paste in the URI, and click ADD.
				</p>
			</div>
			<hr />
			<SubmissionsTable
				datasetId={datasetId}
			/>
		</div>
	)
}

export default DatasetPage
