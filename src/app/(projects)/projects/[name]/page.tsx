"use client"

import { UploadButton } from "~/components/Uploadthing";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";


interface ProjectResponse {
    
}

const getProject = async (name: string) => {
    try {
        const res = await axios.get<ProjectResponse>("/api/project/get", { params: { name: name }, withCredentials: true })
    //   return res.data.posts
        console.log(res)
        return []
    } catch (error) {
      console.log(error)
      return []
    }
}

const Feed = ({ params }: { params: { name: string }}) => {
    if (params.name.length > 100) {
        return <p>Bad...</p>
    }
    const { data: posts } = useQuery({
        queryKey: ["project"],
        queryFn: () => getProject(params.name),
      })
    return (
        <div className="flex flex-col">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </div>
    );
}
 
export default Feed;