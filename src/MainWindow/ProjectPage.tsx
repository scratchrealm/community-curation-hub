import { Button, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { FunctionComponent, useCallback, useMemo } from "react";
import { useSignedIn } from "../components/googleSignIn/GoogleSignIn";
import Hyperlink from "../components/Hyperlink/Hyperlink";
import DatasetsTable from "./DatasetsTable";
import useProject from "./useProject";
import useProjectData from "./useProjectData";
import useRoute from "./useRoute";

type Props ={
	projectId: string
}

const ProjectPage: FunctionComponent<Props> = ({projectId}) => {
	const {project, setProjectAttributes} = useProject(projectId)
	const {projectData} = useProjectData(projectId)
	const {setRoute} = useRoute()
	const setPublic = useCallback((publicProject: boolean) => {
		setProjectAttributes({publicProject})
	}, [setProjectAttributes])
	const {userId} = useSignedIn()
	const isOwner = useMemo(() => (
		project?.ownerId === userId
	), [project?.ownerId, userId])

	const handleDownload = useCallback(() => {
		if (!projectData) return
		download(`project-${projectId}.json`, JSON.stringify(projectData, null, 4))
	}, [projectData, projectId])

	return (
		<div style={{paddingTop: 30}}>
			<div><Hyperlink onClick={() => setRoute({page: 'home'})}>Back to home</Hyperlink></div>
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
			<hr />
			<Button disabled={!projectData} onClick={handleDownload}>Download project JSON</Button>
			<hr />
			<div>
				<p>
					Below is the list of datasets for this project. Click on a dataset
					to view the submitted curations or to submit your own curation.
				</p>
			</div>
			<hr />
			<DatasetsTable
				projectId={projectId}
				isOwner={userId === project?.ownerId}
				submissionsInProject={projectData?.submissions}
			/>
		</div>
	)
}

// thanks: https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
function download(filename: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

export default ProjectPage
