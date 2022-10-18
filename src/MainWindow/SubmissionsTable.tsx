import { IconButton } from '@material-ui/core';
import { AddCircle, Refresh } from '@material-ui/icons';
import { FunctionComponent, useCallback, useMemo } from 'react';
import Hyperlink from '../components/Hyperlink/Hyperlink';
import NiceTable from '../components/NiceTable/NiceTable';
import useVisible from '../misc/useVisible';
import AddSubmissionControl from './AddSubmissionControl';
import useRoute from './useRoute';
import useSubmissionsForDataset from './useSubmissionsForDataset';

type Props = {
    datasetId: string
}

const SubmissionsTable: FunctionComponent<Props> = ({datasetId}) => {
    const addVisible = useVisible()

    const {setRoute} = useRoute()

    const { submissions, refreshSubmissions, addSubmission, deleteSubmission } = useSubmissionsForDataset(datasetId)

    const columns = useMemo(() => ([
        {
            key: 'submission',
            label: 'Submission'
        },
        {
            key: 'userId',
            label: 'User'
        },
        {
            key: 'submissionUri',
            label: 'URI'
        }
    ]), [])

    const rows = useMemo(() => (
        (submissions || []).map((submission) => ({
            key: submission.submissionId.toString(),
            columnValues: {
                submission: {
                    text: submission.submissionId,
                    element: (
                        <Hyperlink onClick={() => {setRoute({page: 'submission', submissionId: submission.submissionId})}}>
                            {submission.submissionId}
                        </Hyperlink>
                    )
                },
                userId: {
                    text: submission.userId
                },
                submissionUri: {
                    text: submission.submissionUri
                }
            }
        }))
    ), [submissions, setRoute])

    const handleDeleteSubmission = useCallback((submissionId: string) => {
        deleteSubmission(submissionId)
    }, [deleteSubmission])

    return (
        <div style={{maxWidth: 1000}}>
            <div className="PageHeading">Submissions</div>
            <IconButton onClick={refreshSubmissions} title="Refresh submissions"><Refresh /></IconButton>
            <IconButton onClick={addVisible.show} title="Add submission"><AddCircle /></IconButton>
            {
                addVisible.visible && (
                    <AddSubmissionControl
                        onAdd={addSubmission}
                        onClose={addVisible.hide}
                    />
                )
            }
            <NiceTable
                columns={columns}
                rows={rows}
                onDeleteRow={handleDeleteSubmission}
            />
            {
                !submissions ? (
                    <div>Loading submissions...</div>
                ) : <span />
            }
        </div>
    )
}

export default SubmissionsTable