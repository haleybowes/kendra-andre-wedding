import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ThankYou from './thankYou';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const Root = () => (
	<Router>
		<Switch>
			<Route exact path ="/" component={App} />
			<Route exact path="/thankyou" component={ThankYou} />
		</Switch>
	</Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
