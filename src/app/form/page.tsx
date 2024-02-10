"use client";

import { useState } from 'react';
import Image from "next/image";

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
  const [area, set_area] = useState([]);
  const [amenities, set_amenities] = useState([]);
  const [name, set_name] = useState(``);
  const [price, set_price] = useState(`0`);
  const [bedrooms, set_bedrooms] = useState(`0`);
  const [size, set_size] = useState(`0`);
  const [description, set_description] = useState(``);
  const [property_option, set_property_option] = useState(``);
  const [property_type, set_property_type] = useState(``);

  const input_select = {
      borderBottom: `1px solid white`,
      borderTop: `none`,
      borderLeft: `none`,
      borderRight: `none`,
      outline: `none`,
      margin: `15px 0`
  };

  const imput_text = { color: "white" };
  const label = { color: `white` };
  const select = { 
    "& .MuiSvgIcon-root": { color: "white" }, 
    color: 'white' 
  };
  
  const handle_sumbit = async () => {
    const id = self.crypto.randomUUID();
    const values = {
      id,
      area, 
      name, 
      price, 
      bedrooms, 
      size, 
      description, 
      property_option, 
      property_type
    };
    localStorage.setItem(`create`, JSON.stringify({...values, id}));
  }

  const type_menu = [`Condo`, `House`, `Villa`, `Land`];
  const option_menu = [`Buy`, `Sell`, `Rental`];
  const area_menu = [`Big Buddha`, `Walking Street`, `Pattaya Beach`, `Jomtien Beach`];
  const amenities_menu = [`Microwave`, `Free Wifi`, `Pool`, `Fitness Room`];

  return (
    <main className={styles.main}>
      <div>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            id="name"
            style={input_select}
            label="Property Name"
            value={name}
            InputLabelProps={{ style : label }}
            inputProps={{ sx: imput_text }}
            fullWidth
            variant="standard"
            onChange={e => set_name(e.target.value)}
            required
          />
          <TextField
            id="price"
            style={input_select}
            label="Price"
            type="number"
            value={price}
            InputLabelProps={{ style : label }}
            inputProps={{
              min: 0,
              sx: imput_text
            }}
            fullWidth
            variant="standard"
            onChange={e => set_price(e.target.value)}
            required
          />
          <TextField
            id="bebrooms"
            style={input_select}
            label="No. Bedroom"
            type='number'
            value={bedrooms}
            InputLabelProps={{ style : label }}
            inputProps={{
              min: 0,
              sx: imput_text
            }}
            fullWidth
            variant="standard"
            onChange={e => set_bedrooms(e.target.value)}
          />
          <FormControl variant="standard" fullWidth>
            <InputLabel style={label} required htmlFor="property_type">Property Type</InputLabel>
            <Select
              id="property_type"
              style={input_select}
              labelId="property_type"
              value={property_type}
              label="Property Type"
              sx={select}
              onChange={e => set_property_type(e.target.value)}
            >
              { type_menu.map((menu, i) => <MenuItem key={i} value={ menu.toLocaleLowerCase().replaceAll(` `, `_`) }>{ menu }</MenuItem>) }
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel style={label} required htmlFor="property_option"> Property Option</InputLabel>
            <Select
              style={input_select}
              labelId="property_option"
              id="property_option"
              value={property_option}
              label="Property Option"
              sx={select}
              onChange={e => set_property_option(e.target.value)}
            >
              { option_menu.map((menu, i) => <MenuItem key={i} value={ menu.toLocaleLowerCase().replaceAll(` `, `_`) }>{ menu }</MenuItem>) }
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel style={label} htmlFor="area">Nearby Areas</InputLabel>
            <Select
              style={input_select}
              labelId="area"
              id="area"
              value={area}
              label="Nearby Areas"
              sx={select}
              onChange={e => set_area(e.target.value as [])}
              multiple
            >
              { area_menu.map((menu, i) => <MenuItem key={i} value={ menu.toLocaleLowerCase().replaceAll(` `, `_`) }>{ menu }</MenuItem>) }
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel style={label} htmlFor="amenities">Amenities</InputLabel>
            <Select
              style={input_select}
              labelId="amenities"
              id="amenities"
              value={amenities}
              label="Amenities"
              sx={select}
              onChange={e => set_amenities(e.target.value as [])}
              multiple
            >
              { amenities_menu.map((menu, i) => <MenuItem key={i} value={ menu.toLocaleLowerCase().replaceAll(` `, `_`) }>{ menu }</MenuItem>) }
            </Select>
          </FormControl>
          <TextField
            id="size"
            style={input_select}
            label="Property Size"
            type='number'
            value={size}
            InputLabelProps={{ style : label }}
            inputProps={{
              min: 0,
              sx: imput_text
            }}
            fullWidth
            variant="standard"
            onChange={e => set_size(e.target.value)}
          />
          <TextField
            id="description"
            style={input_select}
            label="Description"
            multiline
            value={description}
            rows={4}
            InputLabelProps={{ style : label }}
            inputProps={{ sx: imput_text }}
            variant="standard"
            fullWidth
            onChange={e => set_description(e.target.value)}
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
      <div>
        <Image
          className={styles.img}
          src="/hero.jpg" 
          width={2000}
          height={2000}
          alt=''
        />
      </div>
    </main>
  )
}

export default Form;