import React from 'react';
import st from './App.module.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './shared/NotFound';
import ErrorBoundary from './shared/ErrorBoundary';
import SneakersLayout from './pages/SneakersLayout';
import {createMediaQuery} from './common/utils';
import {sneakerStoreSubjects} from './store/SneakerSubjects';

const App: React.FC = () => {
  const [mediaQueryState, setMediaQueyState] = React.useState<number>();
  const [error, setError] = React.useState<Error|null>(null);

  React.useEffect(() => {
    const sub = createMediaQuery().subscribe(setMediaQueyState);
    return () => sub.unsubscribe();
  }, []);

  React.useEffect(() => {
    sneakerStoreSubjects.error.subscribe(err => {
      setError(err);
    });
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <ErrorBoundary>
          <BrowserRouter>
            <div className={st.App + ' device-width-' + mediaQueryState}>
              <header className={st['App-header']}>
                Hey Goat.
              </header>
              {error ? <h1 className='center'>Something went wrong</h1> : ''}
              <React.Suspense fallback={<div>loading....</div>}>
                <Switch>
                  <Route path='/' exact render={() => <Redirect to='/sneakers'/>}></Route>
                  <Route path='/sneakers' component={SneakersLayout}/>
                  <Route component={NotFound}/>
                </Switch>
              </React.Suspense>
            </div>
          </BrowserRouter>
        {/* </SneakerProvider> */}
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default App;
