import React from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import BaseRoute from '../common/BaseRoute';
import Animatable from '../common/Animatable';

const Sneakers = React.lazy(() => import('../pages/Sneakers'));
const SneakerDetail = React.lazy(() => import('../pages/SneakerDetail'));

/**
 * For user to have a smooth feel about "navigate back to Sneaker list from details page",
 * maybe I should just hide list page DOM instead of letting router destory the component,
 * when user navigates to detail page.
 */
class SneakerLayout extends React.Component<RouteComponentProps, {listVisible: boolean}> {
	// constructor(props: RouteComponentProps) {
	// 	super(props);
	// }

	render() {
		return (
			<BaseRoute>
				<React.Suspense fallback={<div>loading....</div>}>
					<Animatable visible={this.props.match && this.props.match.isExact}>
						<Sneakers match={this.props.match}></Sneakers>
					</Animatable>
					<Switch>
						<Route path={this.props.match.url + "/:name"} component={SneakerDetail}/>
					</Switch>
				</React.Suspense>
			</BaseRoute>
		);
	}
}

export default withRouter(SneakerLayout);
