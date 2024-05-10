export const Button = (props: { children?:any, fn?:any }) => {
    const { children, fn } = props
        return (
            <button onClick={fn} className="bg-[#40FFAF] rounded px-6 py-2 text-black">
                {children}
            </button>
        )
}


export const Nutton = (props: { children?:any, fn?:any }) => {
    const { children, fn } = props
        return (
            <button onClick={fn} className="px-6 py-2 dark:bg-primary rounded bg-slate-50 dark:text-white">
                {children}
            </button>
        )
}


// return (
//     <button className="bg-[#40FFAF] rounded px-6 py-2 text-black" onClick={() => router.replace(goto)}>
//         {children}
//     </button>
// )
    

// red FF4040
// old - bg-blue-600 rounded px-6 py-2 text-white