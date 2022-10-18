import { Button, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { FunctionComponent, useCallback, useMemo } from "react";
import { useSignedIn } from "../components/googleSignIn/GoogleSignIn";
import DatasetsTable from "./DatasetsTable";
import useProject from "./useProject";

type Props ={
	projectId: string
}

const ProjectPage: FunctionComponent<Props> = ({projectId}) => {
	const {project, setProjectAttributes} = useProject(projectId)
	const setPublic = useCallback((publicProject: boolean) => {
		setProjectAttributes({publicProject})
	}, [setProjectAttributes])
	const {userId} = useSignedIn()
	const isOwner = useMemo(() => (
		project?.ownerId === userId
	), [project?.ownerId, userId])
	return (
		<div>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>Project ID</TableCell>
						<TableCell>{projectId}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Label</TableCell>
						<TableCell>{project?.label || ''}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Owner</TableCell>
						<TableCell>{project?.ownerId || ''}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Description</TableCell>
						<TableCell>{project?.description}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Public</TableCell>
						<TableCell>
							{
								project?.publicProject ? (
									<span>
										This project is <span style={{fontWeight: 'bold'}}>public</span>.
										{isOwner && <Button onClick={() => setPublic(false)}>Make private</Button>}
									</span>
								) : (
									<span>
										This project is <span style={{fontWeight: 'bold'}}>private</span>.
										{isOwner && <Button onClick={() => setPublic(true)}>Make public</Button>}
									</span>
								)
							}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<DatasetsTable
				projectId={projectId}
			/>
		</div>
	)
}

export default ProjectPage
