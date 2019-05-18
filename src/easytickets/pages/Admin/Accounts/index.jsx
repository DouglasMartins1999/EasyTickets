import React, { Component } from 'react';
import "../styles.css"
import SideMenu from '../../../components/Admin/SideMenu';

class AccountsPage extends Component {
    render(){
        return <div class="page-content">
            <SideMenu />
            <main>
                <header class="content-header">
                    <div>
                        <h1>Gerenciar Contas</h1>
                    </div>
                </header>
            </main>
        </div>;
    }
}

export default AccountsPage;