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
                    <p>You are not logged in. Sign in above.</p>
                )
            }
            <hr />
            <p />
            <div className='PageBlurb'>
                Projects consist of datasets which contain submissions.
            </div>
            <p />
            <hr />
            {signedIn && <ProjectsTable />}
        </div>
    )
}

export default HomePage