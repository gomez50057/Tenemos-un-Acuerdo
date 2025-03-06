"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import axios from "axios";
import { municipiosDeHidalgo, sexoOptions, grupoOptions } from "../../utils/utils";
import "../forms/Formulario.css";

// Convertir la lista de municipios al formato esperado por react-select (para selección única)
const municipioOptions = municipiosDeHidalgo.map((municipio) => ({
  label: municipio,
  value: municipio,
}));

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/chat-forms/create/`;

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio."),
  edad: Yup.number().required("La edad es obligatoria.").positive("La edad debe ser positiva."),
  sexo: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }).nullable().required("El sexo es obligatorio."),
  telefono: Yup.string().required("El teléfono es obligatorio."),
  correo: Yup.string().email("Correo inválido").required("El correo es obligatorio."),
  ocupacion: Yup.string().required("La ocupación es obligatoria."),
  municipio: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }).nullable().required("El municipio es obligatorio."),
  localidad: Yup.string().required("La localidad es obligatoria."),
  grupoIdentificado: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required(),
  }).nullable().required("Selecciona el grupo con el que te identificas."),
  nombreProyecto: Yup.string().required("El nombre del proyecto es obligatorio."),
  archivo: Yup.mixed(),
});

const ChatForms = ({ handleMenuClick }) => (
  <div>
    <p>¡Perfecto! Por favor responde las siguientes preguntas:</p>
    <Formik
      initialValues={{
        nombre: "",
        edad: "",
        sexo: null,
        telefono: "",
        correo: "",
        ocupacion: "",
        municipio: null,
        localidad: "",
        grupoIdentificado: null,
        nombreProyecto: "",
        archivo: null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        
        // Formatear valores para enviar al backend
        const formattedValues = {
          ...values,
          sexo: values.sexo.value,
          municipio: values.municipio.value,
          grupoIdentificado: values.grupoIdentificado.value,
          // Para el archivo, podrías enviarlo como FormData si el backend lo requiere
        };

        try {
          // Enviar los datos al backend
          const response = await axios.post(API_URL, formattedValues);
          console.log("Formulario enviado con éxito:", response.data);

          // Llamar al manejador de navegación
          handleMenuClick("proposalThanks");

          // Reiniciar el formulario
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
            <label htmlFor="nombre">Nombre completo</label>
            <Field
              id="nombre"
              name="nombre"
              type="text"
              className="input-field"
              placeholder="Ingresa tu nombre completo"
            />
            <ErrorMessage name="nombres" component="div" className="error-message" />
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
            <label htmlFor="telefono">Teléfono</label>
            <Field
              id="telefono"
              name="telefono"
              type="text"
              className="input-field"
              placeholder="Ingresa tu teléfono"
            />
            <ErrorMessage name="telefono" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <Field
              id="correo"
              name="correo"
              type="email"
              className="input-field"
              placeholder="Ingresa tu correo electrónico"
            />
            <ErrorMessage name="correo" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="ocupacion">Ocupación</label>
            <Field
              id="ocupacion"
              name="ocupacion"
              type="text"
              className="input-field"
              placeholder="Ingresa tu ocupación"
            />
            <ErrorMessage name="ocupacion" component="div" className="error-message" />
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
            <label htmlFor="localidad">Localidad</label>
            <Field
              id="localidad"
              name="localidad"
              type="text"
              className="input-field"
              placeholder="Ingresa tu localidad"
            />
            <ErrorMessage name="localidad" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="grupoIdentificado">¿Con cuál de estos grupos te sientes más identificados?</label>
            <Select
              options={grupoOptions}
              name="grupoIdentificado"
              className="react-select-container"
              classNamePrefix="react-select"
              placeholder="Selecciona una opción"
              onChange={(selectedOption) => setFieldValue("grupoIdentificado", selectedOption)}
              value={values.grupoIdentificado}
            />
            <ErrorMessage name="grupoIdentificado" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="nombreProyecto">Nombre de tu proyecto o propuesta</label>
            <Field
              id="nombreProyecto"
              name="nombreProyecto"
              type="text"
              className="input-field"
              placeholder="Ingresa el nombre de tu proyecto"
            />
            <ErrorMessage name="nombreProyecto" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="archivo">Comparte un archivo de tu propuesta (pdf, xls, doc, png, jpg)</label>
            <input
              id="archivo"
              name="archivo"
              type="file"
              className="input-field"
              onChange={(e) => setFieldValue("archivo", e.target.files[0])}
            />
            <ErrorMessage name="archivo" component="div" className="error-message" />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ChatForms;
