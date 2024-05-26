import { DefaultLayout, MessageUI } from "@/_components/layout_section";

import styles from '@/_styles/message.module.css';

const Message = () => (
  <DefaultLayout language="en">
    <main className={styles.main}>
      <section className={styles.section}>
        <MessageUI />
      </section>
    </main>
  </DefaultLayout>
)

export default Message;