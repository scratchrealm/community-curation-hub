import { IconButton } from '@material-ui/core';
import { AddCircle, Refresh } from '@material-ui/icons';
import { FunctionComponent, useCallback, useMemo } from 'react';
import Hyperlink from '../components/Hyperlink/Hyperlink';
import NiceTable from '../components/NiceTable/NiceTable';
import useVisible from '../misc/useVisible';
import { Dataset } from '../types/Dataset';
import AddSubmissionControl from './AddSubmissionControl';
import useRoute from './useRoute';
import useSubmissionsForDataset from './useSubmissionsForDataset';

type Props = {
    datasetId: string
    dataset?: Dataset
}

const SubmissionsTable: FunctionComponent<Props> = ({datasetId, dataset}) => {
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
        },
        {
            key: 'view',
            label: 'View'
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
                },
                view: {
                    element: (
                        dataset ? <Hyperlink href={formSubmissionUrl(dataset.curationUrl, submission.submissionUri)} target="_blank">view submission</Hyperlink> : <span />
                    )
                }
            }
        }))
    ), [submissions, setRoute, dataset])

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

export const formSubmissionUrl = (curationUrl: string, submissionUri: string) => {
    const ind = curationUrl.indexOf('?')
    if (ind < 0) return ''
    const queryString = curationUrl.slice(ind + 1)
    const queryParams = parseQs(queryString);
    const urlState = JSON.parse(queryParams['s'] || '{}')
    urlState['sortingCuration'] = submissionUri
    queryParams['s'] =JSONStringifyDeterministic(urlState)
    const ret = `${curationUrl.slice(0, ind)}?${formQs(queryParams)}`
    return ret
}

const parseQs = (qs: string) => {
    const a = qs.split('&')
    const ret: {[k: string]: string} = {}
    for (let b of a) {
        const ind1 = b.indexOf('=')
        if (ind1 > 0) {
            ret[b.slice(0, ind1)] = b.slice(ind1 + 1)
        }
    }
    return ret
}

const formQs = (p: {[k: string]: string}) => {
    const parts: string[] = []
    for (let k in p) {
        parts.push(`${k}=${p[k]}`)
    }
    return parts.join('&')
}

// Thanks: https://stackoverflow.com/questions/16167581/sort-object-properties-and-json-stringify
export const JSONStringifyDeterministic = ( obj: any, space: string | number | undefined =undefined ) => {
    var allKeys: string[] = [];
    JSON.stringify( obj, function( key, value ){ allKeys.push( key ); return value; } )
    allKeys.sort();
    return JSON.stringify( obj, allKeys, space );
}

export default SubmissionsTable