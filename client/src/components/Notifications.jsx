import { Modal, notification } from 'antd'
import React from 'react'
import Devider from './Devider'
const Notifications = ({
    notifications = [],
    reloadNotifications,
    showNotifications,
    setShowNotifications
}) => {
    return (
        <Modal
            title="Notifications"
            open={showNotifications}
            onCancel={() => setShowNotifications(false)}
            footer={null}
            centered
            width={1000}
        >
            <div className="flex flex-col gap-2">
                {
                    notifications.map((notification) => {
                        <div className="flex flex-col gap-2 item-center border border-solid p-2">
                            <h1>{notification.title}</h1>
                            <Devider />
                            <span>{notification.message}</span>
                        </div>
                    })
                }
            </div>
        </Modal>
    )
}

export default Notifications