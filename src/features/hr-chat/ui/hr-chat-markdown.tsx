import type { FC } from "react";
import Markdown, { type Components } from "react-markdown";

import remarkGfm from "remark-gfm";

import { BntBox } from "@/shared/ui/box";
import { BntTypography } from "@/shared/ui/typography";

import { InlineCode, MarkdownList } from "./hr-chat-message.styles";

/** The analyst is told to use headings, lists and bold only; anything else is rendered as plain text. */
const ALLOWED_ELEMENTS = ["p", "h1", "h2", "h3", "ul", "ol", "li", "strong", "em", "a", "br", "blockquote", "code", "hr", "del"];

const components: Components = {
	h1: ({ children }) => (
		<BntTypography variant="subtitle1" fontWeight={600} sx={{ mt: 1, mb: 0.5 }}>
			{children}
		</BntTypography>
	),
	h2: ({ children }) => (
		<BntTypography variant="subtitle1" fontWeight={600} sx={{ mt: 1, mb: 0.5 }}>
			{children}
		</BntTypography>
	),
	h3: ({ children }) => (
		<BntTypography variant="subtitle2" fontWeight={600} sx={{ mt: 1, mb: 0.5 }}>
			{children}
		</BntTypography>
	),
	p: ({ children }) => (
		<BntTypography variant="body2" sx={{ my: 0.5 }}>
			{children}
		</BntTypography>
	),
	ul: ({ children }) => <MarkdownList>{children}</MarkdownList>,
	ol: ({ children }) => <MarkdownList as="ol">{children}</MarkdownList>,
	li: ({ children }) => (
		<li>
			<BntTypography variant="body2">{children}</BntTypography>
		</li>
	),
	blockquote: ({ children }) => (
		<BntBox component="blockquote" sx={{ m: 0, pl: 1.5, borderLeft: 2, borderColor: "divider", color: "text.secondary" }}>
			{children}
		</BntBox>
	),
	// Links are rendered as text: the data never contains URLs the admin should follow.
	a: ({ children }) => <span>{children}</span>,
	code: ({ children }) => <InlineCode>{children}</InlineCode>,
};

export const HrChatMarkdown: FC<{ text: string }> = ({ text }) => (
	<Markdown remarkPlugins={[remarkGfm]} skipHtml allowedElements={ALLOWED_ELEMENTS} unwrapDisallowed components={components}>
		{text}
	</Markdown>
);
