import React from 'react';
import st from './App.module.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './shared/NotFound';
import SneakersLayout from './pages/SneakersLayout';
import {createMediaQuery} from './common/utils';
import {sneakerStoreSubjects} from './store/SneakerSubjects';

const Routes: React.FC = () => {
  const [mediaQueryState, setMediaQueyState] = React.useState<number>(4);
  const [error, setError] = React.useState<Error|null>(null);
  const [title, setTitle] = React.useState<string>(sneakerStoreSubjects.title.getValue());

  React.useEffect(() => {
    const sub = createMediaQuery().subscribe(setMediaQueyState);
    return () => sub.unsubscribe();
  }, []);

  React.useEffect(() => {
    sneakerStoreSubjects.error.subscribe(err => {
      setError(err);
    });

    const sub = sneakerStoreSubjects.title.subscribe(text => setTitle(text));
    return () => sub.unsubscribe();
  });

  return (
    <div className={st.App + ' device-width-' + mediaQueryState}>
      <header className={st['App-header']}>
      {title}
      </header>
      {error ? <h1 className='center'>Something went wrong</h1> : ''}
      <Switch>
        <Route path='/' exact render={() => <Redirect to='/sneakers'/>}></Route>
        <Route path='/sneakers' component={SneakersLayout}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
};

export default Routes;
