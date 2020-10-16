import React, { Component } from 'react'
import { userLogout } from '../../actions/auth';
import history from '../../utils/browserHistory';

class Header extends Component {

  onClickLogout = () => {
    userLogout();
    history.push('/login');
  }

  render() {
    return (
      <div className="layout-row justify-content-end pa-30" onClick={this.onClickLogout}>
        Logout
      </div>
    )
  }
}

export default Header;
