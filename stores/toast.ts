import { defineStore } from "pinia";

const defaultTimeout = 2000;

interface Toast {
	text: string;
	status: string;
	id: number;
}
type ToastPayload = { timeout?: number; text: string };

const createToast = (text: string, status: string): Toast => ({
	text,
	status,
	id: Math.random() * 1000,
});

export const useToastStore = defineStore("toast", {
	state: (): { toasts: Toast[] } => ({
		toasts: [],
	}),
	actions: {
		updateState(payload: ToastPayload, status: string) {
			const { text, timeout } = payload;
			const toast = createToast(text, status);
			this.toasts.push(toast);

			setTimeout(() => {
				this.toasts = this.toasts.filter((t) => t.id !== toast.id);
			}, timeout ?? defaultTimeout);
		},
		success(payload: ToastPayload) {
			this.updateState(payload, "success");
		},
		error(payload: ToastPayload) {
			this.updateState(payload, "error");
		},
	},
});