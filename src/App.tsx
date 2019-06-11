import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter} from 'react-router-dom';
import ErrorBoundary from './shared/ErrorBoundary';
import Routes from './Routes';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ErrorBoundary>
          <BrowserRouter>
            <Routes/>
          </BrowserRouter>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default App;
