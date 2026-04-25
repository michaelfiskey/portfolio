import { useState } from "react";
import type { TextFieldState } from "../formtypes";

type FormSchema = Record<string, TextFieldState | string>;

const isTextFieldState = (value: TextFieldState | string): value is TextFieldState =>
	typeof value === "object";

const useFormState = <T extends FormSchema>(initialState: T) => {
	const [fields, setFields] = useState<T>(initialState);

	const setFieldValue = (key: keyof T, value: string) => {
		setFields((prev) => {
			const current = prev[key];
			if (isTextFieldState(current)) {
				return Object.assign({}, prev, { [key]: { ...(current as TextFieldState), value } }) as T;
			}
			return Object.assign({}, prev, { [key]: value }) as T;
		});
	};

	const touchField = (key: keyof T) => {
		setFields((prev) => {
			const current = prev[key];
			if (isTextFieldState(current)) {
				return Object.assign({}, prev, { [key]: { ...(current as TextFieldState), isTouched: true } }) as T;
			}
			return prev;
		});
	};

	const clearFields = () => setFields(initialState);

	const markRequiredTouched = () => {
		setFields((prev) => {
			const next = { ...prev };
			(Object.keys(next) as (keyof T)[]).forEach((key) => {
				if (isTextFieldState(next[key])) {
					next[key] = { ...(next[key] as TextFieldState), isTouched: true } as T[keyof T];
				}
			});
			return next;
		});
	};

	return { fields, setFieldValue, touchField, clearFields, markRequiredTouched };
};

export default useFormState;
