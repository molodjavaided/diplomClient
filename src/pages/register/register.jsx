import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authActions } from "../../redux/actions/auth-actions";
import { registerUser } from "../../redux/actions/auth-async";
import { Input } from "../../components/common/input/input";
import { Button } from "../../components/common/button/button";
import { Logo } from "../../components/ui/logo/logo";

const registerFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(/^\S*$/, "Неверный логин. Недопускаются пробелы")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Неверный логин. Допускаются только буквы и цифры"
    )
    .min(3, "Неверный логин. Минимум 3 символа")
    .max(15, "Неверный логин. Максимум 15 символов"),
  password: yup
    .string()
    .required("Заполните пароль")
    .matches(
      /[a-z]/,
      "Неверный пароль. Должна быть хотя бы одна строчная буква"
    )
    .matches(
      /[A-Z]/,
      "Неверный пароль. Должна быть хотя бы одна заглавная буква"
    )
    .matches(/\d/, "Неверный пароль. Должна быть хотя бы одна цифра")
    .min(8, "Неверный пароль. Минимум 8 символов")
    .max(30, "Неверный пароль. Максимум 30 символов"),

  passwordConfirmation: yup
    .string()
    .required("Подтвердите пароль")
    .oneOf([yup.ref("password")], "Пароли должны совпадать"),
});

const RegisterContainer = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    error: authError,
    isLoading,
    user,
  } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    setError: setFormError,
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: yupResolver(registerFormSchema),
    mode: "onChange",
  });

  const onSubmit = async ({ login, password }) => {
    try {
      dispatch(authActions.clearError());

      const result = await dispatch(registerUser(login, password));

      if (result?.success) {
        reset();
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <Logo />
      <div className="form-group">
        <Input
          id="login"
          type="text"
          placeholder="Напишите логин"
          {...register("login", {
            onChange: () => {
              if (authError) {
                dispatch(authActions.clearError());
              }
            },
          })}
          disabled={isLoading}
        />
        {errors.login && (
          <div className="error-message">{errors.login.message}</div>
        )}
      </div>

      <div className="form-group">
        <Input
          id="password"
          type="password"
          placeholder="Придумайте пароль"
          {...register("password", {
            onChange: () => dispatch(authActions.clearError()),
          })}
        />
        {errors.password && (
          <div className="error-message">{errors.password.message}</div>
        )}
      </div>

      <div className="form-group">
        <Input
          id="passwordConfirmation"
          type="password"
          placeholder="Повторите пароль"
          {...register("passwordConfirmation", {
            onChange: () => dispatch(authActions.clearError()),
          })}
        />
        {errors.passwordConfirmation && (
          <div className="error-message">
            {errors.passwordConfirmation.message}
          </div>
        )}
      </div>

      <Button type="submit" disabled={!isValid || isLoading || isSubmitting}>
        {isLoading || isSubmitting ? "Производится регистрация" : "Регистрация"}
      </Button>
      {authError && <div className="errorMessage">{authError}</div>}
      <Link to="/login">Войти</Link>
    </form>
  );
};

export const Register = styled(RegisterContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  margin-top: 50px;
  padding: 30px;
  border-radius: 10px;
  transition: all 0.3s;
  box-sizing: border-box;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  a {
    text-decoration: none;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
    max-width: 400px;
    padding: 30px;
    border-radius: 10px;
    transition: all 1s ease;
    box-sizing: border-box;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .errorMessage {
    color: red;
    font-size: 0.9rem;
    letter-spacing: 0.05rem;
    text-align: center;
    margin-top: 10px;
  }

  ${Logo} {
    width: 120px !important;
    height: 120px !important;
    margin-bottom: 20px;
  }
`;
