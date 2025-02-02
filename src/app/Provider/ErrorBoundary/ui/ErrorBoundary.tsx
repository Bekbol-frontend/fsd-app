import { PageError } from "@/widgets/PageError";
import { PageLoading } from "@/widgets/PageLoading";
import React, { ErrorInfo, ReactNode, Suspense } from "react";

interface IProps {
  children: ReactNode;
}
interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Suspense fallback={<PageLoading />}>
          <PageError />
        </Suspense>
      );
    }

    return children;
  }
}
