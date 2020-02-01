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

    if (this.validateForm()) {
      const submitSuccess: boolean = await this.submitForm();
      this.setState({ submitSuccess });
    }
  };

  /**
   * Executes the validation rules for all the fields on the form and sets the error state
   * @returns {boolean} - Whether the form is valid or not
   */
  private validateForm(): boolean {
    // TODO - validate form
    return true;
  }

  /**
   * Submits the form to the http api
   * @returns {boolean} - Whether the form submission was successful or not
   */
  private async submitForm(): Promise<boolean> {
    // TODO - submit the form
    return true;
  }

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
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-flow: column;
  width: 500px;
  height: 550px;
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
