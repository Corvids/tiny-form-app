import React, { useEffect, useState } from 'react';
import { DefaultButton, DetailsList, IColumn, IconButton, TooltipHost } from '@fluentui/react';
import { User } from '../server/userModels';
import { containerStyles, deleteUserButtonStyles } from './AllUsersTableStyles';

export const AllUsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/v1/users');
        if (response.ok) {
          const allUsers: User[] = await response.json();
          setUsers(allUsers);
        } else {
          console.error(`Could not fetch users, returned ${response.status} with message ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error when attempting to fetch users :: ${error}`);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/v1/users/${userId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        console.log(`User with ID ${userId} deleted successfully.`);
      } else {
        console.error(
          `Could not delete user with ID ${userId}, returned ${response.status} with message ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(`Error when attempting to delete user :: ${error}`);
    }
  };

  const renderCell = (item: User, _: number, column: IColumn) => {
    const [showPassword, setShowPassword] = useState(false);

    const fieldName = column.fieldName as keyof User;
    const fieldContent = item[fieldName] as string;

    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
      <TooltipHost content={fieldContent}>
        <div>
          {fieldName === 'password' ? (
            <span
              style={{ cursor: 'pointer' }}
              onClick={toggleShowPassword}
              onMouseEnter={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? fieldContent : '*'.repeat(fieldContent.length)}
            </span>
          ) : (
            fieldContent
          )}
        </div>
      </TooltipHost>
    );
  };

  const columns: IColumn[] = [
    { key: 'id', name: 'ID', fieldName: 'id', minWidth: 25, maxWidth: 50, onRender: renderCell },
    { key: 'username', name: 'Username', fieldName: 'username', minWidth: 50, maxWidth: 75, onRender: renderCell },
    { key: 'firstName', name: 'First Name', fieldName: 'firstName', minWidth: 50, maxWidth: 75, onRender: renderCell },
    { key: 'lastName', name: 'Last Name', fieldName: 'lastName', minWidth: 50, maxWidth: 75, onRender: renderCell },
    { key: 'email', name: 'Email', fieldName: 'email', minWidth: 150, maxWidth: 200, onRender: renderCell },
    { key: 'password', name: 'Password', fieldName: 'password', minWidth: 75, maxWidth: 125, onRender: renderCell },
    {
      key: 'delete',
      name: 'Delete User',
      fieldName: 'delete',
      minWidth: 50,
      onRender: (user: User) => (
        <DefaultButton
          text="delete"
          onClick={() => handleDeleteUser(user.id)}
          styles={deleteUserButtonStyles}
        />
      ),
    },
  ];

  return (
    <div style={containerStyles}>
      <h3>User List</h3>
      <DetailsList items={users} columns={columns} selectionMode={0 /* None */} />
    </div>
  );
};
