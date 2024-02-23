"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';

// Firebase
import { collection, addDoc } from 'firebase/firestore';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updatePropertyImage } from "@/firebase/storage";
import { db } from "@/firebase/firebase";
import { updatePropertyImageReference } from "@/firebase/firestore";


import styles from "@/_styles/form.module.css";

// Material
import Box from '@mui/material/Box';
import Textarea from '@mui/joy/Textarea';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
// import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const Form = () => {
  const [property, set_property] = useState({
      address: ``,
      amenities: [],
      area: [],
      bathrooms: 1, 
      bedrooms: 0, 
      description: ``,
      email: ``, 
      id: self.crypto.randomUUID(),
      img: ``,
      images: [],
      name: ``, 
      phone: ``,
      option: ``, 
      price: 0, 
      size: 0, 
      type: ``
  } as {[key: string]: any});
  const [images, set_images] = useState({});
  const [img, set_img] = useState({});
  const required = [`name`, `address`, `size`, `option`, `price`, `type`];

  const handleImage = (event: any, type: `single` | `multiple`) => {
    const target = event?.target;
    const files = !!target?.files.length ? target.files : null;
    type === `single` ? set_img(files) : set_images(files);
  }

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
    try{
      const doc_ref = await addDoc(collection(db, `properties`), { ...property });
      Object.values(images).forEach(async (image: any) => {
        await updatePropertyImage(doc_ref.id, image).then(
          async (data) => {
            set_property({ ...property, images: [...property.images, data]});
            await updatePropertyImageReference(doc_ref.id, property.images);
          }
        )
      });
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
        <div id="form">
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl>
              <FormLabel sx={label} required>Property Name</FormLabel>
              <Input
                id="name"
                value={property.name}
                fullWidth
                onChange={e => set_property({ ...property, name: e.target.value})}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={label} required>Property Address</FormLabel>
              <Input
                id="address"
                value={property.address}
                fullWidth
                onChange={e => set_property({ ...property, address: e.target.value})}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={label} required>Email</FormLabel>
              <Input
                id="email"
                type="email"
                value={property.email}
                fullWidth
                onChange={e => set_property({ ...property, email: e.target.value})}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={label} required>Phone Number</FormLabel>
              <Input
                id="phone"
                type="phone"
                value={property.phone}
                fullWidth
                onChange={e => set_property({ ...property, phone: e.target.value})}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={label} required>Price</FormLabel>
              <Input
                id="price"
                type="number"
                value={property.price}
                slotProps={{
                  input: {
                    min: 0
                  },
                }}
                fullWidth
                onChange={e => set_property({ ...property, price: parseInt(e.target.value)})}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={label}>Bathrooms No.</FormLabel>
              <Input
                id="bathrooms"
                type="number"
                value={property.bathrooms}
                slotProps={{
                  input: {
                    min: 0
                  },
                }}
                fullWidth
                onChange={e => set_property({ ...property, bathrooms: parseInt(e.target.value)})}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={label}>Bedrooms No.</FormLabel>
              <Input
                id="bedrooms"
                type="number"
                value={property.bedrooms}
                slotProps={{
                  input: {
                    min: 0
                  },
                }}
                fullWidth
                onChange={e => set_property({ ...property, bedrooms: parseInt(e.target.value)})}
                required
              />
            </FormControl>
            <FormLabel style={label} required htmlFor="type">Property Type</FormLabel>
            <Select
              id="type"
              value={property.type}
              onChange={(e: any, value) => set_property({...property, type: value})}
            >
              { type_menu.map((menu, i) => <Option key={i} value={ menu.toLocaleLowerCase().replaceAll(` `, `_`) }>{ menu }</Option>) }
            </Select>
            <FormLabel style={label} required htmlFor="option"> Property Option</FormLabel>
            <Select
              id="option"
              value={property.option}
              onChange={(e: any, value) => set_property({...property, option: value})}
            >
              { option_menu.map((menu, i) => <Option key={i} value={ menu.toLocaleLowerCase().replaceAll(` `, `_`) }>{ menu }</Option>) }
            </Select>
            <FormLabel style={label} htmlFor="area">Nearby Areas</FormLabel>
            <Select
              id="area"
              value={property.area}
              onChange={(e: any, value) => set_property({...property, area: value})}
              multiple
            >
              { area_menu.map((menu, i) => <Option key={i} value={ menu.toLocaleLowerCase().replaceAll(` `, `_`) }>{ menu }</Option>) }
            </Select>
            <FormLabel style={label} htmlFor="amenities">Amenities</FormLabel>
            <Select
              id="amenities"
              value={property.amenities}
              onChange={(e: any, value) => set_property({...property, amenities: value})}
              multiple
            >
              { amenities_menu.map((menu, i) => <Option key={i} value={ menu.toLocaleLowerCase().replaceAll(` `, `_`) }>{ menu }</Option>) }
            </Select>
            <FormControl>
              <FormLabel sx={label} required>Land Size</FormLabel>
              <Input
                id="size"
                type="number"
                value={property.size}
                slotProps={{
                  input: {
                    min: 0
                  },
                }}
                fullWidth
                onChange={(e: any) => set_property({ ...property, size: parseInt(e.target.value)})}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={label}>Description</FormLabel>
              <Textarea
                id="description"
                value={property.description}
                minRows={3}
                onChange={(e) => set_property({...property, description: e.target.value})}
              />
            </FormControl>
            <div>
              <Button
                component="label"
                role={undefined}
                sx={{mt: `15px`}}
                tabIndex={-1}
                variant="outlined"
                startDecorator={
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </SvgIcon>
                }
              >
                Upload Main Image
                <VisuallyHiddenInput 
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={e => handleImage(e, `single`)}
                />
              </Button>
            </div>
            <div>
              <Button
                component="label"
                role={undefined}
                sx={{mt: `15px`}}
                tabIndex={-1}
                variant="outlined"
                startDecorator={
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </SvgIcon>
                }
              >
                Upload Images
                <VisuallyHiddenInput 
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={e => handleImage(e, `multiple`)}
                  multiple
                />
              </Button>
            </div>
            <Button
              sx={{mt: `15px`}}
              // onClick={() => is_valid() ? handle_submit() : not_valid()}
              onClick={handle_submit}
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