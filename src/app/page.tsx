'use client'

import styles from './page.module.css';
import { Tabs, TabList, Tab, TabPanel } from '../components';

export default function Home() {
  return (
    <main className={styles.main}>
      <section id="achievements" aria-labelledby="our-achievements" className={styles.achievementsSection}>
        <h2 id='our-achievements' className={styles.title}>Our achievements</h2>
        <div className={styles.subTitle}>We are always ready to tell you about our success</div>

        <Tabs id='super-cool-tabs' defaultActiveTabId='First' className={styles.tabsContainer}>
          <TabList label='Home widget tabs' activation='manual' className={styles.tabList}>
            <Tab tabId='First' panelId='FirstContent' className={styles.tabLink}>
              <a className={styles.tabLinkContent}>Success stories</a>
            </Tab>
            <Tab tabId='Second' panelId='SecondContent' className={styles.tabLink}>
              <a className={styles.tabLinkContent}>Our team</a>
            </Tab>
            <Tab tabId='Modal' panelId='ModalContent' className={styles.tabLink}>
              <a className={styles.tabLinkContent}>Modal</a>
            </Tab>
          </TabList>
          <TabPanel tabId='First' panelId='FirstContent' className={styles.tabPanel}><div>First content</div></TabPanel>
          <TabPanel tabId='Second' panelId='SecondContent' className={styles.tabPanel}><div>Second content</div></TabPanel>
          <TabPanel tabId='Modal' panelId='ModalContent' className={styles.tabPanel}><div>Modal content</div></TabPanel>
        </Tabs>
      </section>
    </main>
  )
}
