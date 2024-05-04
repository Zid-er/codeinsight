/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'next'
import { type PostT } from '~/types/PostT'
import Image from 'next/image';
import dbldarrow from '~/assets/dbldarrow.svg'
import dbluarrow from '~/assets/dbluarrow.svg'
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "~/components/ui/card"

// DBDBDB
// TODO if there is info after ...
const PreviewCard = ({
    id,
    title,
    description,
    tag
}: PostT) => {
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
        <Card className='border-2 border-zinc-900'>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>u/developer</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{expanded ? des : des}</p>
            </CardContent>
            <CardFooter className='flex justify-between'>
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
            </div>
                <p className="border border-[#282828] rounded-lg text-sm px-2 py-1 bg-transparent">{tag}</p>
            </CardFooter>
        </Card>
    )
}

export default PreviewCard