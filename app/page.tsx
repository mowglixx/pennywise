// import Link from "next/link";
// import Image from "next/image";

// styles
import styles from "./page.module.css";

const talkingPoints = [
  {
    __key: "tp1",
    children: <p>Talking Point 4</p>
  },
  {
    __key: "tp2",
    children: <p>Talking Point 4</p>
  },
  {
    __key: "tp3",
    children: <p>Talking Point 4</p>
  },
  {
    __key: "tp4",
    children: <p>Talking Point 4</p>
  },
]

const steps = [
  {
    __key: "step1",
    header: "Step X"
  },
  {
    __key: "step2",
    header: "Step X"
  },
  {
    __key: "step3",
    header: "Step X"
  },
]

export default function Home() {
  return (
    <section aria-label="Home" className={styles.section}>

      <article className={styles.section__article}>
        {/* <Image className={styles.section_article__image} /> */}

        <h2 className={styles.section_article__contentHeader}>Terrifyingly Simple Finance</h2>

        <div className={styles.section_article__contentBody}>
          <ul>

            {talkingPoints.map(({ __key, children, ...props }) => {
              return <li key={__key} {...props}>{children}</li>
            })}
          </ul>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum autem, error ab vel iure illum facilis asperiores maxime, quam minima doloremque animi. Similique dolore reiciendis expedita, odit sint praesentium qui.</p>
          <p>Sequi similique architecto dignissimos excepturi eius sunt, consectetur facere harum fugiat modi voluptas optio quibusdam eum cumque recusandae quam distinctio nesciunt voluptate, neque voluptatibus molestiae quas assumenda tenetur eos. Aut?</p>
          <p>Ipsa consequuntur fugit sapiente molestiae. Numquam iste aliquam iusto nulla, iure dolores unde similique pariatur consequatur esse fugit vel nostrum quae debitis obcaecati eum est enim laboriosam eveniet excepturi architecto.</p>

        </div>
      </article>
      <section>

        {steps.map(({ __key }) => {
          return (
            <article key={__key} className={styles.section__article}>
              {/* <Image className={styles.section_article__image} /> */}

              <h2 className={styles.section_article__contentHeader}>{ }</h2>

              <div className={styles.section_article__contentBody}>

                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum autem, error ab vel iure illum facilis asperiores maxime, quam minima doloremque animi. Similique dolore reiciendis expedita, odit sint praesentium qui.</p>
                <p>Sequi similique architecto dignissimos excepturi eius sunt, consectetur facere harum fugiat modi voluptas optio quibusdam eum cumque recusandae quam distinctio nesciunt voluptate, neque voluptatibus molestiae quas assumenda tenetur eos. Aut?</p>
                <p>Ipsa consequuntur fugit sapiente molestiae. Numquam iste aliquam iusto nulla, iure dolores unde similique pariatur consequatur esse fugit vel nostrum quae debitis obcaecati eum est enim laboriosam eveniet excepturi architecto.</p>

              </div>
            </article>
          )
        })
        }
      </section>
    </section>
  );
}
