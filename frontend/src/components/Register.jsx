import ComponentAuth from "./ComponentAuth";
import { useState } from "react";

const Register = ({ registerAuth }) => {
  const [formValue, setFormValue] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    registerAuth(formValue.email, formValue.password);
  };

  return (
    <ComponentAuth
      formName="register"
      buttonText="Зарегистрироваться"
      title="Регистрация"
      onSubmit={handleSubmit}
    >
      <input
        className="login__input login__input_email"
        type="email"
        name="email"
        placeholder="Email"
        required=""
        onChange={handleChange}
        value={formValue.email || ''}
      />
      <input
        className="login__input login__input_password"
        type="password"
        name="password"
        placeholder="password"
        required=""
        onChange={handleChange}
        value={formValue.password || ''}
      />
    </ComponentAuth>
  );
};

export default Register;
