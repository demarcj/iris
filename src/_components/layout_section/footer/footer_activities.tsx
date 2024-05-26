'use client';

// Constants
import { LanguageType, LanguageList, LanguageToggleMap } from '@/_constants/locale';

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from 'next/navigation';

// Material
// import Button from '@mui/joy/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export const FooterActivities = ({language}: {language: LanguageType}) => {
  // const [is_login, set_is_login] = useState(false);
  // const [open, set_open] = useState(false);
  // const [ready, set_ready] = useState(false);
  // const logged_off = () => set_open(true);

  // const on_close = () => set_open(false);

  // const confirmed_log_off = () => {
  //   localStorage.removeItem(`user`);
  //   location.href = `/{language}/message?type=logged_off`;
  //   set_open(false);
  // }

  const router = useRouter();

  const handle_language = (locale: LanguageType | null) => {
    const tidy = locale === null ? `en` : locale;
    const pathname = location.pathname;
    if([`/`, `/th`].includes(pathname)){
      router.push(`${Object.is(pathname, `/`) ? `/th` : `/`}`)
    } else {
      router.push(`${pathname.replace(language, tidy)}${location.search}`);
    }
  }

  return (
    <>
      <Select 
        value={language}
        startDecorator={<FontAwesomeIcon icon={faLanguage}></FontAwesomeIcon>}
        onChange={(e, data) => handle_language(data)}
      >
        { 
          LanguageList.map(language => (
            <Option key={language} value={language}>{LanguageToggleMap[language].cap} - {LanguageToggleMap[language].translate}</Option>
          )) 
        }
      </Select>
        {/* {
          is_login && (
            <Button
              sx={{mt: `5px`}}
              color="warning"
              onClick={logged_off} 
            >
              Log Off
            </Button>
          )
          } */}
      {/* <Dialog
        open={open}
        onClose={on_close}
      >
        <div className={global.dialog}>
          <div className={global.dialog_smessage}>
            Are you sure you want to log off?
          </div>
          <DialogActions>
            <Button 
              color="danger"
              variant="soft"
              onClick={confirmed_log_off}
            >
              Yes, I want to log off
            </Button>
            <Button onClick={on_close}> Close </Button>
          </DialogActions>
        </div>
      </Dialog>  */}
    </>
  )
}