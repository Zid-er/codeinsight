"use client"

import { UploadButton } from "~/components/Uploadthing";

const Feed = () => {
    return (
        <div className="flex flex-col">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
                }}
            />
        </div>
    );
}
 
export default Feed;