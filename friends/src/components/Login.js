import React, { Component } from "react";

import axios from "axios";

export default class Login extends Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
    error: "",
  };

  onChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.targer.value,
      },
    });
  };

  login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login")
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.payload));
        this.props.history.push("/protected");
      })
      .catch((err) => this.setState({ error: err.response.data.error }));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            name="username"
            type="text"
            value={this.state.credentials.username}
            onChange={this.onChange}
          />
          <input
            name="password"
            type="text"
            value={this.state.credentials.password}
            onChange={this.onChange}
          />
          <p>{this.state.error}</p>
          <button>Log in</button>
        </form>
      </div>
    );
  }
}
