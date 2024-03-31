"use client";

// React
import { useState, useEffect} from 'react';

// UI
import { InputUI } from '@/_components/ui'

// NPM
import { ToastContainer, toast } from 'react-toastify';

// Next
import Image from "next/image";

// Firebase
import { collection, addDoc, query, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { updatePropertyImage } from "@/firebase/storage";
import { db } from "@/firebase/firebase";

//Stylings
// import { label } from '@/_styles';
import styles from "@/_styles/form.module.css";
import global from "@/_styles/global.module.css";

// Material
import Box from '@mui/material/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';

// Models
import { PropertyModel, InputModel } from "@/_models";

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

const property_default = {
  address: ``,
  available_at: ``,
  amenities: [],
  area: [],
  bathrooms: 1, 
  bedrooms: 0,
  created_at: ``, 
  description: ``,
  email: ``, 
  id: crypto.randomUUID(),
  images: [],
  img: ``,
  hot_deal: false,
  name: ``, 
  option: [], 
  phone: ``,
  price: `0`,
  property_id: ``,
  size: 0,
  transfer_fees: ``, 
  type: ``,
  updated_at: ``,
  unit_number: ``
} as PropertyModel;

const Form = () => {
  const [property, set_property] = useState(structuredClone(property_default));
  const [images, set_images] = useState([] as FileList[]);
  const [img, set_img] = useState({} as File);
  const [loading, set_loading] = useState(false);
  const [property_id_data, set_property_id_data] = useState({id: ``, data: {} as any});
  
  const required = [`address`, `available_at`, `name`, `option`, `phone`, `price`, `size`, `type`];
  const option_menu = [`Sell`, `Rental`];
  const transfer_fees = [`On buyer`, `On Owner`, `Share 50/50`];
  const type_menu = [
    `Bar`,
    `Commercial`,
    `Condo`,
    `Hotel / Resort`,
    `House`, 
    `Land`,
    `Office`,
    `Restaurant`,
    `Townhouse`,
    `Villa`, 
  ];
  const amenities_menu = [
    `Air conditioner`,
    `Balcony`,
    `Bathtub`,
    `Balcony Table and Seats`,
    `Cabinet / Closet`,
    `Curtains`,
    `Dining Table`,
    `Electric Stove`,
    `European Kitchen`,
    `Fitness Room`,
    `Gas Stove`,
    `Garden`,
    `Jacuzzi`,
    `Kitchen Hood/Fan`,
    `Microwave`,
    `Oven`,
    `Parking`,
    `Pet Friendly`,
    `Refrigerator`,
    `Sofa Bed`,
    `Swimming Pool`,
    `Thai Kitchen`,
    `TV / Television`,
    `Washing Machine`,
    `Water Tank`,
    `Working Table`,
    `WIFI`
  ];

  const set_data = (data: any, key_name: string) => {
    set_property({...property, [key_name]: data})
  }

  const default_input: InputModel = {
    class_name: `input_container`,
    form_label: ``,
    type: `text`,
    key_name: ``,
    value: ``,
    set_data,
    required: true,
    list: [],
    multiple: false,
    step: 1,
    min: 0
  }

  const input_list: InputModel[] = [
    {
      ...default_input,
      form_label: `Property Name`,
      value: property.name,
      key_name: `name`,
    },
    {
      ...default_input,
      form_label: `Address`,
      value: property.address,
      key_name: `address`,
    },
    {
      ...default_input,
      form_label: `Unit Number`,
      required: false,
      value: property.unit_number,
      key_name: `unit_number`,
    },
    {
      ...default_input,
      form_label: `Property ID`,
      value: property.property_id,
      type: `readonly`,
      key_name: `property_id`,
    },
    {
      ...default_input,
      form_label: `Email`,
      value: property.email,
      type: `email`,
      key_name: `email`,
    },
    {
      ...default_input,
      form_label: `Phone Number`,
      value: property.phone,
      type: `phone`,
      key_name: `phone`,
    },
    {
      ...default_input,
      form_label: `Price`,
      value: property.price,
      type: `number_format`,
      key_name: `price`,
    },
    {
      ...default_input,
      form_label: `Bedrooms No.`,
      value: property.bedrooms,
      required: false,
      type: `number`,
      key_name: `bedrooms`,
    },
    {
      ...default_input,
      form_label: `Bathroom No.`,
      value: property.bathrooms,
      required: false,
      type: `number`,
      key_name: `bathrooms`,
    },
    {
      ...default_input,
      form_label: `Property Type`,
      value: property.type,
      type: `select`,
      key_name: `type`,
      list: type_menu
    },
    {
      ...default_input,
      form_label: `Property Option`,
      value: property.option,
      type: `select`,
      key_name: `option`,
      multiple: true,
      list: option_menu
    },
    {
      ...default_input,
      form_label: `Transfer Fees`,
      value: property.transfer_fees,
      type: `select`,
      key_name: `transfer_fees`,
      list: transfer_fees
    },
    {
      ...default_input,
      form_label: `Amenities`,
      value: property.amenities,
      required: false,
      multiple: true,
      type: `select`,
      key_name: `amenities`,
      list: amenities_menu
    },
    {
      ...default_input,
      form_label: `Land Size`,
      value: property.size,
      type: `number`,
      key_name: `size`,
    },
    {
      ...default_input,
      form_label: `Description`,
      value: property.description,
      type: `textarea`,
      key_name: `description`,
    },
    {
      ...default_input,
      form_label: `Available At`,
      value: property.available_at,
      type: `date`,
      key_name: `available_at`,
    },
    {
      ...default_input,
      form_label: `Hot Deal`,
      class_name: `checkbox`,
      value: property.hot_deal,
      type: `checkbox`,
      key_name: `hot_deal`,
    },
  ]

  const handleImage = (event: any, type: `single` | `multiple`) => {
    const target = event?.target;
    const files = !!target?.files.length ? target.files : null;
    type === `single` ? set_img(structuredClone(files[0])) : set_images(structuredClone(files));
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
    const has_img = !!img?.name ? [] : [`img`]
    const values = [...required, ...has_img].filter((key: string) => !property[key as keyof typeof property]).join(`, `);
    toast(`${values} field(s) is empty. Please fill in all fields.`);
  }

  const submit_img = async (id: string, image: File | FileList) => {
    try{
      return await updatePropertyImage(id, image as File);
    } catch(e) {
      toast(`Something went wrong with uploading image. Please try uploading and submiting again.`);
    }
  }

  const get_images = () => {
    return new Promise((request, reject) => {
      let urls: any[] = [];
      const promise = new Promise((res, rej) => {
        Object.values(images).forEach(async (image, i, arr) => {
          await submit_img(property.id, image).then(url => {
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
        await submit_img(property.id, img).then(data => res(data));
      });
      promise.then(data => resolve(data));
    });
  }

  const update_property = async () => {
    try{
      await addDoc(collection(db, `properties`), { ...property });
      const property_ref = doc(collection(db, "property_id"), property_id_data.id);
      await updateDoc(property_ref, { property_id: (property_id_data.data.property_id + 1) })
        .then(() => {
          set_property({ ...property_default, id: crypto.randomUUID() });
          set_img({} as File);
          set_images([] as FileList[]);
          set_loading(false);
          toast(`Entry has successfully been saved!`);
        });
    } catch(e) {
      console.error(e);
      throw e;
    }
  }

  const handle_submit = async () => {
    set_loading(true);
    try{
      const data_images = !!images.length ? await get_images() : [];
      const data_img = await get_img();
      const date = new Date();
      set_property({ 
        ...property, 
        images: data_images as string[], 
        img: data_img as string,
        created_at: date,
        updated_at: date
      });
    } catch(e) {
      toast(`Something went wrong. Please try again.`);
      set_loading(false);
      console.error(e);
    }
  }

  const number_convert = (num: string) => {
    const zero_max = 4;
    const new_number = `${parseInt(num) % 10000}`;
    const zero_amount = zero_max - new_number.length;
    let zero_number = new_number;
    Array.from({ length: zero_amount }, (v, i) => zero_number = `0${zero_number}`);
    const property_id = `IR-${zero_number}`
    set_property({...property, property_id});
  }

  const query_property_id = () => {
    const q = query(collection(db, `property_id`));
    onSnapshot(q, (querySnapshot) => {
      let items: any[] = [];
      querySnapshot.forEach(item => {
        set_property_id_data(structuredClone({id: item.id, data: item.data()}));
        items = [item.data()];
      });
      !!items.length && number_convert(items[0].property_id);
    });
  }

  const get_property_id = () => !!property_id_data.id.length ? number_convert(property_id_data.data.property_id) : query_property_id();

  useEffect(() => get_property_id(), []);
  
  useEffect(() => { 
    ((loading && is_valid([...required, `img`])) && update_property());
    (!property.property_id.length && get_property_id());
  }, [property]);

  return (
    <>
      <main className={styles.main}>
        <div id="form" className={styles.form_container}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            {input_list.map(
              (input, i) => 
                <InputUI 
                  class_name={input.class_name}
                  form_label={input.form_label} 
                  key={i}
                  key_name={input.key_name}
                  list={input.list}
                  min={input.min}
                  multiple={input.multiple}
                  required={input.required}
                  set_data={input.set_data}
                  step={input.step}
                  type={input.type}
                  value={input.value}
                />
              )
            }
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