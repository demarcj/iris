'use client';
import { useState, useEffect } from "react";

import { LoginModel } from "@/_models";

import styles from '@/_styles/message.module.css';
import { useRouter } from 'next/navigation';

const Message = () => {
  const [counter, set_counter] = useState(5);
  const [login, set_login] = useState({} as LoginModel);

  const router = useRouter();
  const timer = () => setTimeout(() => set_counter(counter - 1), 1000);

  useEffect(() => {
    set_login(JSON.parse(localStorage.getItem(`user`) as string));
  }, []);

  useEffect(() => {
    (counter > 0) ? timer() : router.push(`/`);
  }, [counter])

  return (
    <main className={styles.main}>
      {
        !!login?.user_name?.length && (
          <section className={styles.section}>
            <div className={styles.header_container}>
              <h1>Hello, {login?.user_name}</h1>
              <h2>You have successfully logged in!</h2>
            </div>
            <div className={styles.detail}>Redirecting you to the homepage in {counter}</div>
          </section>
        )
      }
    </main>
  )
}

export default Message;