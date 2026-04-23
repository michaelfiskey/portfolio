import { useNotificationContext } from "../../context/NotificationContext"
import Notification from "./Notification"

const NotificationToast = () => {
    const { notifications, dismissNotification } = useNotificationContext()

    if (notifications.length === 0) return null

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {notifications.map(notification => (
                <Notification
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    message={notification.message}
                    onDismiss={dismissNotification}
                />
            ))}
        </div>
    )
}

export default NotificationToast;
