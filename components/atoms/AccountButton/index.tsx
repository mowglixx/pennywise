"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./styles.module.css"


function AccountButton() {

  const session = useSession();
  return (<button className={styles.accountButton} type="button" title={session.status === "authenticated" && session.data.user ? `Signed in as ${session?.data?.user?.name}, click to sign out` : "Sign In with Google"} onClick={() => {
    return session?.status !== "authenticated" ? signIn("google") : signOut({ redirect: true, redirectTo: '/' })
  }}>
    <div className={styles.accountButton__iconWrapper}>
      {session.status === "unauthenticated" && <strong className={styles.accountButton__iconWrapper__strong}>G</strong>}
      {session?.data?.user?.image && session?.data?.user.name &&
        <Image className={styles.accountButton_iconWrapper__img} alt={`Display Picture for ${session?.data.user.name}`} src={session?.data?.user?.image} width={96} height={96} />}
    </div>
    <div className={styles.accountButton__iconWrapper}>
      {/* {session?.data?.user?.name ? `` : "Sign In with Google"} */}
    </div>
  </button>)
}

export default AccountButton