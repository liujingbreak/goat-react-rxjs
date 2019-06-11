import React from 'react';
import {sneakerStoreSubjects as store} from './store/SneakerSubjects';

import CssBaseline from '@material-ui/core/CssBaseline';
import { StaticRouter, StaticRouterContext} from 'react-router';
import ErrorBoundary from './shared/ErrorBoundary';
import Routes from './Routes';

export const context: StaticRouterContext = {};
// export interface AppProps {
//   setRouteFunc?: (setRoute: (path: string) => void) => void;
// }

export const App: React.FC = () => {
  const [route] = React.useState(store.route.getValue());

  return (
    <React.Fragment>
      <CssBaseline />
      <ErrorBoundary>
          <StaticRouter location={route} context={context}>
            <Routes/>
          </StaticRouter>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default <App/>;

export {store};
