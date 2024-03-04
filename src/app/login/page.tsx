"use client";

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Firebase
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/firebase/firebase";

// Material
import Box from '@mui/material/Box';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';

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

  const not_valid = () => {
    const values = required.filter((key: string) => !login[key as keyof typeof login]).join(`, `);
    toast(`${values} field(s) is empty. Please fill in all fields.`);
  }

  const handle_submit = async () => {
    try{
      // await addDoc(collection(db, `properties`), { ...property });
    } catch(e) {
      toast(`Something went wrong. Please try again.`);
      console.error(e);
    }
  }

  return (
    <>
      <main className={styles.login_section}>
        <section className={styles.login_container}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
            >
              <FormControl>
                <FormLabel sx={label} required>User Name</FormLabel>
                <Input
                  id="address"
                  value={login.user_name}
                  fullWidth
                  onChange={e => set_login({...login, user_name: e.target.value})}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel sx={label} required>Password</FormLabel>
                <Input
                  id="address"
                  value={login.password}
                  fullWidth
                  slotProps={{ input: { type: 'password' } }}
                  onChange={e => set_login({...login, password: e.target.value})}
                  required
                />
              </FormControl>
              <span onClick={() => is_valid(required) ? handle_submit() : not_valid()} >
                <Button
                  sx={{mt: `15px`}}
                  slotProps={{
                    root: {
                      className: global.button
                    }
                  }}
                >
                  Login
                </Button>
              </span>
          </Box>
        </section>
      </main>
      <ToastContainer />
    </>
  )
}

export default Login;