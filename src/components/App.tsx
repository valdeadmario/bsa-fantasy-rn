import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from './Spinner';

import { createAppContainer } from 'react-navigation';

import { createRootNavigator } from '../containers/Routing/router';
import { isSignedIn } from '../helpers/storageHelper';

import {
  fetchGameweeks,
  fetchGameweekHistory,
  fetchGameweekHistoryResults,
  fetchUserRankingForGameweek,
} from '../containers/Routing/fetchGameweeks/actions';

import { currentGameweekSelector } from '../store/selectors/current-gameweek.selector';

const App = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  console.disableYellowBox = true;
  const dispatch = useDispatch();
  const {isLoading, user, isAuthorized} = useSelector(
    (state: any) => state.profile,
  );
  console.log('isAuth', isAuthorized)

  // useEffect(() => {
  //   isSignedIn().then((res: any) => setSignedIn(res));
  // });

  useEffect(() => {
    if (isAuthorized) {
      setSignedIn(isAuthorized);
    }
  }, [isAuthorized]);

  useEffect(() => {
    dispatch(fetchGameweeks());
  }, [dispatch])

  const currentGameweek = useSelector(currentGameweekSelector);
  console.log(currentGameweek);

  useEffect(() => {
    if (user && currentGameweek) {
      dispatch(fetchGameweekHistory(user.id, currentGameweek.id));
      dispatch(fetchUserRankingForGameweek(user.id, currentGameweek.id));
      dispatch(fetchGameweekHistoryResults());
    }
  }, [dispatch, user, currentGameweek]);

  const Navigartor = createRootNavigator(signedIn);
  const Routing = createAppContainer(Navigartor);

  return <Routing />;
};

export default App;
