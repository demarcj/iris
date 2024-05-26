'use client';

// Model
import { PropertyModel } from '@/_models';

// React
import { useEffect, useState } from 'react';

// Server
import { get_property, admin_check, delete_property } from '@/_server';

// Style
import styles from "@/_styles/property.module.css";

interface AdminNoteModel {
  property: PropertyModel
}

export const AdminNote: React.FC<AdminNoteModel> = ({property}) => {
  const [has_login, set_has_login] = useState(false);

  useEffect(() => {
    (async () => {
      const check_login = await admin_check(localStorage.getItem(`user`));
      set_has_login(check_login);
    })();
  }, []);

  return (
    <>
      {
        has_login && (
          <section className={[styles.section, styles.section_detail].join(` `)}>
            <h2 className={styles.header}>Admin&apos;s Notes</h2>
            <div>{property.agent_note}</div>
          </section>
        )
      }
    </>
  )
}