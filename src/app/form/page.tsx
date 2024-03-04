"use client";

import { useState, useEffect } from 'react';
import { PropertyModel } from "@/_models"
import { ToastContainer, toast } from 'react-toastify';
import Image from "next/image";

// Firebase
import { collection, addDoc } from "firebase/firestore";
import { updatePropertyImage } from "@/firebase/storage";
import { db } from "@/firebase/firebase";

//Stylings
import { label } from '@/_styles';
import styles from "@/_styles/form.module.css";
import global from "@/_styles/global.module.css";

// Material
import Box from '@mui/material/Box';
import Textarea from '@mui/joy/Textarea';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Checkbox from '@mui/joy/Checkbox';
import CircularProgress from '@mui/joy/CircularProgress';
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
    created_at: ``, 
    description: ``,
    email: ``, 
    id: crypto.randomUUID(),
    img: ``,
    images: [],
    hot_deal: false,
    name: ``, 
    option: ``, 
    phone: ``,
    price: 0,
    property_id: ``,
    size: 0, 
    type: ``,
    updated_at: ``,
    unit_number: ``
  } as PropertyModel);
  const [images, set_images] = useState({});
  const [img, set_img] = useState({} as File);
  const [loading, set_loading]  = useState(false);
  const [property_id, set_property_id] = useState(``);

  const required = [`address`, `name`, `option`, `phone`, `price`, `size`, `type`];
  const type_menu = [`Condo`, `House`, `Villa`, `Land`];
  const option_menu = [`Sell`, `Rental`];
  const area_menu = [`Big Buddha`, `Walking Street`, `Pattaya Beach`, `Jomtien Beach`];
  const amenities_menu = [
    `Fitness Room`,
    `Free Wifi`,
    `Air conditioner`,
    `Microwave`,
    `Pool`,
    `Pet Friendly`,
  ];

  const handleImage = (event: any, type: `single` | `multiple`) => {
    const target = event?.target;
    const files = !!target?.files.length ? target.files : null;
    type === `single` ? set_img(files[0]) : set_images(files);
  }

  const is_valid = (required_list: string[]): boolean => {
    const has_img = !!img?.name;
    const required_property = !required_list.filter((key: string) => {
      if(Array.isArray(property[key as keyof typeof property])){
        return (!property[key as keyof typeof property] as any)?.length;
      }
      return !property[key as keyof typeof property]
    }).length;
    return has_img && required_property;
  };

  const not_valid = () => {
    const values = required.filter((key: string) => !property[key as keyof typeof property]).join(`, `);
    toast(`${values} field(s) is empty. Please fill in all fields.`);
  }

  const submit_img = async (id: string, image: File) => {
    try{
      return await updatePropertyImage(id, image);
    } catch(e) {
      toast(`Something went wrong with uploading image. Please try uploading and submiting again.`);
    }
  }

  const get_images = () => {
    return new Promise((request, reject) => {
      let urls: any[] = [];
      const promise = new Promise((res, rej) => {
        Object.values(images).forEach(async (image, i, arr) => {
          await submit_img(property.id, image as File).then(url => {
            urls = [...urls, url];
            (arr.length === urls.length) && res(urls);
          })
        });
      });
      promise.then(data => request(data));
    })
  }

  const get_img = () => {
    return new Promise(async (resolve, reject) => {
      const promise = new Promise(async (res, rej) => {
        await submit_img(property.id, img).then(data => res(data) );
      });
      promise.then(data => resolve(data));
    });
  }

  const handle_submit = async () => {
    set_loading(true);
    try{
      const data_images = await get_images();
      const data_img = await get_img();
      const date = new Date();
      set_property({ 
        ...property, 
        images: data_images as string[], 
        img: data_img as string,
        property_id: property_id + property.property_id,
        created_at: date,
        updated_at: date
      });
      is_valid([...required, `img`]) && wait();
    } catch(e) {
      toast(`Something went wrong. Please try again.`);
      set_loading(false);
      console.error(e);
    }
  }

  const get_name_ref = (name: string) => {
    return name.split(` `)
      .filter((name: string) => !!name)
      .map((name: string) => name[0].toLocaleUpperCase())
      .join(``);
  }

  const handle_name = (e: any) => {
    set_property({ ...property, name: e.target.value });
    set_property_id(get_name_ref(e.target.value))
  }

  const wait = async () => {
    await addDoc(collection(db, `properties`), { ...property });
    set_loading(false);
    toast(`Entry has successfully been saved!`);
  }

  useEffect(() => {
    set_property({...property, property_id: `-${property.id.split(`-`)[1]}`});
  }, []);

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
                onChange={e => handle_name(e)}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={label} required>Address</FormLabel>
              <Input
                id="address"
                value={property.address}
                fullWidth
                onChange={e => set_property({ ...property, address: e.target.value})}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={label}>Unit Number</FormLabel>
              <Input
                id="unit_number"
                value={property.unit_number}
                fullWidth
                onChange={e => set_property({ ...property, unit_number: e.target.value})}
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={label}>Property ID</FormLabel>
              <Input
                id="property_id"
                value={property_id + property.property_id}
                fullWidth
                readOnly
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
                    min: 0,
                    step: 100
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
              onChange={(e: any, value) => set_property({...property, type: value as string})}
            >
              { type_menu.map((menu, i) => <Option key={i} value={ menu.toLocaleLowerCase().replaceAll(` `, `_`) }>{ menu }</Option>) }
            </Select>
            <FormLabel style={label} required htmlFor="option"> Property Option</FormLabel>
            <Select
              id="option"
              value={property.option}
              onChange={(e: any, value) => set_property({...property, option: value as string})}
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
                    min: 0,
                    step: 10
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
                slotProps={{
                  textarea: {
                    className: styles.textarea
                  }
                }}
                onChange={(e) => set_property({...property, description: e.target.value})}
              />
            </FormControl>
            <div className={styles.checkbox}>
              <FormControl>
                <Checkbox
                  id="hot_deal"
                  label="Hot Deal"
                  slotProps={{
                    root: {
                      style: label
                    },
                  }}
                  onChange={e => set_property({...property, hot_deal: e.target.checked})}
                />
              </FormControl>
            </div>
            <div>
              <Button
                component="label"
                role={undefined}
                slotProps={{
                  root: {
                    className: global.button
                  },
                }}
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
                  accept=".jpg, .jpeg, .png .webp"
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
                slotProps={{
                  root: {
                    className: global.button
                  },
                }}
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
                  accept=".jpg, .jpeg, .png .webp"
                  onChange={e => handleImage(e, `multiple`)}
                  multiple
                />
              </Button>
            </div>
            <span
              onClick={() => is_valid(required) ? handle_submit() : not_valid()}
            >
              <Button
                sx={{mt: `15px`}}
                slotProps={{
                  root: {
                    className: global.button
                  }
                }}
              >
                Submit
              </Button>
            </span>
          </Box>
        </div>
        <div className={styles.image_container}>
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
      { loading && <div className={global.loading}><CircularProgress variant="soft" /></div> }
    </>
  )
}

export default Form;