// Models
import { InputModel } from "@/_models";

// Material
import Textarea from '@mui/joy/Textarea';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';

// Function
import {NumericFormatAdapter} from '@/_function'

// Styles
import { label } from '@/_styles';
import styles from "@/_styles/input.module.css";

export const InputUI: React.FC<InputModel> = ({ 
    class_name,
    form_label, 
    key_name,
    list, 
    min,
    multiple, 
    required, 
    set_data, 
    step, 
    type, 
    value,
  }) => {
    list = list?.length ? list : [];
  return (
    <div className={styles[class_name]}>
      {
        type === `text` ? (
          <FormControl>
            <FormLabel required={required} sx={label}>{form_label}</FormLabel>
            <Input
              id={key_name}
              value={value}
              fullWidth
              onChange={e => set_data(e.target.value, key_name)}
            />
          </FormControl>
        ) : type === `phone` ? (
          <FormControl>
            <FormLabel sx={label} required={required}>Phone Number</FormLabel>
            <Input
              id={key_name}
              type="phone"
              value={value}
              fullWidth
              onChange={e => set_data(e.target.value, key_name)}
              required
            />
          </FormControl>
        ) : type === `readonly` ? (
          <FormControl>
            <FormLabel sx={label}>{form_label}</FormLabel>
            <Input
              id={key_name}
              value={value}
              slotProps={{
                root:{
                  style: {
                    backgroundColor: `gray`,
                    color: `black`,
                    cursor: `not-allowed`,
                  }
                },
                input: {
                  style: {
                    cursor: `not-allowed`,
                  }
                }
              }}
              fullWidth
              readOnly
            />
          </FormControl>
        ) : type === `email` ? (
          <FormControl>
            <FormLabel sx={label} required={required}>{form_label}</FormLabel>
            <Input
              id={key_name}
              type="email"
              value={value}
              fullWidth
              onChange={e => set_data(e.target.value, key_name)}
            />
          </FormControl>
        ) : type === `date` ? (
          <FormControl>
            <FormLabel sx={label} required={required}>{form_label}</FormLabel>
            <Input
              id={key_name}
              value={value}
              type="date"
              fullWidth
              onChange={e => set_data(e.target.value, key_name)}
            />
          </FormControl>
        ) : type === `number` ? (
          <FormControl>
            <FormLabel sx={label} required={required}>{form_label}</FormLabel>
            <Input
              id={key_name}
              type="number"
              value={value}
              slotProps={{ input: { min, step }, }}
              fullWidth
              onChange={(e: any) => set_data(parseInt(e.target.value), key_name)}
            />
          </FormControl>
        ) : type === `textarea` ? (
          <FormControl>
            <FormLabel sx={label} required={required}>{form_label}</FormLabel>
            <Textarea
              id={key_name}
              value={value}
              minRows={3}
              slotProps={{
                textarea: {
                  className: styles.textarea
                }
              }}
              onChange={(e) => set_data(e.target.value, key_name)}
            />
          </FormControl>
        ) : type === `number_format` ? (
          <FormControl>
            <FormLabel sx={label} required={required}>{form_label}</FormLabel>
            <Input
              id="price"
              value={value}
              slotProps={{
                input: {
                  min: 0,
                  step: 100,
                  component: NumericFormatAdapter,
                },
              }}
              fullWidth
              onChange={e => set_data(e.target.value, key_name)}
            />
          </FormControl>
        ) : type === `checkbox` ? (
            <FormControl>
              <Checkbox
                id={key_name}
                label={form_label}
                checked={value}
                slotProps={{
                  root: {
                    style: label
                  },
                }}
                onChange={e => set_data(e.target.checked, key_name)}
              />
            </FormControl>
        ) : type === `select` ? (
          <>
            <FormLabel style={label} htmlFor={key_name} required={required}>{form_label}</FormLabel>
            <Select
              id={key_name}
              value={value}
              onChange={(e: any, data) => set_data((multiple ? structuredClone(data as any[]) : data), key_name)}
              multiple={multiple}
            >
              { list.map((menu, i) => <Option  key={i} value={ menu.toLocaleLowerCase().replaceAll(` `, `_`) }>{ menu }</Option>) }
            </Select>
          </>
        ) : ``
      }
    </div>
  )
}