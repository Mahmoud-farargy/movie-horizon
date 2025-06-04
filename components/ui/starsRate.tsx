"use client"
import { useMemo } from "react"
import NextImage from "next/image";

export default function StarsRate({value, className = "" }: {value: number, className: string}) {
  const clipPath = useMemo(() => `inset(0 ${(10 - value) * 10}% 0 0)`, [value]);
  return (
    <div className={`relative aspect-[11/2] ${className} hue-rotate-[320deg]`}>
        <NextImage src="/assets/images/stars.webp" width="80" height="13" className="absolute inset-0" aria-hidden="true" alt="" />
        <NextImage src="/assets/images/stars-filled.webp" width="80" height="13" className="absolute inset-0" aria-hidden="true" style={{clipPath: clipPath}} alt="" />
    </div>
  )
}
