import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "~/assets/logo2.svg";
import { userStore } from "~/stores/general";
import { Button } from "~/ui/Button";

const Navbar = () => {
    const user = userStore((state) => state.user)
    const updateUser = userStore((state) => state.updateUser)
    // const [user, setUser] = useState<boolean | { id: string, username: string, iat: number, exp: number }>(false)
    useEffect(() => {
        const ca = async () => {
            try {
                const auth = await axios.get("/api/isauth", { withCredentials: true })
                console.log("[authed navbar]")
                if (auth && auth.data) {
                    const authy = auth.data.isauth
                    if (authy) {
                        // setUser(auth.data.user)
                        updateUser(auth.data.user.payload)
                    }
                }
                
            } catch(err) {
                console.log("[unauth navbar]")
            }
        }
        ca()
    }, [])
    if (!user) {
        return (
            <div className="flex flex-row items-center border-b dark:border-[#1c1c1c] border-[##e5e5e5] py-2 px-8 dark:text-[#b3b3b3] justify-between">
                <Link className="flex flex-row gap-2 justify-center items-center" href="/">
                    <Image src={logo} alt="logo" className="w-8 h-8" />
                    <p className="font-bold text-xs dark:text-[#b3b3b3]">CodeInsight</p>
                </Link>
                <div className="flex flex-row gap-4 items-center justify-center">
                    <Link href="/login">Login</Link>
                    <Link href="/signup">
                        <Button>Sign Up</Button>
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="flex flex-row items-center border-b dark:border-[#1c1c1c] border-[##e5e5e5] py-2 px-8 dark:text-[#b3b3b3] justify-between">
            <Link className="flex flex-row gap-2 justify-center items-center" href="/">
                <Image src={logo} alt="logo" className="w-8 h-8" />
                <p className="font-bold text-xs dark:text-[#b3b3b3]">CodeInsight</p>
            </Link>
            <div className="flex flex-row gap-2 justify-center items-center">
                <a href="/projects">Projects</a>
            </div>
        </div>
    );
}

export default Navbar;





// export const getServerSideProps = (async () => {
//     // Fetch data from external API
//     const res = await axios.get('/api/post/get')
//     console.log("POSTS GET: ", res)
//     const props = {}
//     return { props: { props } }
//   })
// {
//     props
// }: InferGetServerSidePropsType<typeof getServerSideProps>
