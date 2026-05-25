import { useRef, useState } from "react";
import type { NotificationType, AppNotification } from "../types/notification";
import { NotificationContext } from "./notificationContextInstance";

const NOTIFICATION_TTL_MS = 5000;

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<AppNotification[]>([]);
    const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

    const dismissNotification = (id: number) => {
        clearTimeout(timers.current.get(id));
        timers.current.delete(id);
        setNotifications(prev => prev.filter(e => e.id !== id));
    };

    const pushNotification = (type: NotificationType, message: string) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, type, message }]);
        timers.current.set(id, setTimeout(() => dismissNotification(id), NOTIFICATION_TTL_MS));
    };

    return (
        <NotificationContext.Provider value={{ notifications, pushNotification, dismissNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}
