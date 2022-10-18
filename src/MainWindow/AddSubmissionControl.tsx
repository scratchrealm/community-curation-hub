import { Button, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useSignedIn } from '../components/googleSignIn/GoogleSignIn'

type Props = {
    onClose?: () => void
    onAdd: (o: {userId: string, submissionUri: string}) => void
}

const AddSubmissionControl: FunctionComponent<Props> = ({onClose, onAdd}) => {
    const [editSubmissionUri, setEditSubmissionUri] = useState<string>('')
    const {userId} = useSignedIn()
    
    const handleAdd = useCallback(() => {
        onAdd({submissionUri: editSubmissionUri, userId: userId || ''})
        onClose && onClose()
    }, [onClose, userId, editSubmissionUri, onAdd])
    const okayToAdd = useMemo(() => {
        return (editSubmissionUri)
    }, [editSubmissionUri])
    const handleSubmissionUriChange = useCallback((event: any) => {
        setEditSubmissionUri(event.target.value)
    }, [])
    return (
        <div>
            <Table style={{maxWidth: 400}}>
                <TableBody>
                    <TableRow>
                        <TableCell>Submission URI</TableCell>
                        <TableCell>
                            <input type="text" value={editSubmissionUri} onChange={handleSubmissionUriChange} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button onClick={handleAdd} disabled={!okayToAdd}>Add</Button>
            {onClose && <Button onClick={onClose}>Cancel</Button>}
        </div>
    )
}

export default AddSubmissionControl