import React, { Component } from 'react'
import { userLogin } from '../../actions/auth';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  onClickLogin = async () => {
    const { email, password } = this.state;
    if (!email || !password) {
      alert('Invalid credentials');
      return;
    };
    const data = { email, password };
    const loginResponse = await userLogin(data);
    if (loginResponse && loginResponse.data.success) {
      this.props.history.push('/comments');
    } else {
      alert('Invalid credentials');
    }
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="w-100">
        <div className="text-center">
          <div className="font-size-24">
            <b>Login</b>
          </div>
          <br />
          <div className="">
            <input type="text" className="large mx-8" onChange={this.onChangeEmail} value={email} />
            <input type="password" className="large mx-8" onChange={this.onChangePassword} value={password} />
          </div>
          <div>
            <button type="submit" className="" onClick={this.onClickLogin}>Login</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
