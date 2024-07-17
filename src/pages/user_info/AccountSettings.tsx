import React from 'react';
import { useUser } from 'routes/context/UserContext';

const AccountSettings: React.FC = () => {
    const { user } = useUser();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Account Settings</h1>
            {/* Add settings form or details here */}
        </div>
    );
};

export default AccountSettings;
