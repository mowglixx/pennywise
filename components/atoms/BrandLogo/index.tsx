"use client"

import image__Logo_SVG from '@/app/icon.svg'
import image__Logo_PNG from '@/app/icon.png'
// import image__Logo_ICO from '@/app/icon.ico'
import image__Logo_Apple from '@/app/apple-icon.png'
import Image from 'next/image'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLImageElement> {
    type?: "svg" | "png" | "ico" | "apple",
    size: number
}

const BrandLogo = ({ type, size, ...props }: Props) => {

    let src;
    switch (type) {
        case "png":
            src = image__Logo_PNG
            break;
        // case "ico":
        //     src = image__Logo_ICO
        //     break;
        case "apple":
            src = image__Logo_Apple
            break;
        default:
            src = image__Logo_SVG
            break;
    }

    return (
        <Image
            src={src}
            alt={'Pennywise Logo'}
            width={size}
            height={size}
            {...props}
        />
    )

}

export default BrandLogo