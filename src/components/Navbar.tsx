import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "~/assets/logo2.svg";
import { Button } from "~/ui/Button";
   

const Navbar = () => {
    const [user, setUser] = useState<boolean | { id: string, username: string, iat: number, exp: number }>(false)
    useEffect(() => {
        const ca = async () => {
            const auth = await axios.get("/api/isauth", { withCredentials: true })
            console.log(auth)
            if (auth && auth.data) {
                const authy = auth.data.isauth
                if (authy) {
                    setUser(auth.data.user)
                }
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
                    <a href="/login">Login</a>
                    <Button goto="/signin">Sign Up</Button>
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
            <Button goto="/create">Create +</Button>
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