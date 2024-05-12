'use client';
import { useState, useEffect } from "react";

import { LoginModel } from "@/_models";

import styles from '@/_styles/message.module.css';
import { useSearchParams, useRouter } from 'next/navigation';

const Message = () => {
  const [counter, set_counter] = useState(5);
  const [login, set_login] = useState({} as LoginModel);
  const [ready, set_ready] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get(`type`);
  const property_name = searchParams.get(`property_name`);
  const timer = () => setTimeout(() => set_counter(counter - 1), 1000);

  const get_message = () => {
    const get_default = <h1>Opps, looks like you enter this page by mistake</h1>;
    const login_message = Object.hasOwn(login, `user_name`) ? (
      <>
        <h1>Hello, {login.user_name}</h1>
        <h2>You have successfully logged in!</h2>
      </>
    ) : get_default;
    const delete_message = <h1>You have successfully deleted the property {property_name}!</h1>
    return (
      type === `login` ? login_message : 
      type === `delete` ? delete_message : 
      get_default
    );
  }

  useEffect(() => {
    if(type === `login`){
      const login_data = JSON.parse(localStorage.getItem(`user`) as string) as LoginModel;
      set_login(login_data);
    } else {
      set_ready(true);
    }
  }, [])

  useEffect(() => { 
    (counter > 0) ? timer() : router.push(`/`); 
  }, [counter]);

  useEffect(() => set_ready(true), [login]);

  return (
    <main className={styles.main}>
      {
        ready && ( 
          <section className={styles.section}>
            <div className={styles.header_container}> {get_message()} </div>
            <div className={styles.detail}>Redirecting you to the homepage in {counter}</div>
          </section>
        )
      }
    </main>
  )
}

export default Message;