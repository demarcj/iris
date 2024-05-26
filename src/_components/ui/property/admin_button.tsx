'use client';

// React
import { useState, useEffect } from 'react';

// Constants
import { LanguageType } from "@/_constants/locale";

// Nextjs
import { useRouter } from 'next/navigation';

// Material
import Button from '@mui/joy/Button';

// Style
import styles from "@/_styles/property.module.css";

// Function
import { route_edit } from '@/_function';

// Model
import { PropertyModel } from '@/_models';

// NPM
import { ToastContainer, toast } from 'react-toastify';

// Server
import { admin_check, delete_property } from '@/_server';

// UI
import { DeletePropertyDialog } from "@/_components/ui";

interface AdminButtonModel {
  property: PropertyModel;
  language: LanguageType
}

export const AdminButton: React.FC<AdminButtonModel> = ({property, language}) => {
  const [delete_dialog, set_delete_dialog ] = useState(false);
  const [has_login, set_has_login] = useState(false);

  const router = useRouter();

  const route_edit_mode = (e: any) => router.push(route_edit(property, language));

  const handle_delete_property = async () => set_delete_dialog(true);

  const handle_delete_close = () => set_delete_dialog(false);

  const confirmed_delete = async () => {
    const confirmation = await delete_property(property);
    if(confirmation){
      router.push(`${language}/message?type=delete&property_name=${property.name}`);
    } else {
      toast(`Something went wrong. Try again.`);
      set_delete_dialog(false);
    }
  }

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
          <div>
            <div className={[styles.button_group, styles.section_detail].join(` `)}>
              <h2>Admin</h2>
              <Button onClick={route_edit_mode}>Edit</Button>
              <Button onClick={handle_delete_property} color="danger">Delete</Button>
            </div>
            <DeletePropertyDialog
              open={delete_dialog}
              property={property}
              confirmed_delete={confirmed_delete}
              on_close={handle_delete_close}
            />
            <ToastContainer />
          </div>
        )
      }
    </>
  )
}