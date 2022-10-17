import { IconButton } from '@material-ui/core';
import { AddCircle, Refresh } from '@material-ui/icons';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import Hyperlink from '../components/Hyperlink/Hyperlink';
import NiceTable from '../components/NiceTable/NiceTable';
import useVisible from '../misc/useVisible';
import AddProjectControl from './AddProjectControl';
import useProjectsForUser from './useProjectsForUser';
import useRoute from './useRoute';

type Props = {
}

const ProjectsTable: FunctionComponent<Props> = () => {
    const addVisible = useVisible()

    const {setRoute} = useRoute()

    const { projects, refreshProjects, addProject, deleteProject } = useProjectsForUser()

    const columns = useMemo(() => ([
        {
            key: 'project',
            label: 'Project'
        },
        {
            key: 'ownerId',
            label: 'Owner'
        },
        {
            key: 'timestampCreated',
            label: 'Created'
        }
    ]), [])

    const rows = useMemo(() => (
        (projects || []).map((project) => ({
            key: project.projectId.toString(),
            columnValues: {
                project: {
                    text: project.label,
                    element: (
                        <Hyperlink onClick={() => {setRoute({page: 'project', projectId: project.projectId})}}>
                            {project.label} ({project.projectId})
                        </Hyperlink>
                    )
                },
                ownerId: project.ownerId.toString(),
                timestampCreated: timeSince(project.timestampCreated)
            }
        }))
    ), [projects, setRoute])

    const handleDeleteProject = useCallback((projectId: string) => {
        deleteProject(projectId)
    }, [deleteProject])

    return (
        <div style={{maxWidth: 1000}}>
            <div className="PageHeading">Projects</div>
            <IconButton onClick={refreshProjects} title="Refresh projects"><Refresh /></IconButton>
            <IconButton onClick={addVisible.show} title="Add project"><AddCircle /></IconButton>
            {
                addVisible.visible && (
                    <AddProjectControl
                        onAdd={addProject}
                        onClose={addVisible.hide}
                    />
                )
            }
            <NiceTable
                columns={columns}
                rows={rows}
                onDeleteRow={handleDeleteProject}
            />
            {
                !projects ? (
                    <div>Loading projects...</div>
                ) : <span />
            }
        </div>
    )
}

// thanks https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
export function timeSince(date: number) {
    var seconds = Math.floor((Date.now() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

export default ProjectsTable