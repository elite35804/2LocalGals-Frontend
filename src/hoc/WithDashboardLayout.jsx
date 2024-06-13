import React from 'react'
import DashboardLayout from '../layout/DashboardLayout';

const WithDashboardLayout = (WrapperComponent) => {
    const WithDashboard = (props) => (
        <DashboardLayout>
            <WrapperComponent {...props} />
        </DashboardLayout>
    );
    return WithDashboard;
}

export default WithDashboardLayout;
