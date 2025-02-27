import React from 'react'
import CredentialsForm from './CredentialsForm'
import ViewLoginActivity from './ViewLoginActivity'

const SecuritySettings = () => {
    return (
        <>
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Security Settings</h2>
                <CredentialsForm/>    
                <ViewLoginActivity />
            </div>
        </>
    )
}

export default SecuritySettings