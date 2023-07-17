import React, { useState } from 'react';
import { AdminView } from './AdminView';
import { NewUserForm } from './NewUserForm';
import { Pivot, PivotItem } from '@fluentui/react';
import { containerStyles, switchViewsButtonStyles } from './AppStyles';

export const App: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('createNew');

  const handleMenuClick = (item?: PivotItem) => {
    setSelectedKey(item?.props.itemKey || '');
  };

  // TODO: update stylying on this page to be more consistent
  return (
    <div className="App" style={containerStyles}>
      <Pivot selectedKey={selectedKey} onLinkClick={handleMenuClick} styles={switchViewsButtonStyles}>
        <PivotItem headerText="Create New User" itemKey="createNew" />
        <PivotItem headerText="View All Users" itemKey="viewAll" />
      </Pivot>
      {selectedKey === 'createNew' ? <NewUserForm /> : <AdminView />}
    </div>
  )
}
