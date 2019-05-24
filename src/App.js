import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import MatchesPage from "./easytickets/pages/Admin/Matches";
import AccountPage from "./easytickets/pages/Admin/Accounts";
import OrderPage from "./easytickets/pages/Purchase/Order";
import Ticket from "./easytickets/pages/Purchase/Ticket";

class App extends Component {
	render() {
		return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact={true} component={MatchesPage} />
				<Route path="/match" component={MatchesPage} />
				<Route path="/account" component={AccountPage} />
				<Route path="/order" component={OrderPage} />
				<Route path="/ticket" component={Ticket} />
				<Route path="/ticket/:cod" component={Ticket} />
			</Switch>
		</BrowserRouter>
		);
	}
}

	
export default App;
	