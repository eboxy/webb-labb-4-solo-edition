import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { HighScore } from './components/HighScore';
import { AdminQuestions } from './components/AdminQuestions';

import { Quiz } from './components/Quiz';


import { AddQuestion } from './components/AddQuestion';

import { Test } from './components/Test';



export const routes = <Layout>
    <Route exact path='/quiz' component={Home} />

     <Route path='/HighScore' component={HighScore} />  

     <Route path='/AdminQuestions' component={AdminQuestions} />  

    <Route path='/Test' component={Test} />

    
  </Layout>;
