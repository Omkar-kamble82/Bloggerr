import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { GetBlog, DeleteBlog } from "../firebase/functions";
import { useEffect, useState } from "react";
import { BlogId } from "../types/types";
import DOMPurify from "dompurify";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const Blog = () => {

    const { user } = useUser();
    const { id } = useParams();
    const navigate = useNavigate()
    const map1 = new Map();
    map1.set('Art', '#000');

    const [blog, setBlog] = useState<BlogId>()
    const [visiblity, setVisiblity] = useState(false)
    const [loading, setLoading] = useState(false)

    const getblog = async () => {
        setLoading(true)
        try{
            if (typeof id === "string"){
                const blogobj = await GetBlog(id)
                if (blogobj?.username === user?.fullName) {
                    setVisiblity(true)
                }
                setBlog(blogobj as BlogId)
                setLoading(false)
                console.log(map1.get(blog?.category))
            }
        } catch(err) {
            toast.error("Something went wrong")
        }
    }

    const deleteblog = async () => {
        if (visiblity === false){
            toast.error("User Not Authorized to make changes")
            return
        }
        try {
            await DeleteBlog(id as string)
            toast.success("Blog deleted successfully")
            navigate("/home")
        } catch (e) {
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getblog()
    }, [])
    

    return (
        <div>
            <Navbar />
            {loading && <Loading params= {"Blog"}/>}
            <div>
                <div className="w-full h-[65vh] relative">
                    <img className="object-cover w-full h-[65vh]" src={blog?.image} alt="blog_img" />
                    <div className="absolute inset-0 bg-black/40"/>
                </div>
                <div className="my-[40px] mx-[20px]">
                    <div className="flex sm:justify-between items-start sm:items-center mb-[15px] flex-col sm:flex-row">
                        <h1 className="font-bold font text-[60px]">{blog?.title}</h1>
                        {blog?.category === "Art" && <p onClick={() => navigate(`/category/${blog.category}`)} className={`px-3 font-semibold bg-cyan-500 text-[white] py-2 rounded-md hover:opacity-90 duration-500 transition-all gap-1 sm:mr-[30px]`}>{blog?.category}</p>}
                        {blog?.category === "Adventure" && <p onClick={() => navigate(`/category/${blog.category}`)} className={`px-3 font-semibold bg-slate-500 text-[white] py-2 rounded-md hover:opacity-90 duration-500 transition-all gap-1 sm:mr-[30px]`}>{blog?.category}</p>}
                        {blog?.category === "Technology" && <p onClick={() => navigate(`/category/${blog.category}`)} className={`px-3 font-semibold bg-red-400 text-[white] py-2 rounded-md hover:opacity-90 duration-500 transition-all gap-1 sm:mr-[30px]`}>{blog?.category}</p>}
                        {blog?.category === "Science" && <p onClick={() => navigate(`/category/${blog.category}`)} className={`px-3 font-semibold bg-violet-500 text-[white] py-2 rounded-md hover:opacity-90 duration-500 transition-all gap-1 sm:mr-[30px]`}>{blog?.category}</p>}
                        {blog?.category === "Food" && <p onClick={() => navigate(`/category/${blog.category}`)} className={`px-3 font-semibold bg-orange-400 text-[white] py-2 rounded-md hover:opacity-90 duration-500 transition-all gap-1 sm:mr-[30px]`}>{blog?.category}</p>}
                        {blog?.category === "Cinema" && <p onClick={() => navigate(`/category/${blog.category}`)} className={`px-3 font-semibold bg-fuchsia-400 text-[white] py-2 rounded-md hover:opacity-90 duration-500 transition-all gap-1 sm:mr-[30px]`}>{blog?.category}</p>}
                    </div>
                    <div onClick={() => navigate(`/blogs/${blog?.username}`)} className="flex items-center gap-2 sm:gap-3">
                        <span className="text-[#2d2d2d] text-[18px] rounded-full font-bold"><img className="h-[40px] rounded-full" src={blog?.profileImg} alt="user_img"/></span>
                        <p className="text-[#2d2d2d] font-semibold text-[20px]">{blog?.username}</p>
                    </div>
                    {visiblity && <div className="flex items-center gap-4 flex-wrap mt-2">
                        <button onClick={() => navigate(`/blog/update/${id}`)} className="px-3 font-semibold bg-emerald-500 text-[white] py-2 rounded-md hover:opacity-90 duration-500 transition-all flex justify-center items-center gap-1"><img src="/update.svg" alt="update_icon"/>Update</button>
                        <button onClick={() => deleteblog()} className="px-3 font-semibold bg-rose-600 text-[white] py-2 rounded-md hover:opacity-90 duration-500 transition-all flex justify-center items-center gap-1"><img src="/delete.svg" alt="delete_icon"/>Delete</button>
                    </div>}
                    <p className="text-[20px] mt-5" dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blog?.content as string)
                    }}></p>
                </div>
            </div>
        </div>
    )
}

export default Blog