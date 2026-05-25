import { useContext } from "react";
import { NotificationContext } from "../context/notificationContextInstance";

export function useNotificationContext() {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotificationContext must be used inside NotificationProvider");
    return ctx;
}
