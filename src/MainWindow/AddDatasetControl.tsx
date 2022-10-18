import { Button, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { FunctionComponent, useCallback, useMemo, useState } from 'react'

type Props = {
    onClose?: () => void
    onAdd: (datasetLabel: string, o: {curationUrl: string}) => void
}

const AddDatasetControl: FunctionComponent<Props> = ({onClose, onAdd}) => {
    const [editLabel, setEditLabel] = useState<string>('')
    const [editCurationUrl, setEditCurationUrl] = useState<string>('')
    
    const handleAdd = useCallback(() => {
        onAdd(editLabel, {curationUrl: editCurationUrl})
        onClose && onClose()
    }, [onClose, editLabel, editCurationUrl, onAdd])
    const okayToAdd = useMemo(() => {
        return isValidLabel(editLabel) && (editCurationUrl)
    }, [editLabel, editCurationUrl])
    const handleLabelChange = useCallback((event: any) => {
        setEditLabel(event.target.value)
    }, [])
    const handleCurationUrlChange = useCallback((event: any) => {
        setEditCurationUrl(event.target.value)
    }, [])
    return (
        <div>
            <Table style={{maxWidth: 400}}>
                <TableBody>
                    <TableRow>
                        <TableCell>Dataset label</TableCell>
                        <TableCell>
                            <input type="text" value={editLabel} onChange={handleLabelChange} />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Curation figURL</TableCell>
                        <TableCell>
                            <input type="text" value={editCurationUrl} onChange={handleCurationUrlChange} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button onClick={handleAdd} disabled={!okayToAdd}>Add</Button>
            {onClose && <Button onClick={onClose}>Cancel</Button>}
        </div>
    )
}

const isValidLabel = (x: string) => {
    return x.length >= 3
}

export default AddDatasetControl