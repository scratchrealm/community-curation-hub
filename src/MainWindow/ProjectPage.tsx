import { FunctionComponent } from "react";

type Props ={
	projectId: string
}

const ProjectPage: FunctionComponent<Props> = ({projectId}) => {
	const {project} = useProject(projectId)
	return (
		<div>
		</div>
	)
}

export default ProjectPage
