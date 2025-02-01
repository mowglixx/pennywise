import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. In esse voluptas aliquid doloremque vitae nobis perferendis rerum aspernatur quidem doloribus?</h1>
        <h2>Lorem ipsum dolor sit amet.</h2>
        <h3>Lorem ipsum dolor sit amet.</h3>
        <h4>Lorem ipsum dolor sit amet.</h4>
        <h5>Lorem ipsum dolor sit amet.</h5>
        <small>Lorem ipsum dolor sit amet consectetur.</small>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi porro perspiciatis dolor accusamus, minus possimus quibusdam totam eligendi rerum qui facilis! Ipsa totam maiores ullam deleniti magni officia doloremque dicta facere, voluptas quod, quisquam recusandae officiis nesciunt tenetur repudiandae cupiditate, iure commodi similique? Numquam, laboriosam?</p>
        <Link href="https://google.com">Google</Link>
        </main>
    </div>
  );
}
