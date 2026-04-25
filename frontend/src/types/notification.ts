export type NotificationType = "success" | "warning" | "error" | "note";

export interface AppNotification {
    id: number
    type: NotificationType
    message: string
}