import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { StaticRouter, StaticRouterContext} from 'react-router';
import ErrorBoundary from './shared/ErrorBoundary';
import Routes from './Routes';

const context: StaticRouterContext = {};

const output = <React.Fragment>
<CssBaseline />
<ErrorBoundary>
    <StaticRouter location='/' context={context}>
      <Routes/>
    </StaticRouter>
</ErrorBoundary>
</React.Fragment>;
export default [output, context];
