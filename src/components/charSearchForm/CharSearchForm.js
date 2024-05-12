import { useState } from "react";
import {
  Field,
  Formik,
  Form,
  ErrorMessage as FormikErrorMessage,
} from "formik";
import * as yup from "yup";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charSearchForm.scss";

const CharSearchForm = () => {
  const { loading, error, getAllCharecters, clearError } = useMarvelService();
  const [responseRender, setResponseRender] = useState(null);

  const handleFormSubmit = (name) => {
    clearError();
    getAllCharecters(null, name).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    const characterId = char.length === 0 ? null : char[0].id;
    const message = characterId
      ? `There is! Visit ${char[0].name} page?`
      : "The character was not found. Check the name and try again";
    setResponseRender(() => searchServerResponse(message, characterId));
  };

  const errorMessage = error ? (
    <div className="error">
      <ErrorMessage />
    </div>
  ) : null;

  return (
    <div className="search-form">
      <Formik
        initialValues={{ name: "" }}
        validationSchema={yup.object({
          name: yup
            .string()
            .min(3, "min 3 chars")
            .required("This field is required"),
        })}
        onSubmit={(values) => handleFormSubmit(values.name)}
      >
        <Form className="search-form__wrapper">
          <label htmlFor="name" className="search-form__label">
            Or find a character by name:
          </label>
          <Field
            name="name"
            type="text"
            placeholder="Enter name"
            className="search-form__input"
          />
          <button
            className="button button__main"
            type="submit"
            disabled={loading}
          >
            <div className="inner">Find</div>
          </button>
          <FormikErrorMessage component="div" className="error" name="name" />
          {responseRender}
          {errorMessage}
        </Form>
      </Formik>
    </div>
  );
};

const searchServerResponse = (message, charId = null) => {
  const char = charId ? (
    <a href={`/character/${charId}`} className="button button__secondary">
      <div className="inner">To page</div>
    </a>
  ) : null;
  const style = charId ? { color: "#03710E" } : { color: "#9F0013" };
  return (
    <div className="search-form__response">
      <p style={style}>{message}</p>
      {char}
    </div>
  );
};

export default CharSearchForm;
