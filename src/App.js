import React, { Component } from 'react';
import AccountsPage from './easytickets/pages/Admin/Accounts';
import MatchesPage from './easytickets/pages/Admin/Matches';
import Modal from './easytickets/components/Modal';

class App extends Component {
	render(){
		return <div>
			<MatchesPage />
			<Modal />	
		</div>;
	}
}

export default App;
