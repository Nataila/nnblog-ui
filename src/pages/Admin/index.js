import React from 'react';

import NewBlog from './NewBlog';
import ArticleList from './ArticleList';

import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import UpdatePage from './UpdatePage';

export default function Home() {
  let { path } = useRouteMatch();
  return (
      <Switch>
        <Route exact path={path}>
          <ArticleList />
        </Route>
        <Route path={`${path}/update/:id`}>
          <UpdatePage />
        </Route>
        <Route path={`${path}/new/`}>
          <NewBlog />
        </Route>
      </Switch>
  )
}
