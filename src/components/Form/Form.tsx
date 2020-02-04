import * as React from "react";
import styled from "styled-components";

interface IFormProps {
  validateForm: Function;
  submitForm: Function;
  action?: Function;
  render: () => React.ReactNode;
}
export interface IValues {
  [key: string]: any;
}

export interface IErrors {
  [key: string]: string;
}

export interface IFormState {
  values: IValues;
  errors: IErrors;
  submitSuccess?: boolean;
}

export class Form extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);

    const errors: IErrors = {};
    const values: IValues = {};
    this.state = {
      errors,
      values
    };
  }

  /**
   * Returns whether there are any errors in the errors object that is passed in
   * @param {IErrors} errors - The field errors
   */
  private haveErrors(errors: IErrors) {
    let haveError: boolean = false;
    Object.keys(errors).map(function(key: string) {
      if (errors[key].length > 0) {
        haveError = true;
      }
    });
    return haveError;
  }

  /**
   * Handles form submission
   * @param {React.FormEvent<HTMLFormElement>} e - The form event
   */
  private handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (this.props.validateForm()) {
      const submitSuccess: boolean = await this.props.submitForm();
      this.setState({ submitSuccess });
    }
  };

  public render() {
    const { submitSuccess, errors } = this.state;
    return (
      <FormStyled onSubmit={this.handleSubmit} noValidate={true}>
        {this.props.render()}
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.haveErrors(errors)}
          >
            Submit
          </button>
        </div>
        {submitSuccess && (
          <div className="alert alert-info" role="alert">
            The form was successfully submitted!
          </div>
        )}
        {submitSuccess === false && !this.haveErrors(errors) && (
          <div className="alert alert-danger" role="alert">
            Sorry, an unexpected error has occurred
          </div>
        )}
        {submitSuccess === false && this.haveErrors(errors) && (
          <div className="alert alert-danger" role="alert">
            Sorry, the form is invalid. Please review, adjust and try again
          </div>
        )}
      </FormStyled>
    );
  }
}

const FormStyled = styled.form`
  align-items: center;
  justify-content: center;
  flex-flow: column;
  margin-top: 100px;
  border: 2px solid #000;
  border-radius: 20px;
  background: #eee;
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
