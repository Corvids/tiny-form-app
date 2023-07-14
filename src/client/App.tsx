import React, { useState } from 'react';
import { NewUserForm } from './NewUserForm';
import { AllUsersTable } from './AllUsersTable';
import { DefaultButton, Stack } from '@fluentui/react';
import { switchViewsButtonStyles } from './AppStyles';

export const App: React.FC = () => {
  const [addUser, setAddUser] = useState(true);

  const handleMenuClick = () => {
    setAddUser(!addUser);
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <Stack horizontal>
        <DefaultButton
          text={addUser ? 'View All Users' : 'Create New User'}
          onClick={handleMenuClick}
          styles={switchViewsButtonStyles}
        />
      </Stack>
      {addUser ? <NewUserForm /> : <AllUsersTable />}
    </div>
  );
};