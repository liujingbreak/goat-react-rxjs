import React from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import BaseRoute from '../common/BaseRoute';
import Animatable from '../common/Animatable';
import loadable from '@loadable/component';

const loading = <div>loading....</div>;

const Sneakers = loadable(() => import('../pages/Sneakers'), {
  fallback: loading
});
const SneakerDetail = loadable(() => import('../pages/SneakerDetail'), {
  fallback: loading
});

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
        <Animatable visible={this.props.match && this.props.match.isExact}>
          <Sneakers match={this.props.match}></Sneakers>
        </Animatable>
        <Switch>
          <Route path={this.props.match.url + '/:name'} component={SneakerDetail}/>
        </Switch>
      </BaseRoute>
    );
  }
}

export default withRouter(SneakerLayout);
