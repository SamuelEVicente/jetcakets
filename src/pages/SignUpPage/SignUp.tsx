import React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { PureComponent } from "react";
import { AppState } from "../../store/rootReducer";
import { Form } from "../../components";
import { Field } from "../../components";
import {
  setAddress,
  setPhone,
  setBirthdate,
  changeField,
  signUp
} from "./actions";
import { setEmail, setPassword } from "../LoginPage/actions";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { clearAuthToken } from "../../utils/http";

const securityQs = new Set([
  "",
  "What was the house number and street name you lived in as a child?",
  "What were the last four digits of your childhood telephone number?",
  "What primary school did you attend?",
  "In what town or city was your first full time job?",
  "In what town or city did you meet your spouse/partner?",
  "What is the middle name of your oldest child?",
  "In what town or city did your mother and father meet?",
  "What time of the day were you born? (hh:mm)"
]);

type TSignUpProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

interface Props extends TSignUpProps {
  history: any;
}
class SignUpPage extends PureComponent<Props, {}> {
  /**
   * Executes the validation rules for all the fields on the form and sets the error state
   * @returns {boolean} - Whether the form is valid or not
   */

  validateForm = (): boolean => {
    // TODO - validate form
    if (
      this.props.email === "" ||
      this.props.address === "" ||
      this.props.password === "" ||
      this.props.passverification === "" ||
      this.props.securityAnswers === ["", "", ""] ||
      this.props.securityQuestions === ["", "", ""] ||
      this.props.phone === "" ||
      this.props.birthdate === ""
    ) {
      alert("Please fill in all Fields");
      return false;
    } else if (this.props.passverification !== this.props.password) {
      alert("Please enter exactly the same password");
      return false;
    }
    return true;
  };

  /**
   * Submits the form to the http api
   * @returns {boolean} - Whether the form submission was successful or not
   */
  submitForm = async (): Promise<boolean> => {
    // TODO - submit the form
    try {
      clearAuthToken();
      let user = await this.props.signUp(
        this.props.email,
        this.props.password,
        this.props.birthdate,
        this.props.address,
        this.props.phone,
        this.props.photoUrl,
        this.props.securityQuestions,
        this.props.securityAnswers
      );
      //set user
      console.log(user);
      // Redirect to Home
      this.props.history.push("/home");
      localStorage.setItem("authenticated", "true");
      return true;
    } catch (error) {
      console.log(error);
      alert("There has been an error please try again");
      return false;
    }
  };

  onChange = (e: React.FormEvent<any>) => {
    if (e.currentTarget.id.includes("secqr")) {
      let secA = this.props.securityAnswers;
      const val = e.currentTarget.id.charAt(e.currentTarget.id.length - 1);
      secA[val - 1] = e.currentTarget.value;
      this.props.changeField("secqr", secA);
    } else if (e.currentTarget.id.includes("secq")) {
      let secq = this.props.securityQuestions;
      const val = e.currentTarget.id.charAt(e.currentTarget.id.length - 1);
      secq[val - 1] = e.currentTarget.value;
      this.props.changeField("secq", secq);
    } else {
      this.props.changeField(e.currentTarget.id, e.currentTarget.value);
    }
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.persist();
    console.log(e.currentTarget.files);
  };

  render() {
    return (
      <Div>
        <Form
          validateForm={this.validateForm}
          submitForm={this.submitForm}
          render={() => (
            <Div>
              <H5>
                Please enter the information below to sign up for an account!
                Please fill in all Fields
              </H5>
              <Div>
                <input type="file" onChange={this.handleChange} />
              </Div>
              <Field
                onChange={this.onChange}
                value={this.props.phone}
                id="phone"
                label="Phone"
              />
              <Field
                onChange={this.onChange}
                value={this.props.address}
                id="address"
                label="Address"
              />
              <Field
                onChange={this.onChange}
                value={this.props.email}
                id="email"
                label="Email"
              />
              <Field
                type="date"
                onChange={this.onChange}
                value={this.props.birthdate}
                id="birthdate"
                label="Birthday"
              />
              <Field
                onChange={this.onChange}
                type="password"
                value={this.props.password}
                id="password"
                label="Password"
              />
              <Field
                onChange={this.onChange}
                type="password"
                value={this.props.passverification}
                id="passverification"
                label="Verify Password"
              />
              <Field
                onChange={this.onChange}
                id="secq1"
                label="Security Question One"
                editor="dropdown"
                options={Array.from(securityQs)}
              />
              <Field
                onChange={this.onChange}
                id="secqr1"
                label="Security Question Response: 1"
              />
              <Field
                onChange={this.onChange}
                id="secq2"
                label="Security Question Two"
                editor="dropdown"
                options={Array.from(securityQs)}
              />
              <Field
                onChange={this.onChange}
                id="secqr2"
                label="Security Question Response: 2"
              />
              <Field
                onChange={this.onChange}
                id="secq3"
                label="Security Question Three"
                editor="dropdown"
                options={Array.from(securityQs)}
              />
              <Field
                onChange={this.onChange}
                id="secqr3"
                label="Security Question Response: 3"
              />
            </Div>
          )}
        />
      </Div>
    );
  }
}

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const H5 = styled.h5`
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 2;
`;

const mapStateToProps = (state: AppState) => ({
  phone: state.signup.phone,
  photoUrl: state.signup.photoUrl,
  birthdate: state.signup.birthdate,
  address: state.signup.address,
  email: state.signup.email,
  password: state.signup.password,
  passverification: state.signup.passverification,
  securityQuestions: state.signup.securityQuestions,
  securityAnswers: state.signup.securityAnswers
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      setAddress,
      setPhone,
      setBirthdate,
      setEmail,
      setPassword,
      changeField,
      signUp
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignUpPage) as any
);
