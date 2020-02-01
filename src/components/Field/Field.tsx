import * as React from "react";
import { IErrors } from "../Form/Form";
import styled from "styled-components";

/* The available editors for the field */
type Editor = "textbox" | "multilinetextbox" | "dropdown";

export interface IFieldProps {
  /* The unique field name */
  id: string;

  /* The label text for the field */
  label?: string;

  /* The editor for the field */
  editor?: Editor;

  /* The drop down items for the field */
  options?: string[];

  /* The field value */
  value?: any;

  onChange: Function;
  /* The input type */
  type?: string;
}

export const Field: React.SFC<IFieldProps> = ({
  id,
  label,
  editor = "textbox",
  options,
  value,
  onChange,
  type
}) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}

      {editor!.toLowerCase() === "textbox" && (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e: React.FormEvent<HTMLInputElement>) => onChange(e)}
          onBlur={
            (e: React.FormEvent<HTMLInputElement>) =>
              console.log(e) /* TODO: validate field value */
          }
          className="form-control"
        />
      )}

      {editor!.toLowerCase() === "multilinetextbox" && (
        <TextArea
          id={id}
          value={value}
          onChange={(e: React.FormEvent<HTMLTextAreaElement>) => onChange(e)}
          onBlur={
            (e: React.FormEvent<HTMLTextAreaElement>) =>
              console.log(e) /* TODO: validate field value */
          }
          className="form-control"
        />
      )}

      {editor!.toLowerCase() === "dropdown" && (
        <Select
          id={id}
          name={id}
          value={value}
          onChange={(e: React.FormEvent<HTMLSelectElement>) => onChange(e)}
          onBlur={
            (e: React.FormEvent<HTMLSelectElement>) =>
              console.log(e) /* TODO: validate field value */
          }
          className="form-control"
        >
          {options &&
            options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </Select>
      )}

      {/* TODO - display validation error */}
    </div>
  );
};

const Input = styled.input`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  width: 250px;
  box-sizing: border-box;
`;

const Select = styled.select`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  width: 250px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  width: 250px;
  box-sizing: border-box;
`;
