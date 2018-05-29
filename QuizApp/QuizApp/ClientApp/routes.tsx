import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { HighScores } from './components/HighScores';
import { Questions } from './components/Questions';
import { QuestionsAdmin } from './components/QuestionsAdmin';
import { Edit } from './components/Edit';
import { Quiz } from './components/Quiz';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/HighScores' component={HighScores} />
    <Route path='/Questions' component={Questions} />
    <Route path='/QuestionsAdmin' component={QuestionsAdmin} />
    <Route path='/Edit' component={Edit} />
    <Route path='/Quiz' component={Quiz} />
</Layout>;
