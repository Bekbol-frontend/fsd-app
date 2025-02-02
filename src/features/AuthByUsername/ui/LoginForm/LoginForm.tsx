import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./LoginForm.module.scss";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { loginUsername } from "../../models/services/loginUsername";
import { useSelector } from "react-redux";
import { getLoginLoading } from "../../models/selectors/getLoginLoading";
import { getLoginError } from "../../models/selectors/getLoginError";
import { Title } from "@/shared/ui/Title";
import { useTranslation } from "react-i18next";
import AddOrRemoveReducer, {
  ReducersList,
} from "@/shared/config/components/AddOrRemoveReducer/AddOrRemoveReducer";
import { loginReducer } from "../../models/slice";
import { useNavigate } from "react-router-dom";
import { routePaths } from "@/shared/config/route";

const reducersList: ReducersList = {
  login: loginReducer,
};

interface IProps {
  close: () => void;
}

function LoginForm({ close }: IProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errUsername, setErrUsername] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const loading = useSelector(getLoginLoading);
  const error = useSelector(getLoginError);
  const navigate = useNavigate();

  const onChangeUsername = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setUsername(value);

      if (value) {
        setErrUsername("");
      } else {
        setErrUsername("Please input your username!");
      }
    },
    []
  );

  const onChangePassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setPassword(value);

      if (value) {
        setErrPassword("");
      } else {
        setErrPassword("Please input your password!");
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      setUsername("");
      setPassword("");
      setErrUsername("");
      setErrPassword("");
    };
  }, [dispatch]);

  const onSubmitForm = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!username && !password) {
        setErrUsername("Please input your username!");
        setErrPassword("Please input your password!");
        return;
      }

      if (!username) {
        setErrUsername("Please input your username!");
        return;
      }

      if (!password) {
        setErrPassword("Please input your password!");
        return;
      }

      if (username && password) {
        const res = await dispatch(loginUsername({ username, password }));

        if (res.meta.requestStatus === "fulfilled") {
          close();
          navigate(routePaths.ABOUT);
        }
      }
    },
    [username, password, dispatch]
  );

  return (
    <AddOrRemoveReducer reducersList={reducersList}>
      <form className={styles.form} onSubmit={onSubmitForm}>
        {error && <Title variyant="s" danger text={error} />}
        <Input
          label="Username"
          autofocus
          value={username}
          onChange={onChangeUsername}
          error={t(errUsername)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={onChangePassword}
          error={t(errPassword)}
        />
        <Button addClass={styles.formBtn} loading={loading}>
          {t("Login")}
        </Button>
      </form>
    </AddOrRemoveReducer>
  );
}

export default memo(LoginForm);
