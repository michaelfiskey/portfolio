import { createContext, useContext, useRef, useState } from "react";
import type { NotificationType, AppNotification } from "../types/notification";

interface NotificationContextValue {
    notifications: AppNotification[]
    pushNotification: (type: NotificationType, message: string) => void
    dismissNotification: (id: number) => void
}

const NOTIFICATION_TTL_MS = 4000;

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

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

export function useNotificationContext() {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotificationContext must be used inside NotificationProvider");
    return ctx;
}