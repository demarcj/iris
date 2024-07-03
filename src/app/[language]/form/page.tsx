// Component
import { DefaultLayout, FormUI } from "@/_components/layout_section";

import { LanguageToggleMap } from "@/_constants/locale";

const Form = ({params}: {params: {language: keyof typeof LanguageToggleMap}}) => {
  const { language } = params;
  return (
    <DefaultLayout language={language}>
      <FormUI language={language} />
    </DefaultLayout>
  )
}

export default Form;