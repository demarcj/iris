'use client';
import { useState, useEffect } from "react";

import { PropertyCardVertical } from "@/_components/ui";
import styles from "@/_styles/properties.module.css";

import { get_properties, admin_check } from "@/_server";
import { PropertyModel } from "@/_models";

// Nextjs
import Image from 'next/image';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

const Properties = () => {
  const [cards, set_cards] = useState([] as PropertyModel[]);
  const [show_list, set_show_list] = useState(false);
  const [amenities, set_amenities] = useState([] as string[]);
  const [edit_mode, set_edit_mode] = useState(false);
  const [open, setOpen] = useState(false);

  
  const empty_list_message = `Sorry there is not any properties that matches your citeria.`;
  
  const display_amenities = (e: any, amenities_list: string[]) => {
    e.preventDefault();
    setOpen(true)
    set_amenities(amenities_list)
  }

  const handleClose = () => {
    setOpen(false);
    set_amenities([]);
  };

  useEffect(() => {
    (async () => {
      const data = await get_properties();
      const has_login = await admin_check(localStorage.getItem(`user`));
      set_edit_mode(has_login);
      set_cards(data.properties);
      set_show_list(true);
    })();
  }, []);

  return (
    <>
      <main className={[styles.main, `property_main`].join(` `)}> 
        <div className={styles.properties_container} >
          { 
            !show_list ? 
            `` :  
            !!cards.length ? 
            cards.map(slide => (
              <PropertyCardVertical 
                key={slide.id} 
                card={slide} 
                display_amenities={display_amenities}
                edit_mode={edit_mode}
              />)
            ) : 
            <div className={styles.empty_list_message}>{ empty_list_message }</div> 
          } 
        </div>
        <div className={styles.map}>
          <Image
            className={styles.img}
            src="/hero.jpg" 
            width={2000}
            height={2000}
            alt=''
          />
          <Dialog 
            open={open}
            onClose={handleClose}
          >
            <div className={styles.amenities}>
              { 
                amenities.map((amenity, i) => (
                  <div key={i}>{amenity.replaceAll(`_`, ` `)}</div>)
                ) 
              }
            </div>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </main>
    </>
  )
}

export default Properties;