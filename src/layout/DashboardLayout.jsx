import Header from '@/components/Header';
import React from 'react'

const DashboardLayout = ({ children }) => {
    return (
        <section className='h-full  w-full'>
            <div className={``}>
                <Header />
                <div className='flex-1 overscroll-y-auto'>
                    {children}
                </div>
            </div>
        </section>
    )
}

export default DashboardLayout;