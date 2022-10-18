import useWindowDimensions from '../misc/useWindowDimensions';
import { FunctionComponent, useCallback } from 'react';
import './MainWindow.css';
import useRoute from './useRoute';
import useErrorMessage from '../errorMessageContext/useErrorMessage';
import { useSignedIn } from '../components/googleSignIn/GoogleSignIn';
import logoFull from './logoFull.png'
import ApplicationBar from './ApplicationBar/ApplicationBar';
import LeftPanel from './LeftPanel';
import HomePage from './HomePage';
import ProjectPage from './ProjectPage';
import DatasetPage from './DatasetPage';
import SubmissionPage from './SubmissionPage';
import AdminPage from './AdminPage';

type Props = {
}

const MainWindow: FunctionComponent<Props> = () => {
    const {route, setRoute} = useRoute()
    const {width, height} = useWindowDimensions()

    const handleHome = useCallback(() => {
        setRoute({page: 'home'})
    }, [setRoute])

    const {errorMessage} = useErrorMessage()

    const { signedIn } = useSignedIn()

    const W = width - 290
    const H = height - 50

    return (
        <div>
            <div>
                <ApplicationBar
                    title={"Community curation hub"}
                    onHome={handleHome}
                    logo={logoFull}
                />
            </div>
            <div style={{position: 'absolute', top: 50}}>
                <div style={{position: 'absolute', left: 0, width: 250}}>
                    <LeftPanel
                        width={250}
                        height={height - 50}
                    />
                </div>
                <div style={{position: 'absolute', left: 270, width: W, height: H, overflowY: 'auto'}}>
                    {
                        errorMessage ? (
                            <span style={{color: 'red'}}>{errorMessage}</span>
                        ) : <span />
                    }
                    {
                        (route.page === 'home') ? (
                            <HomePage />
                        ) : signedIn ? (
                            (route.page === 'project') ? (
                                <ProjectPage
                                    projectId={route.projectId}
                                />
                            ) : (route.page === 'dataset') ? (
                                <DatasetPage
                                    datasetId={route.datasetId}
                                />
                            ) : (route.page === 'submission') ? (
                                <SubmissionPage
                                    submissionId={route.submissionId}
                                />
                            ) : route.page === 'admin' ? (
                                <AdminPage
                                    width={W}
                                    height={H}
                                />
                            ) : <span />
                        ) : (
                            <div>
                                <p />
                                <div className='PageBlurb'>You must sign in above.</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default MainWindow