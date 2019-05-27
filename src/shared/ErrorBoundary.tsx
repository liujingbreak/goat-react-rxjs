import React from 'react';
import {trackError} from '../common/utils';

class ErrorBoundary extends React.Component<any, {hasError: boolean}> {
	constructor(props: any) {
	  super(props);
	  this.state = { hasError: false };
	}
  
	static getDerivedStateFromError(error: any) {
	  // Update state so the next render will show the fallback UI.
	  return { hasError: true };
	}
  
	componentDidCatch(error: any, info: React.ErrorInfo) {
		// TODO: snowplow error tracking
		//  logErrorToMyService(error, info);
		trackError(error);
	}
  
	render() {
	  if (this.state.hasError) {
		return <h1>Something went wrong.</h1>;
	  }
  
	  return this.props.children; 
	}
}

export default ErrorBoundary;
