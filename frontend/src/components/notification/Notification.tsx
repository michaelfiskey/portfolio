import type { AppNotification } from "../../context/NotificationContext"
export type NotificationType = "success" | "warning" | "error";

interface NotificationProps {
    id: number,
    type: NotificationType,
    header: string
    message: string
    onDismiss: (id: number) => void
}

const notificationTheme: Record<NotificationType, { background: string; icon: string; textColor: string; buttonColor: string }> = {
    error: {
        background: "border-red-700 bg-red-100",
        icon: "⚠",
        textColor: "text-red-700!",
        buttonColor: "text-red-300 hover:text-red-600",
    },
    warning: {
        background: "border-amber-600 bg-amber-100",
        icon: "!",
        textColor: "text-amber-800!",
        buttonColor: "text-amber-400 hover:text-amber-700",
    },
    success: {
        background: "border-emerald-700 bg-emerald-100",
        icon: "✓",
        textColor: "text-emerald-800!",
        buttonColor: "text-emerald-400 hover:text-emerald-700",
    },
};

const Notification = ({id, type, header, message, onDismiss} : NotificationProps) => {
    const theme = notificationTheme[type];
    
    return (
        <div
            key={id}
            className={"flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg min-w-72 max-w-sm animate-toast " + theme.background}
        >
            <span className={"text-lg leading-none shrink-0 mt-0.5 " + theme.textColor}>{theme.icon}</span>
            <div className="flex-1 min-w-0">
                <p className={"text-sm font-medium m-0 leading-snug " + theme.textColor}>{header}</p>
                <p className={"text-xs m-0 mt-0.5 leading-snug " + theme.textColor}>{message}</p>
            </div>
            <button
                onClick={() => onDismiss(id)}
                className={"hover:cursor-pointer text-lg leading-none shrink-0 mt-0.5 " + theme.buttonColor}
            >
                ×
            </button>
        </div>
    )
}

export const notificationHeaderByType: Record<AppNotification["type"], string> = {
    error: "Something went wrong",
    warning: "Heads up",
    success: "Success",
};

export default Notification;