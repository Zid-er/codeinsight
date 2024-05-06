



const Create = () => {
    return (
        <form className="flex flex-col justify-center items-center translate-y-[50%] dark:text-[#ffffff]">
            <div className="dark:bg-primary bg-slate-50 p-12 rounded min-w-[50rem]">
                <p className="text-xl font-medium pb-4">Create Insight</p>
                <div className="flex flex-col">
                    <label>Title</label>
                    <input  className="border border-primary outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
                </div>
                <div className="flex flex-col">
                    <label>Description</label>
                    <textarea className="border border-primary outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" ></textarea>
                </div>
                <div className="flex flex-col">
                    <label>Tag</label>
                    <input  className="border border-primary outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
                </div>
                <div className="flex flex-col">
                    <label>Code</label>
                    <input  className="border border-primary outline-none px-2 py-2 rounded dark:border-[#2d2d2d] bg-transparent" />
                </div>

            </div>
        </form>
    )
}

export default Create