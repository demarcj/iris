'use client';

import { useEffect, useState } from 'react';

import { contact } from '@/_data_local';

// Model
import { LoginModel } from '@/_models'

// Server
import { admin_check } from "@/_server";

// Function
import { format_phone_number } from "@/_function";

// Next
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Material
import Button from '@mui/joy/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

// Style
import styles from "@/_styles/footer.module.css";
import global from "@/_styles/global.module.css";

library.add(fab);

export const Footer = () => {
  const [is_login, set_is_login] = useState(false);
  const [open, set_open] = useState(false);
  const [ready, set_ready] = useState(false);

  const router = useRouter();
  const { email, facebook, line, phone_number } = contact;
  const year = new Date().getFullYear();

  const logged_off = () => set_open(true);

  const on_close = () => set_open(false);

  const confirmed_log_off = () => {
    localStorage.removeItem(`user`);
    location.href = `/message?type=logged_off`;
    set_open(false);
  }

  useEffect(() => {
    (async () => {
      const has_login = await admin_check(localStorage.getItem(`user`));
      set_is_login(has_login);
      set_ready(true);
    })();
  }, []);

  return (
    <>
      <footer className={styles.footer}>
        <div className={[styles.footer_section, styles.footer_left].join(` `)}>
          <div> &#169;{year} IRis Pattaya Property </div>
          {
            (!is_login && ready) && (
              <Link className={styles.login} href='/login'>
                Sign In
              </Link>
            )
          }
          {
            is_login && (
              <Button
                sx={{mt: `5px`}}
                color="warning"
                onClick={logged_off} 
              >
                Log Off
              </Button>
            )
          }
        </div>
        <div className={[styles.footer_section, styles.footer_right].join(` `)}>
          <div className={styles.contact}>
            <a 
              href={facebook}
              target="_blank"
            >
              <FontAwesomeIcon icon={['fab', 'facebook']}></FontAwesomeIcon>
            </a>
            <a 
              href={line}
              target="_blank"
            >
              <FontAwesomeIcon icon={['fab', 'line']}></FontAwesomeIcon>
            </a>
            <a href={`tel:+${phone_number}`}>
              <FontAwesomeIcon icon={faPhone} />
              : {format_phone_number(phone_number)}
            </a>
          </div>
          <div className={styles.email}>
            <a href={`mailto:${email}`} style={{marginRight: 0}}>
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
            : {email}
          </div>
        </div>
      </footer>
      <Dialog
        open={open}
        onClose={on_close}
      >
        <div className={global.dialog}>
          <div className={global.dialog_smessage}>
            Are you sure you want to log off?
          </div>
          <DialogActions>
            <Button 
              color="danger"
              variant="soft"
              onClick={confirmed_log_off}
            >
              Yes, I want to log off
            </Button>
            <Button onClick={on_close}> Close </Button>
          </DialogActions>
        </div>
      </Dialog> 
    </>
  )
}