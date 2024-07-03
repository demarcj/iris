import { DefaultLayout, LoginUI } from "@/_components/layout_section";
import { LanguageToggleMap } from "@/_constants/locale"

const Login = ({params}: {params: {language: keyof typeof LanguageToggleMap}}) => {
  const { language } = params;
  return (
    <DefaultLayout language={language}>
      <LoginUI language={language}/>
    </DefaultLayout>
  )
}

export default Login;