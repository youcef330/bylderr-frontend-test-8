import React from 'react'
import StandardNotifications from './StandardNotifications'
import NotificationsChannel from './NotificationsChannel'
import NotificationHistory from './NotificationHistory'

const NotificationSettings = () => {
    return (
        <>
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Notifications Settings</h2>
                <StandardNotifications/>
                <NotificationsChannel/>
                <NotificationHistory/>
            </div>
        </>
    )
}

export default NotificationSettings