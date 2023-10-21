import { emailRegex } from "@/regex/email-regex";

export const isEmailValid = (email: string): boolean => {
	// Test the email against the regular expression
	return emailRegex.test(email);
};
