export type NotificationType = "success" | "warning" | "error";

export interface AppNotification {
    id: number
    type: NotificationType
    message: string
}