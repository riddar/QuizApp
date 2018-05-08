import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { HighScores } from './components/HighScores';
import { Questions } from './components/Questions';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/HighScores' component={HighScores} />
    <Route path='/Questions' component={Questions} />
</Layout>;
