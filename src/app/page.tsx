// Component
import { HomeLayout, DefaultLayout } from "@/_components/layout_section";

export default async function Home() {  
  return (
    <DefaultLayout language="en">
      <HomeLayout language="en"/>
    </DefaultLayout>
  );
}