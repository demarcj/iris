import { DefaultLayout, LoginUI } from "@/_components/layout_section";
import { LanguageType } from "@/_constants/locale"

const Login = ({params}: {params: {language: LanguageType}}) => {
  const { language } = params;
  return (
    <DefaultLayout language={language}>
      <LoginUI language={language}/>
    </DefaultLayout>
  )
}

export default Login;