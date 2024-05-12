'use client';
import { useState, useEffect } from "react";

// NPM
import { ToastContainer, toast } from 'react-toastify';

// UI
import { PropertyCardVertical, DeletePropertyDialog } from "@/_components/ui";

// Server
import { get_properties, admin_check, delete_property } from "@/_server";

// Model
import { PropertyModel } from "@/_models";

// Nextjs
import Image from 'next/image';

// Material
import Button from '@mui/joy/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

// style
import global from "@/_styles/global.module.css";
import styles from "@/_styles/properties.module.css";

const Properties = () => {
  const [cards, set_cards] = useState([] as PropertyModel[]);
  const [selected_property, set_selected_property] = useState({} as PropertyModel);
  const [show_list, set_show_list] = useState(false);
  const [amenities, set_amenities] = useState([] as string[]);
  const [edit_mode, set_edit_mode] = useState(false);
  const [amenities_dialog, set_amenities_dialog] = useState(false);
  const [delete_dialog, set_delete_dialog] = useState(false);

  const empty_list_message = `Sorry there is not any properties that matches your citeria.`;
  
  const display_amenities = (e: any, property: PropertyModel) => {
    e.preventDefault();
    set_amenities_dialog(true)
    set_amenities(property.amenities)
  }

  const handle_delete_property = async (e: any, property: PropertyModel) => {
    e.preventDefault();
    set_selected_property(property);
    set_delete_dialog(true);
  }

  const confirmed_delete = async () => {
    const confirmation = await delete_property(selected_property);
    if(confirmation){
      toast(`The property ${selected_property.name} is now deleted.`);
      const data = await get_properties();
      set_cards(data.properties);
    } else {
      toast(`Something went wrong. Try again.`);
    }
    set_selected_property({} as PropertyModel);
    set_delete_dialog(false);
  }

  const handle_amenities_close = () => {
    set_amenities_dialog(false);
    set_amenities([]);
  };

  const handle_delete_close = () => {
    set_delete_dialog(false);
  }

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
            cards.map(card => (
              <PropertyCardVertical 
                key={card.id} 
                property={card} 
                display_amenities={display_amenities}
                delete_property={handle_delete_property}
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
            open={amenities_dialog}
            onClose={handle_amenities_close}
          >
            <div className={global.dialog}>
              <div className={styles.amenities}>
                { 
                  amenities.map((amenity, i) => (
                    <div key={i}>{amenity.replaceAll(`_`, ` `)}</div>)
                  ) 
                }
              </div>
              <DialogActions>
                <Button onClick={handle_amenities_close} autoFocus>
                  Close
                </Button>
              </DialogActions>
            </div>
          </Dialog>
          <DeletePropertyDialog
            confirmed_delete={confirmed_delete} 
            open={delete_dialog}
            on_close={handle_delete_close}
            property={selected_property}
          />
        </div>
      </main>
      <ToastContainer />
    </>
  )
}

export default Properties;