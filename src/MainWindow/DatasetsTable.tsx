import { IconButton } from '@material-ui/core';
import { AddCircle, Refresh } from '@material-ui/icons';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import Hyperlink from '../components/Hyperlink/Hyperlink';
import NiceTable from '../components/NiceTable/NiceTable';
import useVisible from '../misc/useVisible';
import { Submission } from '../types/Submission';
import AddDatasetControl from './AddDatasetControl';
import useDatasetsForProject from './useDatasetsForProject';
import useRoute from './useRoute';

type Props = {
    projectId: string
    isOwner: boolean
    submissionsInProject?: Submission[]
}

const DatasetsTable: FunctionComponent<Props> = ({projectId, isOwner, submissionsInProject}) => {
    const addVisible = useVisible()

    const {setRoute} = useRoute()

    const { datasets, refreshDatasets, addDataset, deleteDataset } = useDatasetsForProject(projectId)

    const columns = useMemo(() => ([
        {
            key: 'dataset',
            label: 'Dataset'
        },
        {
            key: 'submissions',
            label: 'Submissions'
        }
    ]), [])

    const rows = useMemo(() => (
        (datasets || []).map((dataset) => ({
            key: dataset.datasetId.toString(),
            columnValues: {
                dataset: {
                    text: dataset.label,
                    element: (
                        <Hyperlink onClick={() => {setRoute({page: 'dataset', datasetId: dataset.datasetId})}}>
                            {dataset.label} ({dataset.datasetId})
                        </Hyperlink>
                    )
                },
                submissions: {
                    text: submissionsInProject ? formSubmissionsString(submissionsInProject, dataset.datasetId) : '...'
                }
            }
        }))
    ), [datasets, setRoute, submissionsInProject])

    const handleDeleteDataset = useCallback((datasetId: string) => {
        deleteDataset(datasetId)
    }, [deleteDataset])

    return (
        <div style={{maxWidth: 1000}}>
            <div className="PageHeading">Datasets</div>
            <IconButton onClick={refreshDatasets} title="Refresh datasets"><Refresh /></IconButton>
            {isOwner && <IconButton onClick={addVisible.show} title="Add dataset"><AddCircle /></IconButton>}
            {
                addVisible.visible && (
                    <AddDatasetControl
                        onAdd={addDataset}
                        onClose={addVisible.hide}
                    />
                )
            }
            <NiceTable
                columns={columns}
                rows={rows}
                onDeleteRow={handleDeleteDataset}
            />
            {
                !datasets ? (
                    <div>Loading datasets...</div>
                ) : <span />
            }
        </div>
    )
}

const formSubmissionsString = (submissionsInProject: Submission[], datasetId: string) => {
    const aa = submissionsInProject.filter(s => (s.datasetId === datasetId))
    return aa.map(s => (s.userId)).join(' | ')
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

export default DatasetsTable