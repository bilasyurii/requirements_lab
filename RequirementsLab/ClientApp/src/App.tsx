import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import TaskList from './components/taskList/taskList';
import StartingTest from './components/startingTest/StartingTest';
import RequirementsTask from './components/requirementsTask/RequirementsTask';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/tasks' component={TaskList} />
        <Route path='/test' component={StartingTest} />
        <Route path='/requirements-task' component={RequirementsTask} />
    </Layout>
);
