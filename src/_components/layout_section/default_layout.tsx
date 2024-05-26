import { NavMenu } from "@/_components/layout_section/nav";
import { Footer } from "@/_components/layout_section/footer";

import { LanguageType } from '@/_constants/locale';

export const DefaultLayout = ({
  children,
  language
}: Readonly<{
  children: React.ReactNode;
  language: LanguageType
}>) => {
  return (
    <>
      <NavMenu language={language} />
        {children}
      <Footer language={language} />
    </>
  )
}