"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./styles.module.css"


function AccountButton() {

  const session = useSession();
  return (<button className={styles.accountButton} type="button" title={session.status === "authenticated" ? "Sign Out" : "Sign In with Google"} onClick={() => {
    return session?.status !== "authenticated" ? signIn("google") : signOut({ redirect: true, redirectTo: '/' })
  }}>
    <div>
      {session.status === "unauthenticated" && <strong>G</strong>}
      {session?.data?.user?.image && session?.data?.user.name &&
        <Image alt={`Display Picture for ${session?.data.user.name}`} src={session?.data?.user?.image} width={96} height={96} />}
    </div>
    <div>
      {session?.data?.user?.name ? `${session?.data.user.name}` : "Sign In with Google"}
    </div>
  </button>)
}

export default AccountButton