"use client"

import Image from "next/image";
import { signIn, signOut, useSession, } from "next-auth/react"
import { Session } from "next-auth";
import Link from "next/link";

const Header = () => {
  const { data, status } = useSession()
  console.log(data)
  console.log(status)
  return (
    <>
<Link href={'/'}>
      <Image
        src={'/icon.svg'}
        alt="Pennywise Logo"
        width={46}
        height={46}
        />
        </Link>
        <Link href={'/magic'}>Magic Page (testing)</Link>
    
      <AccountButton data={data} status={status}/>
    </>)
};


export default Header

function AccountButton({data, status}:{
  data: Session|null,
  status: "authenticated" | "loading" | "unauthenticated"
}) {
  return <>

    <button type="button" onClick={() => {
      return status !== "authenticated" ? signIn("google") : signOut({redirect: true, redirectTo: '/'})
    }}>
      <div style={{
        display: "flex"
      }}>
        <div>
          {data?.user?.image && data?.user.name ?
            <Image alt={`Display Picture for ${data.user.name}`} src={data?.user?.image} width={96} height={96} /> :
            <strong>G</strong>}
        </div>
        <div>
          {data?.user?.name ? `Sign Out as ${data.user.name}` : "Sign In with Google"}

        </div>
      </div>
    </button>
  </>;
}
