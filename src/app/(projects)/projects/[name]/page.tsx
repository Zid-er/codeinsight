"use client"

import { UploadButton } from "~/components/Uploadthing";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { ORIGIN_URL } from "~/consts";
import { Button, Nutton } from "~/ui/Button";
import { ProjectType } from "~/types/ProjectType";
import { useState } from "react";
import { PostType } from "~/types/PostType";
import Card from "~/components/Card";
import Image from "next/image";
import Link from "next/link";

const getProject = async (name: string) => {
    try {
        const res = await axios<ProjectType>(`${ORIGIN_URL}/api/project/${name}`, { method: "GET",  withCredentials: true })
        console.log("RES ----------------------------------------: ", res)
        return res.data
    } catch (err) {
      console.log("ERR IN GET PROJECT: ", err)
    //   return {}
    }
}

const Feed = ({ params }: { params: { name: string }}) => {
    if (params.name.length > 100) {
        return <p>Bad...</p>
    }
    console.log("PARAMS: ", params)
    const { data: project_info, refetch } = useQuery({
        queryKey: ["project_info"],
        queryFn: () => getProject(params.name),
        // staleTime: 2000
    })
    console.log("PROJECTS", project_info)

    const [createMode, setCreateMode] = useState<boolean>(false)
    console.log("RM: ", createMode)
    if (!project_info) return;
    return (
        <div className="flex flex-col p-4 gap-2">
            <div className="flex flex-row justify-between">

                <Nutton fn={() => setCreateMode((flip) => !flip)}>{ createMode ? "Cancel" : "Create +" }</Nutton>
            </div>
            { createMode && <MakePost projectId={project_info.id} refetch={refetch} /> }
            <div className="flex flex-col gap-4 md:px-[10rem]">
                {
                    !createMode &&
                    project_info && project_info.posts.map((post: PostType) => {
                        return (
                            <div className="" key={post.id}>
                                {
                                    post.imgUrls ?
                                    <div className="flex flex-row gap-4 justify-between items-center">
                                        <Card 
                                            id={post.id}
                                            title={post.title}
                                            description={post.description}
                                            tag={post.tag}
                                        />
                                        <div className="flex flex-col items-end justify-end">

                                        {
                                            post.imgUrls.map((img) => {
                                                return <Image src={img.url} alt="post image" width={500} height={200} />
                                            })
                                        }
                                        </div>
                                    </div>
                                    :
                                    <Card 
                                        id={post.id}
                                        title={post.title}
                                        description={post.description}
                                        tag={post.tag}
                                        key={post.id}
                                    />
                                }
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
}

const MakePost = ({
    projectId,
    refetch
}: { projectId: number, refetch: any }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    if (projectId == null || projectId == undefined) return <></>
    const create = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log("Hi: ", title, description, tag, imgUrl)
        if (!title || !description || !tag) throw Error("Empty fields!")
        if (imgUrl) {
            const res = await axios(`/api/post/create`, {
                method: "POST",
                withCredentials: true,
                data: {
                    title: title,
                    description: description,
                    tag: tag,
                    imgUrl: imgUrl,
                    projectId: projectId
                },
            });
            console.log("post create for project:", res)
            refetch()
            return
        }
        const res = await axios(`/api/post/create`, {
            method: "POST",
            withCredentials: true,
            data: {
                title: title,
                description: description,
                tag: tag,
                projectId: projectId
            },
        });
        console.log("post create for project:", res)
        refetch()
    };
    return (
        <form className="flex flex-col justify-center items-center translate-y-[5%] dark:text-[#ffffff]" onSubmit={create}>
            <div className="dark:bg-primary bg-slate-50 p-12 rounded md:w-[50%] gap-4 flex flex-col">
                <p className="text-xl font-medium pb-4">Create Post</p>
                <div className="flex flex-col">
                    <label className="dark:text-[#b5b5b5] text-sm">Title</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)}  className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
                </div>
                <div className="flex flex-col">
                    <label className="dark:text-[#b5b5b5] text-sm">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent min-h-[20rem]" ></textarea>
                </div>
                <div className="flex flex-col">
                    <label className="dark:text-[#b5b5b5] text-sm">Tag</label>
                    <input value={tag} onChange={(e) => setTag(e.target.value)}  className="border border-[#858585] outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
                </div>
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        if (res[0]) {
                            setImgUrl(res[0].url)
                        }
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                    appearance={{
                        button: {
                            background: "#40FFAF",
                            color: "#000000"
                        }
                    }}
                />
                <Button>Save</Button>
            </div>
        </form>
    )
}
 
export default Feed;


// [
//     {
//         "name": "user.png",
//         "size": 619,
//         "key": "2bd1a4a6-3ac1-402b-be84-d4ea3e48038b-2558r.png",
//         "serverData": {
//             "uploadedBy": "fakeId"
//         },
//         "url": "https://utfs.io/f/2bd1a4a6-3ac1-402b-be84-d4ea3e48038b-2558r.png",
//         "customId": null,
//         "type": "image/png"
//     }
// ]