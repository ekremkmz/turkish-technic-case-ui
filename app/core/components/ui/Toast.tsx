import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { createPortal } from "react-dom";
import { eventBus, EVENTS } from "../../utils/eventBus";

interface ToastMessage {
    id: string;
    message: string;
    type: "success" | "error" | "info";
}

interface ToastContextType {
    showToast: (message: string, type?: ToastMessage["type"]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = useCallback((message: string, type: ToastMessage["type"] = "info") => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    useEffect(() => {
        const handleShowToast = (data: any) => {
            showToast(data.message, data.type);
        };

        const unsubscribe = eventBus.on(EVENTS.SHOW_TOAST, handleShowToast);
        return () => unsubscribe();
    }, [showToast]);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {mounted && createPortal(
                <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className={`
                                min-w-[300px] max-w-md p-4 rounded-lg shadow-lg text-white transform transition-all duration-300 ease-in-out
                                ${toast.type === "error" ? "bg-red-600" : ""}
                                ${toast.type === "success" ? "bg-green-600" : ""}
                                ${toast.type === "info" ? "bg-blue-600" : ""}
                                animate-in slide-in-from-right-full fade-in
                            `}
                        >
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-medium">{toast.message}</p>
                                <button
                                    onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                                    className="ml-4 text-white/80 hover:text-white"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
}
