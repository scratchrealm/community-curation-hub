import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { FunctionComponent } from "react";
import Hyperlink from "../components/Hyperlink/Hyperlink";
import SubmissionsTable from "./SubmissionsTable";
import useDataset from "./useDataset";

type Props ={
	datasetId: string
}

const DatasetPage: FunctionComponent<Props> = ({datasetId}) => {
	const {dataset} = useDataset(datasetId)
	return (
		<div>
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
			<SubmissionsTable
				datasetId={datasetId}
			/>
		</div>
	)
}

export default DatasetPage
