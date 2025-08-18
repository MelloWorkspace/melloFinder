import { isAxiosError } from "axios";

type SetterArgs<S> = Partial<S & { loading: boolean; error: string }>;

// TODO: rewrite function without type casting
export const createRequestAction = <P, S>(
	action: (args: P) => Promise<void>,
	set: (args: SetterArgs<S>) => void
) => {
	return async (params: P) => {
		set({ loading: true, error: undefined } as SetterArgs<S>);
		try {
			await action(params);
		} catch (e: unknown) {
			if (isAxiosError(e)) {
				set({ error: e.response?.statusText ?? e.message } as SetterArgs<S>);
			} else if (e instanceof Error) {
				set({ error: e.message } as SetterArgs<S>);
			} else if (typeof e == "string") {
				set({ error: e } as SetterArgs<S>);
			} else {
				set({ error: "Произошла непредвиденная ошибка" } as SetterArgs<S>);
			}
		}

		set({
			loading: false,
		} as SetterArgs<S>);
	};
};
