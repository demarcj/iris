"use client";

import { useState } from 'react'
import styles from "@/_styles/form.module.css";

// Material
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const Form = () => {
  const [area, set_area] = useState(``);
  const [property_option, set_property_option] = useState(``);
  const [property_type, set_property_type] = useState(``);
  const handle_select = async () => {
    // localStorage.setItem(`create`, JSON.stringify({ }));
    console.log(`hello`)
  };

  const handle_sumbit = async () => {
    console.log(`submit`)
  }

  return (
    <main className={styles.main}>
      <div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="property_name"
            className={styles.input_select}
            label="Property Name"
            InputLabelProps={{style : {color : 'white'} }}
            inputProps={{
              sx: { color: 'white' }
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="price"
            className={styles.input_select}
            label="Price"
            type="number"
            InputLabelProps={{style : {color : 'white'} }}
            inputProps={{
              min: 0,
              sx: { color: 'white' }
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="bebrooms"
            className={styles.input_select}
            label="No. Bedroom"
            type='number'
            InputLabelProps={{style : {color : 'white'} }}
            inputProps={{
              min: 0,
              sx: { color: 'white' }
            }}
            fullWidth
            variant="standard"
          />
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <InputLabel className={styles.label} htmlFor="property_type">Property Type</InputLabel>
            <Select
              id="property_type"
              className={styles.input_select}
              labelId="property_type"
              value={property_type}
              label="Property Type"
              onChange={handle_select}
            >
              <MenuItem value="buy">Condo</MenuItem>
              <MenuItem value="house">House</MenuItem>
              <MenuItem value="villa">Villa</MenuItem>
              <MenuItem value="rental">Land</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <InputLabel className={styles.label} htmlFor="property_option"> Property Option</InputLabel>
            <Select
              className={styles.input_select}
              labelId="property_option"
              id="property_option"
              value={property_option}
              label="Property Option"
              onChange={handle_select}
            >
              <MenuItem value="buy">Buy</MenuItem>
              <MenuItem value="sell">Sell</MenuItem>
              <MenuItem value="rental">Rental</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
            <InputLabel className={styles.label} htmlFor="area">Area</InputLabel>
            <Select
              className={styles.input_select}
              labelId="area"
              id="area"
              value={area}
              label="Nearrby Area"
              onChange={handle_select}
            >
              <MenuItem value="big_buddha">Big Buddha</MenuItem>
              <MenuItem value="walking_street">Walking Street</MenuItem>
              <MenuItem value="pattaya_beach">Pattaya Beach</MenuItem>
              <MenuItem value="jomtien_beach">Jomtien Beach</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="size"
            className={styles.input_select}
            label="Property Size"
            type='number'
            InputLabelProps={{style : {color : 'white'} }}
            inputProps={{
              min: 0,
              sx: { color: 'white' }
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            id="description"
            className={styles.input_select}
            label="Description"
            multiline
            rows={4}
            defaultValue=""
            InputLabelProps={{ style : {color : 'white'} }}
            inputProps={{
              sx: { color: 'white' }
            }}
            variant="standard"
            fullWidth
          />
          <Button 
            variant="contained" 
            onClick={handle_sumbit}
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </Box>
      </div>
      <div></div>
    </main>
  )
}

export default Form;