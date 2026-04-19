import { useNotificationContext } from "../../context/NotificationContext"
import { useEffect } from 'react'
import Notification, { notificationHeaderByType } from "./Notification"

const NotificationToast = () => {
    const EXIST_MILLISECONDS = 4000

    const { notifications, dismissNotification } = useNotificationContext()

    useEffect(() => {
        if (notifications.length === 0) return
        const latest = notifications[notifications.length - 1]
        const timer = setTimeout(() => dismissNotification(latest.id), EXIST_MILLISECONDS)
        return () => clearTimeout(timer)
    }, [notifications])

    if (notifications.length === 0) return null

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {notifications.map(notification => (
                <Notification
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    header={notificationHeaderByType[notification.type]}
                    message={notification.message}
                    onDismiss={dismissNotification}
                />
            ))}
        </div>
    )
}

export default NotificationToast;