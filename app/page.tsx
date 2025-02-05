"use client"

// import Link from "next/link";
// import Image from "next/image";

// styles
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession()

  return (
    <section aria-label="Home" className={styles.section}>

      <article className={styles.section__article}>
        <h2 className={styles.section_article__contentHeader}>Welcome to Pennywise</h2>
        <p>A budget tracker so simple, even your wallet will breathe a sigh of relief.</p>
        <small>Less stress. More control.</small>
        {status === "unauthenticated" && <button onClick={() => signIn("google")}>Sign Up Now</button>}
      </article>

      <article className={styles.section__features}>
        <h2 className={styles.section_article__contentHeader}>Feature Showcase</h2>
        <ul className={styles.section__features__featuresList}>
          <li className={styles.section__features__featuresListItem}>
            <h3>It has Graphs!</h3>
            <p>Stay on top of your money and never get blindsided by a surprise bill again. Unlike your bank, Pennywise actually tells you what&apos;s coming.
            </p>
            <small>just rememeber check the app...</small>
          </li>
          <li className={styles.section__features__featuresListItem}>
            <h3>Fancy Web App</h3>
            <p>Use it anywhere, on any device. Mobile, desktop—Pennywise doesn&apos;t care, it just works.</p>
          </li>
          <li className={styles.section__features__featuresListItem}>
            <h3>Open Source + Self-Hostabubleble</h3>
            <p>Don&apos;t trust me? Good. You don&apos;t have to. Run it on your own server and keep your data, idk.</p>
          </li>
        </ul>
      </article>

      <article className={styles.section__justification}>
        <h2 className={styles.section_article__contentHeader}>Why?</h2>
        <p>I hit the limits of Google Sheets, and budgeting on my phone felt like medieval torture. Every existing solution was either too complex, abandoned, or locked behind a paywall. IF I&apos;M BAD AT MONEY, WHY DO YOU THINK I CAN AFFORD A BUDGETING APP? So I made Pennywise. It&apos;s free. (Pls donate.)</p>
      </article>

      <article className={styles.section__privacy}>
        <h2 className={styles.section_article__contentHeader}>Your Data, I don&apos;t want it, ew</h2>
        <p>Not only do I not want your data—I actively encourage you to self-host Pennywise. The only thing I store is your Google Email and Display Name, just so I can link your account. That&apos;s it. No tracking, no selling, no &quot;trusted partners&quot;.</p>
      </article>

      <article className={styles.section__donate}>
        <h2 className={styles.section_article__contentHeader}>Support My Work</h2>
        <p>This app is built with love, caffeine, and a concerning amount of Walkers (Lays) Crisps. If you like Pennywise and want to keep me fueled, consider donating.If you do, I&apos;ll even add your name to the contributors&apos; page (coming soon).</p>
        <a href="https://paypal.me/mowglixx" className={styles.donateButton}>Donate Here</a>
        <p>If you don&apos;t want to donate, that&apos;s fine. But don&apos;t come crying to me when I run out of crisps and the app stops getting updates. 😤</p>
      </article>

    </section>
  );
}
