import { FunctionComponent } from 'react';
import { useSignedIn } from '../components/googleSignIn/GoogleSignIn';
import ProjectsTable from './ProjectsTable';

// const adminUsersJson = process.env.REACT_APP_ADMIN_USERS || "[]"
// const adminUsers = JSON.parse(adminUsersJson) as any as string[]

type Props = {
}

const HomePage: FunctionComponent<Props> = () => {
    const {signedIn, userId} = useSignedIn()
    return (
        <div>
            <div className='PageHeading'>
                Welcome to community curation hub
            </div>
            {
                signedIn ? (
                    <p>You are signed in as {userId}</p>
                ) : (
                    <p>You are not signed in. Sign in above.</p>
                )
            }
            <hr />
            <p />
            <div className='PageBlurb'>
                <p>
                    Community Curation Hub is a collection of datasets
                    together with user-submitted curations. Datasets
                    are organized into projects, and each dataset can
                    have one or more curations submitted by users.
                </p>
                <p>
                    Below is a list of public projects. Click a project
                    to see the list of associated datasets.
                </p>
            </div>
            <p />
            <hr />
            {signedIn && <ProjectsTable mode={'public'} />}
            <hr />
            {signedIn && <ProjectsTable mode={'user'} />}
        </div>
    )
}

export default HomePage