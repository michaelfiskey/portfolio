import { createContext, useContext, useState } from "react";
import type { NotificationType } from "../components/notification/Notification"

export interface AppNotification {
    id: number
    type: NotificationType
    message: string
}

interface NotificationContextValue {
    notifications: AppNotification[]
    pushNotification: (type: NotificationType, message: string) => void
    dismissNotification: (id: number) => void
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<AppNotification[]>([]);

    const pushNotification = (type: NotificationType, message: string) =>
        setNotifications(prev => [...prev, { id: Date.now(), type:type, message }]);

    const dismissNotification = (id: number) =>
        setNotifications(prev => prev.filter(e => e.id !== id));

    return (
        <NotificationContext.Provider value={{ notifications, pushNotification, dismissNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotificationContext() {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotificationContext must be used inside NotificationProvider");
    return ctx;
}