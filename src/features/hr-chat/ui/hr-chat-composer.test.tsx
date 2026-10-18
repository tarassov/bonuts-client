import { describe, expect, it, vi } from "vitest";

import { HrChatComposer } from "./hr-chat-composer";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

vi.mock("@/hooks/use-bnt-translate", () => ({
	useBntTranslate: () => ({ t: (text: string) => text, translate: (text: string) => text }),
}));

const typeInto = (textarea: HTMLElement, value: string) => fireEvent.change(textarea, { target: { value } });

describe("HrChatComposer", () => {
	it("sends the trimmed text on Enter and clears the field", async () => {
		const onSend = vi.fn().mockResolvedValue(true);
		render(<HrChatComposer isBlocked={false} isSending={false} onSend={onSend} />);
		const textarea = screen.getByPlaceholderText("ask the ai analyst");

		typeInto(textarea, "  Как прошёл сентябрь?  ");
		fireEvent.keyDown(textarea, { key: "Enter" });

		await waitFor(() => expect(onSend).toHaveBeenCalledWith("Как прошёл сентябрь?"));
		await waitFor(() => expect((textarea as HTMLTextAreaElement).value).toBe(""));
	});

	it("keeps the text when Shift+Enter is pressed or the send is rejected", async () => {
		const onSend = vi.fn().mockResolvedValue(false);
		render(<HrChatComposer isBlocked={false} isSending={false} onSend={onSend} />);
		const textarea = screen.getByPlaceholderText("ask the ai analyst");

		typeInto(textarea, "Вопрос");
		fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });
		expect(onSend).not.toHaveBeenCalled();

		fireEvent.keyDown(textarea, { key: "Enter" });
		await waitFor(() => expect(onSend).toHaveBeenCalledTimes(1));
		expect((textarea as HTMLTextAreaElement).value).toBe("Вопрос");
	});

	it("does not send while the chat waits for a reply", () => {
		const onSend = vi.fn();
		render(<HrChatComposer isBlocked isSending={false} onSend={onSend} />);
		const textarea = screen.getByPlaceholderText("ask the ai analyst");

		typeInto(textarea, "Ещё вопрос");
		fireEvent.keyDown(textarea, { key: "Enter" });

		expect(onSend).not.toHaveBeenCalled();
		expect(screen.getByRole("button", { name: "send" })).toHaveProperty("disabled", true);
	});
});
