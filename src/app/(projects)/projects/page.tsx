"use client"

import { Button } from "~/ui/Button";

const Projects = () => {
    return (
        <div className="flex flex-col min-h-screen dark:text-white">
            <div className="flex flex-row items-center justify-between">
                <Button goto="/projects/create">Create +</Button>
            </div>
            <h1>Hello 1</h1>
            <h1>Hello 2</h1>
            <h1>Hello 3</h1>
        </div>
    );
}
 
export default Projects;