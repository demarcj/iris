"use client";

import { useState } from 'react';
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';

// Firebase
import { collection, addDoc } from 'firebase/firestore';
import { db } from "@/firebase/firebase"

import styles from "@/_styles/form.module.css";

// Material
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const Form = () => {
  const [property, set_property] = useState({
      address: ``,
      amenities: [],
      area: [],
      bathrooms: 1, 
      bedrooms: 0, 
      description: ``,
      email: ``, 
      id: ``,
      img: ``,
      images: [],
      name: ``, 
      phone_num: ``,
      option: ``, 
      price: 0, 
      size: 0, 
      type: ``
  } as {[key: string]: any});
  const required = [`name`, `address`, ``, `option`, `price`, `type`];

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

  const is_valid = (): boolean => !required.filter(key => !property[key]).length;

  const not_valid = () => {
    const values = required.filter(key => !property[key]).join(` and `);
    toast(`${values} field(s) is empty. Please fill in all fields.`);
  }
  
  const handle_submit = async () => {
    const id = self.crypto.randomUUID();
    set_property({...property, id});
    try{
      await addDoc(collection(db, `properties`), { property });
      toast(`Entry has successfully been saved!`);
    } catch(e) {
      toast(`Something went wrong. Please try again.`);
      console.error(e);
    }
  }

  const type_menu = [`Condo`, `House`, `Villa`, `Land`];
  const option_menu = [`Sell`, `Rental`];
  const area_menu = [`Big Buddha`, `Walking Street`, `Pattaya Beach`, `Jomtien Beach`];
  const amenities_menu = [`Microwave`, `Free Wifi`, `Pool`, `Fitness Room`];

  return (
    <>
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
              value={property.name}
              InputLabelProps={{ style : label }}
              inputProps={{ sx: imput_text }}
              fullWidth
              variant="standard"
              onChange={e => set_property({...property, name: e.target.value})}
              required
            />
            <TextField
              id="address"
              style={input_select}
              label="Property Address"
              value={property.address}
              InputLabelProps={{ style : label }}
              inputProps={{ sx: imput_text }}
              fullWidth
              variant="standard"
              onChange={e => set_property({...property, address: e.target.value})}
              required
            />
            <TextField
              id="address"
              style={input_select}
              label="Property Address"
              value={property.address}
              InputLabelProps={{ style : label }}
              inputProps={{ sx: imput_text }}
              fullWidth
              variant="standard"
              onChange={e => set_property({...property, address: e.target.value})}
              required
            />
            <TextField
              id="email"
              style={input_select}
              label="Email"
              type='email'
              value={property.email}
              InputLabelProps={{ style : label }}
              inputProps={{ sx: imput_text }}
              fullWidth
              variant="standard"
              onChange={e => set_property({...property, email: e.target.value})}
            />
            <TextField
              id="price"
              style={input_select}
              label="Price"
              type="number"
              value={property.price}
              InputLabelProps={{ style : label }}
              inputProps={{
                min: 0,
                sx: imput_text
              }}
              fullWidth
              variant="standard"
              onChange={e => set_property({ ...property, price: parseInt(e.target.value)})}
              required
            />
            <TextField
              id="bathrooms"
              style={input_select}
              label="No. Bedroom"
              type='number'
              value={property.bathrooms}
              InputLabelProps={{ style : label }}
              inputProps={{
                min: 1,
                sx: imput_text
              }}
              fullWidth
              variant="standard"
              onChange={e => set_property({...property, bathrooms: parseInt(e.target.value)})}
            />
            <TextField
              id="bebrooms"
              style={input_select}
              label="No. Bedroom"
              type='number'
              value={property.bedrooms}
              InputLabelProps={{ style : label }}
              inputProps={{
                min: 0,
                sx: imput_text
              }}
              fullWidth
              variant="standard"
              onChange={e => set_property({...property, bedrooms: parseInt(e.target.value)})}
            />
            <FormControl variant="standard" fullWidth>
              <InputLabel style={label} required htmlFor="type">Property Type</InputLabel>
              <Select
                id="type"
                style={input_select}
                labelId="type"
                value={property.type}
                label="Property Type"
                sx={select}
                onChange={e => set_property({...property, type: e.target.value})}
              >
                { type_menu.map((menu, i) => <MenuItem key={i} value={ menu.toLocaleLowerCase().replaceAll(` `, `_`) }>{ menu }</MenuItem>) }
              </Select>
            </FormControl>
            <FormControl variant="standard" fullWidth>
              <InputLabel style={label} required htmlFor="option"> Property Option</InputLabel>
              <Select
                style={input_select}
                labelId="option"
                id="option"
                value={property.option}
                label="Property Option"
                sx={select}
                onChange={e => set_property({...property, option: e.target.value})}
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
                value={property.area}
                label="Nearby Areas"
                sx={select}
                onChange={e => set_property({...property, area: e.target.value as []})}
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
                value={property.amenities}
                label="Amenities"
                sx={select}
                onChange={e => set_property({...property, amenities: e.target.value as []})}
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
              value={property.size}
              InputLabelProps={{ style : label }}
              inputProps={{
                min: 0,
                sx: imput_text
              }}
              fullWidth
              variant="standard"
              onChange={e => set_property({...property, size: parseInt(e.target.value)})}
            />
            <TextField
              id="description"
              style={input_select}
              label="Description"
              multiline
              value={property.description}
              rows={4}
              InputLabelProps={{ style : label }}
              inputProps={{ sx: imput_text }}
              variant="standard"
              fullWidth
              onChange={e => set_property({...property, description :e.target.value})}
            />
            <Button
              variant="contained" 
              onClick={() => is_valid() ? handle_submit() : not_valid()}
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
      <ToastContainer />
    </>
  )
}

export default Form;