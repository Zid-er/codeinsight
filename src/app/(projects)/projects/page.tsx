import axios from "axios";
import Link from "next/link";
import { ProjectType } from "~/types/ProjectType";
import { Button, Nutton } from "~/ui/Button";



export const getProjects = (async () => {
    const res = await axios('http://localhost:3000/api/project/get', {
        method: "GET",
        withCredentials: true,
    })
    if (res.status != 200) {
      throw new Error('Failed to fetch data')
    }
    return res.data
  })

const Projects = async () => {
    const projects = await getProjects()
    console.log("PROJS: ", projects)
    return (
        <div className="flex flex-col min-h-screen dark:text-white md:px-[10rem] py-[2rem]">
            <div className="flex flex-row items-center justify-between">
              <Nutton>All*</Nutton>
                <Button><Link href="/projects/create">Create +</Link></Button>
            </div>
            <div className="flex flex-col gap-2">
                {
                    projects.map((project: ProjectType) => {
                        return (
                            <div className="flex flex-col gap-2" key={project.id}>
                                <Link href={`/projects/${project.name}`}><p className="text-xl font-bold">{project.name}</p></Link>
                                <p className="text-[#888888] text-sm">{project.gist}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default Projects;