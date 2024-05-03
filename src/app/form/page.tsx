"use client";

// React
import { useState, useEffect} from 'react';

// UI
import { InputUI } from '@/_components/ui'

// NPM
import { ToastContainer, toast } from 'react-toastify';

// Next
import Image from "next/image";
import { useSearchParams } from 'next/navigation'

// Firebase
import { collection, addDoc, query, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { updatePropertyImage } from "@/firebase/storage";
import { db } from "@/firebase/firebase";

//Stylings
import styles from "@/_styles/form.module.css";
import global from "@/_styles/global.module.css";

// Material
import Box from '@mui/material/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import Button from '@mui/joy/Button';
import { getInitColorSchemeScript } from '@mui/joy/styles';
import { CssVarsProvider } from '@mui/joy/styles';

// Models
import { PropertyModel, InputModel } from "@/_models";

// Server
import { get_property, admin_check, update_property } from '@/_server';

const property_default = {
  address: ``,
  agent_note: ``,
  amenities: [],
  allows_marijuana: false,
  available_at: ``,
  bathrooms: 1, 
  bedrooms: 0,
  created_at: ``, 
  description: ``,
  email: ``,
  facilities: [],
  floor: 0,
  furnished: ``, 
  hot_deal: false,
  id: crypto.randomUUID(),
  images: [],
  img: ``,
  location: `Other`,
  name: ``, 
  option: [],
  ownership: ``, 
  phone: ``,
  price: ``,
  property_id: ``,
  size: ``,
  sub_district: ``,
  stories: 0,
  transfer_fees: ``, 
  type: ``,
  unit_number: ``,
  useable_area: ``,
  updated_at: ``,
  views: []
} as PropertyModel;

const Form = () => {
  const [property, set_property] = useState(structuredClone(property_default));
  const [images, set_images] = useState({} as FileList);
  const [has_facilities, set_has_facilities] = useState(false);
  const [img, set_img] = useState({} as File);
  const [loading, set_loading] = useState(false);
  const [property_id_data, set_property_id_data] = useState({id: ``, data: {} as any});
  const [prev_location, next_location] = useState(`Other`);
  const [edit_mode, set_edit_mode] = useState(false);
  const [property_ref, set_property_ref] = useState(``);
  
  const searchParams = useSearchParams();
  const id = searchParams.get(`id`);
  const edit = searchParams.get(`edit`);
  const required = [`available_at`, `name`, `option`, `price`, `size`, `type`];
  const option_menu = [`Sell`, `Rental`];
  const views_menu = [`Sea View`, `Partial Sea View`, `City View`, `Pool View`, `Garden View`, `Mountain View`];
  const furnished_menu = [`Furnished`, `Fully Furnished`, `Unfurnished`];
  const ownership_menu = [`Foreign Quota`, `Thai Quota`, `Thai Company Name`];
  const location_menu = [`Other`, `Dark Side`, `Sea Side`];
  const loction_map = {
    other: [],
    dark_side:  [
      `Nongprue`,
      `Nongpla-Lai`,
      `Nongket Noi`,
      `Nongket-Yai`,
      `Pornprapa- Nimit`,
      `Siam Country Club`,
      `Mabprachan Lake`,
      `Pong`,
      `Takien Tia`,
      `Nuen Plubwan`,
      `Khao Noi`,
      `Khao Talo`,
      `Nongkrabok`,
      `Tungklom-Tanman`,
      `Chaknok Lake`,
      `Chaiyapruk`,
      `Huayyai`
    ],
    sea_side: [
      `Naklua`,
      `Wongamart Beach`,
      `North Pattaya`,
      `Central Pattaya Beach Road`,
      `Central Pattaya 2 nd Road`,
      `Buakhao, Central Pattaya`,
      `South Pattaya`,
      `Tamnak Hill`,
      `Kasetsin-Tamnak Hill`,
      `Jomtien Beach Road`,
      `Jomtien 2 nd Road`,
      `Na-Jomtien`,
      `Bangsare`,
      `Sattahip`
    ]
  }
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

  const facilities_menu = [
    `Swimming Pool`,
    `Rooftop Swimming Pool`,
    `Parking`,
    `Underground Parking`,
    `Garden`,
    `Security Guard`,
    `Sauna`,
    `Steamed`,
    `Elevator`,
    `Accessibility`,
    `Kids club`,
    `Access to the beach`,
    `Private Beach`,
    `Near to the beach`,
    `CCTV`
  ]

  const handle_image = (event: any, type: boolean) => {
    const target = event?.target;
    const files = !!target?.files.length ? target.files : null;
    type ? set_images(structuredClone(files)) : set_img(structuredClone(files[0]));
  }

  const set_data = (data: any, key_name: string) => {
    if(key_name === `has_facilities`){
      set_has_facilities(data);
      return;
    }
    set_property({...property, [key_name]: data})
  };

  const default_input: InputModel = {
    class_name: `input_container`,
    disabled: false,
    form_label: ``,
    handle_image,
    hint: ``,
    key_name: ``,
    list: [],
    min: 0,
    multiple: false,
    required: true,
    set_data,
    step: 1,
    type: `text`,
    value: ``
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
      required: false,
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
      form_label: `Has Project Facilities`,
      class_name: ``,
      value: has_facilities,
      type: `checkbox`,
      key_name: `has_facilities`,
    },
    {
      ...default_input,
      form_label: `Project Facilities`,
      value: property.facilities,
      disabled: !has_facilities,
      required: false,
      multiple: true,
      type: `select`,
      key_name: `facilities`,
      list: facilities_menu
    },
    {
      ...default_input,
      form_label: `Views`,
      value: property.views,
      required: false,
      multiple: true,
      type: `select`,
      key_name: `views`,
      list: views_menu
    },
    {
      ...default_input,
      form_label: `Location`,
      value: property.location,
      required: false,
      type: `select`,
      key_name: `location`,
      list: location_menu
    },
    {
      ...default_input,
      form_label: `Sub District`,
      value: property.sub_district,
      required: false,
      type: property?.location?.toLowerCase() === `other` ? `text` : `select`,
      key_name: `sub_district`,
      list: loction_map[(property?.location?.toLowerCase().replace(` `, `_`) as keyof typeof loction_map)]
    },
    {
      ...default_input,
      form_label: `Property ID`,
      value: property.property_id,
      type: `readonly`,
      key_name: `property_id`,
    },
    // {
    //   ...default_input,
    //   form_label: `Email`,
    //   value: property.email,
    //   type: `email`,
    //   key_name: `email`,
    // },
    // {
    //   ...default_input,
    //   form_label: `Phone Number`,
    //   value: property.phone,
    //   type: `phone`,
    //   key_name: `phone`,
    // },
    {
      ...default_input,
      form_label: `Price`,
      value: property.price,
      type: `money_format`,
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
      form_label: `Stories`,
      value: property.stories,
      required: false,
      type: `number`,
      key_name: `stories`,
    },
    {
      ...default_input,
      form_label: `Floor`,
      value: property.floor,
      required: false,
      type: `number`,
      key_name: `floor`,
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
      form_label: `Ownership`,
      value: property.ownership,
      type: `select`,
      key_name: `ownership`,
      list: ownership_menu
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
      form_label: `Furnished`,
      value: property.furnished,
      type: `select`,
      key_name: `furnished`,
      list: furnished_menu
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
      type: `size_format`,
      key_name: `size`,
    },
    {
      ...default_input,
      form_label: `Useable Area`,
      value: property.useable_area,
      type: `size_format`,
      key_name: `useable_area`,
    },
    {
      ...default_input,
      form_label: `Description`,
      value: property.description,
      required: false,
      type: `textarea`,
      key_name: `description`,
    },
    {
      ...default_input,
      form_label: `Agent Note`,
      value: property.agent_note,
      required: false,
      type: `textarea`,
      key_name: `agent_note`,
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
      class_name: ``,
      value: property.hot_deal,
      type: `checkbox`,
      key_name: `hot_deal`,
    },
    {
      ...default_input,
      form_label: `Allows Marijuana`,
      class_name: ``,
      value: property.allows_marijuana,
      type: `checkbox`,
      key_name: `allows_marijuana`,
    },
    {
      ...default_input,
      form_label: `Upload Main Image`,
      class_name: `Button`,
      value: property.img,
      type: `image`,
      key_name: `img`,
    },
    {
      ...default_input,
      form_label: `Upload Images`,
      class_name: `Button`,
      value: property.images,
      multiple: true,
      type: `image`,
      key_name: `images`,
    }
  ]

  const is_valid = (required_list: string[]): boolean => {
    const has_img = edit_mode ? true : !!img?.name;
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
      return ``;
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
      promise.then((data) => resolve(data));
    });
  }

  const create_property = async (img: string = ``, images: string[] = []) => {
    try{
      await addDoc(collection(db, `properties`), { 
        ...property, 
        img, 
        images,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      const property_ref = doc(collection(db, "property_id"), property_id_data.id);
      await updateDoc(property_ref, { property_id: (property_id_data.data.property_id + 1) })
        .then(() => {
          set_property({ ...property_default, id: crypto.randomUUID() });
          set_img({} as File);
          set_images({} as FileList);
          toast(`Entry has successfully been saved!`);
        });
    } catch(e) {
      console.error(e);
      throw e;
    }
  }

  const handle_update_property = async () => {
    const data = await update_property(property_ref ,property);
    const message = data ? `The update was a success` : `Something went wrong with request.`;
    toast(message);
  }

  const handle_submit = async () => {
    set_loading(true);
    const valid_switch = edit_mode ? required : [...required, `img`];
    is_valid(valid_switch);

    try{
      if(edit_mode){
        await handle_update_property();
      } else {
        const data_images = !!images.length ? await get_images() as string[] : [];
        const data_img = await get_img();
        create_property((data_img as string), data_images);
      }
    } catch(e) {
      toast(`Something went wrong. Please try again.`);
      console.error(e);
    }
    set_loading(false);
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

  const location_check = () => {
    if(property.location !== prev_location){
      next_location(property.location);
      set_property({...property, sub_district: ``})
    }
  }

  const valid_edit_mode = async (): Promise<boolean> => {
    const has_login = await admin_check(localStorage.getItem(`user`));
    if(!has_login){
      return false;
    }
    const has_edit = Object.is(edit, `true`);
    const data = await get_property(id || ``);
    const has_property = Object.hasOwn(data, `id`);
    if(has_property){
      const property_data = data.property;
      const has_facilities_list = property_data?.facilities !== undefined && property_data.facilities?.length > 0;
      set_property(property_data);
      set_property_ref(data.id);
      set_has_facilities(has_facilities_list);
      set_edit_mode(true);
    }
    return has_edit && has_login && has_property;
  }

  useEffect(() => {
    (async () => !(await valid_edit_mode()) && get_property_id())();
  }, []);
  
  useEffect(() => { 
    (property?.location?.length > 0) && location_check();
    (!property?.property_id?.length && get_property_id());
  }, [property]);

  return (
    <CssVarsProvider defaultMode="system">
      {getInitColorSchemeScript()}
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
                  disabled={input.disabled}
                  form_label={input.form_label} 
                  key={i}
                  key_name={input.key_name}
                  handle_image={input.handle_image}
                  hint={input.hint}
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
            {
              img?.name?.length && (
              <div>
                <h2>Main Image</h2>
                <div>
                  {img.name}
                </div>
              </div>
              )
            }
            {
              !!Object.values(images)?.length && (
                <div>
                  <h2>Images</h2>
                  {
                    Object.values(images).map((image, i) => (
                      <div key={i}>{image?.name}</div>
                    ))
                  }
                </div>
              )
            }
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
    </CssVarsProvider>
  )
}

export default Form;