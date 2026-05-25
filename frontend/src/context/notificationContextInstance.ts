import { createContext } from "react";
import type { NotificationType, AppNotification } from "../types/notification";

export interface NotificationContextValue {
    notifications: AppNotification[]
    pushNotification: (type: NotificationType, message: string) => void
    dismissNotification: (id: number) => void
}

export const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);
