"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import { municipiosDeHidalgo, sexoOptions,foroOptions  } from "../../utils/utils";
import "../forms/Formulario.css";

// Convertir la lista de municipios al formato esperado por react-select (selección única)
const municipioOptions = municipiosDeHidalgo.map((municipio) => ({
  label: municipio,
  value: municipio,
}));

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/forum-form/create/`;

const validationSchema = Yup.object().shape({
  nombreCompleto: Yup.string().required("El nombre completo es obligatorio."),
  municipio: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }).nullable().required("El municipio es obligatorio."),
  escuela: Yup.string().required("La escuela o institución es obligatoria."),
  edad: Yup.number()
    .required("La edad es obligatoria.")
    .positive("La edad debe ser un número positivo."),
  sexo: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }).nullable().required("El sexo es obligatorio."),
  foroInteres: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }).nullable().required("Debes seleccionar un foro de interés."),
});

const ForumForm = ({ handleMenuClick }) => (
  <div>
    <p>¡Perfecto! Por favor responde las siguientes preguntas:</p>
    <Formik
      initialValues={{
        nombreCompleto: "",
        municipio: null,
        escuela: "",
        edad: "",
        sexo: null,
        foroInteres: null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);

        // Formatear valores para enviar al backend
        const formattedValues = {
          ...values,
          municipio: values.municipio.value,
          sexo: values.sexo.value,
          foroInteres: values.foroInteres.value,
        };

        try {
          const response = await axios.post(API_URL, formattedValues);
          console.log("Formulario enviado con éxito:", response.data);

          // Llamar al manejador para cambiar de paso (por ejemplo, a "forumThanks")
          handleMenuClick("forumThanks");

          resetForm();
        } catch (error) {
          console.error("Error al enviar el formulario:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="formulario-container">
          <div className="form-group">
            <label htmlFor="nombreCompleto">Nombre completo</label>
            <Field
              id="nombreCompleto"
              name="nombreCompleto"
              type="text"
              className="input-field"
              placeholder="Ingresa tu nombre completo"
            />
            <ErrorMessage name="nombreCompleto" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="municipio">Municipio</label>
            <Select
              options={municipioOptions}
              name="municipio"
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Selecciona un municipio"
              onChange={(selectedOption) => setFieldValue("municipio", selectedOption)}
              value={values.municipio}
            />
            <ErrorMessage name="municipio" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="escuela">Escuela o institución de procedencia</label>
            <Field
              id="escuela"
              name="escuela"
              type="text"
              className="input-field"
              placeholder="Ingresa el nombre de tu escuela o institución"
            />
            <ErrorMessage name="escuela" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="edad">Edad</label>
            <Field
              id="edad"
              name="edad"
              type="number"
              className="input-field"
              placeholder="Ingresa tu edad"
            />
            <ErrorMessage name="edad" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="sexo">Sexo</label>
            <Select
              options={sexoOptions}
              name="sexo"
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Selecciona tu sexo"
              onChange={(selectedOption) => setFieldValue("sexo", selectedOption)}
              value={values.sexo}
            />
            <ErrorMessage name="sexo" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="foroInteres">Selecciona el foro de tu interés</label>
            <Select
              options={foroOptions}
              name="foroInteres"
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Selecciona un foro"
              onChange={(selectedOption) => setFieldValue("foroInteres", selectedOption)}
              value={values.foroInteres}
            />
            <ErrorMessage name="foroInteres" component="div" className="error-message" />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ForumForm;
