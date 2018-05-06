import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import { HighScores } from './components/HighScores';
import { Questions } from './components/Questions';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/HighScores' component={HighScores} />
    <Route path='/Questions' component={Questions} />
</Layout>;
