'use client';

// Model
import { PropertyModel } from '@/_models';

// Material
import Button from '@mui/joy/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

// style
import global from "@/_styles/global.module.css";
import styles from "@/_styles/delete_dialog.module.css";

interface DeletePropertyModel {
  confirmed_delete: () => void;
  open: boolean;
  on_close: () => void;
  property: PropertyModel;
}

export const DeletePropertyDialog: React.FC<DeletePropertyModel> = ({confirmed_delete, open, on_close, property}) => {
  return (
    <Dialog
      open={open}
      onClose={on_close}
    >
      <div className={global.dialog}>
        <div className={styles.delete_message}>
          Are you sure you want to delete the property - <div className={styles.name}>[{property.name}]</div>
        </div>
        <DialogActions>
          <Button 
            color="danger"
            variant="soft"
            onClick={confirmed_delete}
          >
            Yes, I want to delete this property
          </Button>
          <Button onClick={on_close}> Close </Button>
        </DialogActions>
      </div>
    </Dialog>
  )
}