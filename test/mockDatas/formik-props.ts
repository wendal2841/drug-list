import sinon from 'sinon';
import { FormikErrors, FormikProps } from 'formik';

const setFormikStateStub = sinon.stub();

const getFormikProps = <Values, Errors>(values: Values): FormikProps<Values> => ({
    values,
    errors: values,
    touched: {},
    isValidating: false,
    isSubmitting: false,
    submitCount: 123,
    handleSubmit: sinon.stub(),
    handleReset: sinon.stub(),
    handleBlur: sinon.stub(),
    handleChange: sinon.stub(),
    setStatus: sinon.stub(),
    setError: sinon.stub(),
    setErrors: sinon.stub(),
    setSubmitting: sinon.stub(),
    setTouched: sinon.stub(),
    setValues: sinon.stub(),
    setFieldValue: sinon.stub(),
    setFieldError: sinon.stub(),
    setFieldTouched: sinon.stub(),
    validateField: sinon.stub(),
    resetForm: sinon.stub(),
    submitForm: sinon.stub(),
    setFormikState: setFormikStateStub,
    dirty: false,
    isValid: false,
    registerField: sinon.stub(),
    unregisterField: sinon.stub(),
    initialValues: values,
    validateForm: (): Promise<FormikErrors<Values>> => new Promise<FormikErrors<Values>>(sinon.stub()),
});

export default getFormikProps;
