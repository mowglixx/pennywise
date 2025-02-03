"use client"

import { SessionContextValue, signIn, signOut } from "next-auth/react";
import Image from "next/image";

interface Props {
  session: SessionContextValue
}

function AccountButton({ session }: Props) {

  return <>
    <button type="button" onClick={() => {
      return session?.status !== "authenticated" ? signIn("google") : signOut({ redirect: true, redirectTo: '/' })
    }}>
      <div style={{ display: "flex" }}>
        <div>
          {session?.data?.user?.image && session?.data?.user.name ?
            <Image alt={`Display Picture for ${session?.data.user.name}`} src={session?.data?.user?.image} width={96} height={96} /> :
            <strong>G</strong>}
        </div>
        <div>
          {session?.data?.user?.name ? `${session?.data.user.name}` : "Sign In with Google"}
        </div>
      </div>
    </button>
  </>;
}

export default AccountButton