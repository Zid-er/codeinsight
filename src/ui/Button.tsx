import { useRouter } from "next/navigation"

export const Button = (props: { goto?: string; children?:any }) => {
    const { goto, children } = props
    const router = useRouter()
    if (!goto) {
        return (
            <button className="bg-[#40FFAF] rounded px-6 py-2 text-black">
                {children}
            </button>
        )

    } else {
        return (
            <button className="bg-[#40FFAF] rounded px-6 py-2 text-black" onClick={() => router.replace(goto)}>
                {children}
            </button>
        )
    }
}


// red FF4040
// old - bg-blue-600 rounded px-6 py-2 text-white