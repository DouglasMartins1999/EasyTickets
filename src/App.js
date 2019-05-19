import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AccountsPage from "./easytickets/pages/Admin/Accounts";
import MatchesPage from "./easytickets/pages/Admin/Matches";
import AccountPage from "./easytickets/pages/Admin/Accounts";

// import Modal from "./easytickets/components/Modal";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={MatchesPage} />
          <Route path="/account" component={AccountPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
