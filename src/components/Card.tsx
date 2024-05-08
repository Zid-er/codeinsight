/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import React from 'next'
import { type PostType } from '~/types/PostType'
import Image from 'next/image';
import dbldarrow from '~/assets/dbldarrow.svg'
import dbluarrow from '~/assets/dbluarrow.svg'
import { useEffect, useState } from 'react';
import { useThemeStore } from '~/stores/general';
// DBDBDB
// #f7f7f7
// DBDBDB
// TODO if there is info after ...
const Card = ({
    id,
    title,
    description,
    tag
}: PostType) => {
    const keep_des = description
    const [des, setDes] = useState<string>(description.length > 400 ? description.slice(0, 200) : description)
    const [expanded, setExpanded] = useState<boolean>(false)
    const expand = () => {
        setDes(keep_des)
        setExpanded(true)
    }
    const dexpand = () => {
        setDes(keep_des.slice(0, 200))
        setExpanded(false)
    }
    return (
        <div className="border border-slate-200 dark:bg-primary dark:border-none rounded px-8 py-4 flex flex-col gap-4 dark:text-[#b5b5b5]">
            <div className="flex flex-col gap-2 flex-wrap">
                <p className="text-xs">u/developer</p>
                <p className="text-3xl font-semibold dark:text-white">{title}</p>
                <div className="text-sm flex flex-col flex-wrap gap-1" >
                {
                expanded ? 
                    des.split("\n").map((para: string, i: number) => {
                        return <p key={i}>{para}</p>
                    })
                    : 
                    des.split("\n").map((para: string, i: number) => {
                        return <p key={i}>{para}</p>
                    })
                }
                </div>
            </div>
            <div className="flex flex-row justify-between bg-transparent">
                {
                    expanded ?
                    <button onClick={dexpand}>
                        <Image src={dbluarrow} alt="dbl d arrow" width="10" height="10" className="bg-transparent" />
                    </button>
                    :
                    <button onClick={expand}>
                        <Image src={dbldarrow} alt="dbl d arrow" width="10" height="10" className="bg-transparent" />
                    </button>
                }
                <p className={`border dark:border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent`}>{tag}</p>
            </div>
        </div>
    )
}

export default Card