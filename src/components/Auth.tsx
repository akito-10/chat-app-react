import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, provider } from "../firebase/firebase";
import { updateUserProfile } from "../features/userSlice"
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";

import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    outline: "none",
    position: "absolute",
    backgroundColor: "#fff",
    width: 400,
    textAlign: "center",
    borderRadius: 10,
    padding: theme.spacing(3, 4),
  },
  pointer: {
    cursor: "pointer"
  }
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // ログイン画面とサインアップ画面振り分けのため
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);

    await authUser.user?.updateProfile({
      displayName: username,
    });

    dispatch(
      updateUserProfile({
        displayName: username,
      })
    );
  };

  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "ログイン" : "サインアップ"}
        </Typography>
        <form className={classes.form} noValidate>
          {!isLogin && (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />
            </>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            id="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            error={password.length < 6 && password !== ""}
            helperText="パスワードは6文字以上です。"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            disabled={
              isLogin
                ? !email || password.length < 6
                : !username || !email || password.length < 6
            }
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={
              isLogin
                ? async () => {
                    try {
                      await signInEmail();
                    } catch (err) {
                      alert(
                        "サインインに失敗しました。メールアドレスもしくはパスワードに誤りがないか確認してください。"
                      );
                    }
                  }
                : async () => {
                    try {
                      await signUpEmail();
                    } catch (err) {
                      alert(err.message);
                    }
                  }
            }
          >
            {isLogin ? "ログイン" : "アカウント新規作成"}
          </Button>
          <Grid container>
            <Grid item>
              <span
                onClick={() => setIsLogin(!isLogin)}
                className={classes.pointer}
              >
                {isLogin ? "アカウントを新規作成" : "ログイン画面へ"}
              </span>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={signInGoogle}
            className={classes.submit}
          >
            Googleでログイン
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Auth;
