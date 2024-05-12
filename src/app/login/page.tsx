'use client';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { get_login } from '@/_server';

// import { LoginModel } from "@/_models";

// Material
import Box from '@mui/material/Box';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Sheet from '@mui/joy/Sheet';
import { getInitColorSchemeScript } from '@mui/joy/styles';
import { CssVarsProvider } from '@mui/joy/styles';

// Style
import { label } from '@/_styles';
import styles from '@/_styles/login.module.css';
import global from "@/_styles/global.module.css";

const Login = () => {
  const [login, set_login] = useState({
    password: ``,
    user_name: ``
  });

  const required = [`user_name`, `password`];

  const is_valid = (required_list: string[]): boolean => {
    return !required_list.filter((key: string) => !login[key as keyof typeof login]).length;
  };

  const not_valid = async () => {
    const values = required.filter((key: string) => !login[key as keyof typeof login]).join(`, `);
    toast(`${values} field(s) is empty. Please fill in all fields.`);
  }

  const route = (url: string) => location.href = url;
  
  const handle_submit = async (e: any) => {
    e.preventDefault();
    const fetch_login = await get_login(login);
    !!Object.keys(fetch_login)?.length && localStorage.setItem(`user`, JSON.stringify(fetch_login))
    !!Object.keys(fetch_login)?.length ? route(`/message`) : toast("Incorrect name or password!");
  }

  return (
    <CssVarsProvider defaultMode="system">
      <main className={styles.login_main}>
        {getInitColorSchemeScript()}
        <section className={styles.login_container}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={e => is_valid(required) ? handle_submit(e) : not_valid()}
          >
            <FormControl>
              <FormLabel sx={label} required>User Name</FormLabel>
              <Input
                id="user_name"
                value={login.user_name}
                fullWidth
                onChange={e => set_login({...login, user_name: e.target.value})}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={label} required>Password</FormLabel>
              <Input
                id="password"
                value={login.password}
                fullWidth
                slotProps={{ input: { type: 'password' } }}
                onChange={e => set_login({...login, password: e.target.value})}
                required
              />
            </FormControl>
            <span>
              <Button
                sx={{mt: `5px`}}
                type='submit'
                slotProps={{ root: { className: global.button } }}
              >
                Login
              </Button>
            </span>
          </Box>
        </section>
      </main>
      <ToastContainer />
    </CssVarsProvider>
  )
}

export default Login;