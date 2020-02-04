import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import styled from "styled-components";
import { PureComponent } from "react";
import { setEmail, setPassword, logIn } from "./actions";
import { AppState } from "../../store/rootReducer";

type TLoginProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class LoginPage extends PureComponent<TLoginProps> {
  handleChange = (event: any) => {
    event.currentTarget.name === "email"
      ? this.props.setEmail(event.target.value)
      : this.props.setPassword(event.target.value);
  };

  login = () => {
    this.props.logIn(this.props.email, this.props.password)
  }

  render() {
    return (
      <LoginContainer>
        <LoginInput
          className="form-control"
          name="email"
          id="email"
          value={this.props.email}
          onChange={this.handleChange}
          type="text"
          placeholder="email"
        />
        <LoginInput
          className="form-control"
          name="password"
          id="password"
          value={this.props.password}
          onChange={this.handleChange}
          type="password"
          placeholder="password"
        />
        <button onClick={this.login}>Login</button>
      </LoginContainer>
    );
  }
}

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 350px;
  height: 350px;
  margin: 0 auto;
  border: 2px solid #000;
  border-radius: 20px;
  background: #eee;
  margin-top: 250px;
  h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }
  button {
    background: grey;
    color: #fff;
    padding: 10px;
    margin: 5px;
    width: 250px;
    border: none;
    border-radius: 10px;
    box-sizing: border-box;
  }
`;

const LoginInput = styled.input`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  width: 250px;
  box-sizing: border-box;
`;

const mapStateToProps = (state: AppState) => ({
  email: state.login.email,
  password: state.login.password
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setEmail,
      setPassword,
      logIn
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
