'use client';

// Constants
import { LanguageToggleMap } from "@/_constants/locale";

// Material
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// NPM
import { ToastContainer, toast } from 'react-toastify';

// React
import { useState, useMemo } from 'react';

// Server
import { get_login } from '@/_server';

// Style
import styles from '@/_styles/login.module.css';

export const LoginUI = ({language} : {language: keyof typeof LanguageToggleMap}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const [login, set_login] = useState({
    password: ``,
    user_name: ``
  });
  const [show_password, set_show_password] = useState(false);

  const required = [`user_name`, `password`];
  const route = (url: string) => location.href = url;

  const is_valid = (required_list: string[]): boolean => {
    return !required_list.filter((key: string) => !login[key as keyof typeof login]).length;
  };

  const not_valid = async () => {
    const values = required.filter((key: string) => !login[key as keyof typeof login]).join(`, `);
    toast(`${values} field(s) is empty. Please fill in all fields.`);
  }

  const handle_submit = async () => {
    const fetch_login = await get_login(login);
    !!Object.keys(fetch_login)?.length && localStorage.setItem(`user`, JSON.stringify(fetch_login))
    !!Object.keys(fetch_login)?.length ? route(`/${language}/message?type=login`) : toast("Incorrect name or password!");
  }

  return (
    <ThemeProvider theme={theme}>
      <main className={styles.login_main}>
        <section className={styles.login_container}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            className={styles.input_container}
          >
            <FormControl fullWidth>
              <TextField
                id="user_name"
                value={login.user_name}
                label="User Name"
                onChange={e => set_login({...login, user_name: e.target.value})}
                required
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="password"
                type={ show_password ? `text` : `password`}
                label="Password"
                value={login.password}
                onChange={e => set_login({...login, password: e.target.value})}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => set_show_password(!show_password)}
                      >
                        {show_password ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                required
              />
            </FormControl>
            <div>
              <Button
                sx={{mt: `5px`}}
                variant="contained"
                onClick={() => is_valid(required) ? handle_submit() : not_valid()}
              >
                Login
              </Button>
            </div>
          </Box>
        </section>
        <ToastContainer />
      </main>
    </ThemeProvider>
  )
}