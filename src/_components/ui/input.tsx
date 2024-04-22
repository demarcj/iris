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
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import { styled } from '@mui/joy';

// Function
import { NumericMoneyFormatAdapter, NumericSizeFormatAdapter } from '@/_function'

// Styles
import { label, checkbox } from '@/_styles';
import global from "@/_styles/global.module.css";
import styles from "@/_styles/input.module.css";

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

export const InputUI: React.FC<InputModel> = ({ 
    class_name,
    disabled,
    form_label, 
    key_name,
    handle_image,
    list, 
    min,
    multiple, 
    required, 
    set_data, 
    step, 
    type, 
    value,
  }) => {

    const disabled_class = {
      backgroundColor: `gray`,
      color: `black`,
      cursor: `not-allowed`
    };
    const empty_class = {};
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
                root:{ style: disabled_class },
                input: {
                  style: { cursor: `not-allowed` }
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
              slotProps={{ input: { min, step } }}
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
        ) : type === `money_format` ? (
          <FormControl>
            <FormLabel sx={label} required={required}>{form_label}</FormLabel>
            <Input
              id="price"
              value={value}
              slotProps={{
                input: {
                  component: NumericMoneyFormatAdapter
                },
              }}
              fullWidth
              onChange={e => set_data(e.target.value, key_name)}
            />
          </FormControl>
        ) : type === `size_format` ? (
          <FormControl>
            <FormLabel sx={label} required={required}>{form_label}</FormLabel>
            <Input
              id="price"
              value={value}
              slotProps={{
                input: {
                  component: NumericSizeFormatAdapter
                },
              }}
              fullWidth
              onChange={e => set_data(e.target.value, key_name)}
            />
          </FormControl>
        ) : type === `checkbox` ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              backgroundColor: `transparent`,
              width: `100%`,
              marginBlockEnd: `15px`,
              '& > div': { p: 2, borderRadius: 'md', display: 'flex' },
            }}
          >
            <Sheet variant="outlined">
              <Checkbox
                id={key_name}
                label={form_label}
                checked={value}
                overlay
                onChange={e => set_data(e.target.checked, key_name)}
              />
            </Sheet>
          </Box>
        ) : type === `select` ? (
          <>
            <FormLabel style={label} htmlFor={key_name} required={required}>{form_label}</FormLabel>
            <Select
              id={key_name}
              value={value}
              disabled={disabled}
              slotProps={{
                root: {
                  sx: disabled ? {...disabled_class, cursor: `not-allowed`} : empty_class
                }
              }}
              onChange={(e: any, data) => set_data((multiple ? structuredClone(data as any[]) : data), key_name)}
              multiple={multiple}
            >
              { list.map((menu, i) => <Option  key={i} value={ menu.toLocaleLowerCase().replaceAll(` `, `_`) }>{ menu }</Option>) }
            </Select>
          </>
        ) : type === `image` ? (
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
              {form_label}
              <VisuallyHiddenInput 
                type="file"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={e => handle_image(e, multiple)}
                multiple={multiple}
              />
            </Button>
          </div>
        ) : ``
      }
    </div>
  )
}