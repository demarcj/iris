// Component
import { DefaultLayout, FormUI } from "@/_components/layout_section";

import { LanguageType } from "@/_constants/locale";

const Form = ({params}: {params: {language: LanguageType}}) => {
  const { language } = params;
  return (
    <DefaultLayout language={language}>
      <FormUI language={language} />
    </DefaultLayout>
  )
}

export default Form;