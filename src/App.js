import { Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import Detail from './components/CardDetail/CardDetail';
import Landing from './components/Landing/Landing';
import Page404 from './components/404/Page404';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/countries' exact component={Home} />
        <Route path='/countries/:id' component={Detail} />
        <Route path='/form' component={Form} />
        <Route exact path='*' component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
