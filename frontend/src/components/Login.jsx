import ComponentAuth from "./ComponentAuth";
import { useState } from "react";

const Login = ({ loginAuth }) => {
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

    loginAuth(formValue.email, formValue.password)
  };

  return (
    <ComponentAuth
      formName="login"
      buttonText="Войти"
      title="Вход"
      onSubmit={handleSubmit}
    >
      <input
        className="login__input login__input_email"
        type="email"
        name="email"
        placeholder="Email"
        required=""
        value={formValue.email || ''}
        onChange={handleChange}
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

export default Login;
