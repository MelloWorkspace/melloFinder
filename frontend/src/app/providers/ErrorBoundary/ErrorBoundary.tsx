import type { TFunction } from "i18next";
import React, { type ErrorInfo, type ReactNode, Suspense } from "react";
import { withTranslation } from "react-i18next";

import ErrorPage from "../../../pages/ErrorPage";

interface ErrorBoundaryProps {
	children: ReactNode;
	t: TFunction;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState & { error?: Error }
> {
	public constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: undefined };
	}

	public static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	public override render() {
		const { hasError, error } = this.state;
		const { children } = this.props;

		if (hasError) {
			return (
				<Suspense fallback={<>Loading chunk...</>}>
					<ErrorPage error={error} />
				</Suspense>
			);
		}

		return children;
	}
}

const TranslatedErrorBoundary = withTranslation()(ErrorBoundary);
export default TranslatedErrorBoundary;
