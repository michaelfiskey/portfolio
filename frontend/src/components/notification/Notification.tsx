import type { NotificationType } from "../../types/notification"

interface NotificationProps {
    id: number,
    type: NotificationType,
    message: string
    onDismiss: (id: number) => void
}

const notificationConfig: Record<NotificationType, { background: string; icon: string; textColor: string; buttonColor: string; header: string }> = {
    error: {
        background: "border-red-700 bg-red-100",
        icon: "⚠",
        textColor: "text-red-700!",
        buttonColor: "text-red-300 hover:text-red-600",
        header: "Something went wrong",
    },
    warning: {
        background: "border-amber-600 bg-amber-100",
        icon: "!",
        textColor: "text-amber-800!",
        buttonColor: "text-amber-400 hover:text-amber-700",
        header: "Heads up",
    },
    success: {
        background: "border-emerald-700 bg-emerald-100",
        icon: "✓",
        textColor: "text-emerald-800!",
        buttonColor: "text-emerald-400 hover:text-emerald-700",
        header: "Success",
    },
};

const Notification = ({id, type, message, onDismiss} : NotificationProps) => {
    const config = notificationConfig[type];

    return (
        <div
            key={id}
            className={"flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg min-w-72 max-w-sm animate-toast " + config.background}
        >
            <span className={"text-lg leading-none shrink-0 mt-0.5 " + config.textColor}>{config.icon}</span>
            <div className="flex-1 min-w-0">
                <p className={"text-sm font-medium m-0 leading-snug " + config.textColor}>{config.header}</p>
                <p className={"text-xs m-0 mt-0.5 leading-snug " + config.textColor}>{message}</p>
            </div>
            <button
                onClick={() => onDismiss(id)}
                className={"hover:cursor-pointer text-lg leading-none shrink-0 mt-0.5 " + config.buttonColor}
            >
                ×
            </button>
        </div>
    )
}

export default Notification;
