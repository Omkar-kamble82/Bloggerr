import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { GetUserBlogs } from "../firebase/functions";
import { useParams } from "react-router-dom";
import { BlogDocumentArray } from "../types/types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import { useUser } from "@clerk/clerk-react";
import Loading from "../components/Loading";

const Myblogs = () => {

    const { username } = useParams()
    const { user } = useUser();
    const [blogs, setBlogs] = useState<BlogDocumentArray>();
    const [name, setName] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const blog = async() => {
        setLoading(true)
        try {
            if (username){
                const bloglist = await GetUserBlogs(username)
                setBlogs(bloglist as unknown as BlogDocumentArray);
            }
            if (username === user?.fullName) setName(true)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            toast.error("Something went wrong")
            navigate("/home")
        }
    }

    useEffect(() => {
        blog() 
    }, [])
    
    return (
        <div>
            {loading && <Loading params= {"Blogs"}/>}
            <Navbar />
            {blogs && blogs?.length > 0 ? (
                <>
                    <h1 className="text-center mb-[20px] font-bold text-[60px] font">{name ? "My Blogs" : `${username}'s Blogs`}</h1>
                    <div className="flex items-center justify-center flex-wrap gap-6">
                        {blogs?.map((blog) => (
                            <div key={blog.id} className="w-[90%] sm:w-[45%] lg:w-[37%] xl:w-[30%] lg:h-[550px] xl:h-[570px] border-2 rounded-xl shadow-2xl">
                                <img className="h-[250px] w-full object-cover rounded-t-xl" src={blog.image} alt="blog_img" />
                                <h1 className="text-[#2d2d2d] font text-[25px] lg:text-[35px] font-bold p-2">{blog.title.substring(0, 20)+"..."}</h1>
                                <p className="text-[#2d2d2d] text-[10px] md:text-[15px] text-justify p-2" dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(blog.content).substring(0, 250)+"...",
                                }}></p>
                                <div onClick={() => navigate(`/blogs/${blog?.username}`)} className="flex cursor-pointer items-center gap-3 p-2">
                                    <span className="text-[#2d2d2d] text-[18px] rounded-full font-bold"><img className="h-[40px] rounded-full" src={blog.profileImg} alt="user_img"/></span>
                                    <p className="text-[#2d2d2d] font-semibold">{blog.username}</p>
                                </div>
                                <div className="mb-[12px] ml-[10px]" onClick={() => navigate(`/blog/${blog.id}`)}><button className="px-3 text-sm font-semibold bg-[#2d2d2d] border-[#2d2d2d] text-[white] py-1 border-2 rounded-md hover:opacity-90 duration-500 transition-all">Read more</button></div>
                            </div>
                        ))}
                    </div>
                </>
            ): 
                <div className="flex justify-center mt-[30px] items-center flex-col">
                    <h1 className="text-center mb-[20px] text-[30px]"> No Blog Found....</h1>
                    <button className="px-5 font-semibold bg-[#2d2d2d] border-[#2d2d2d] text-[white] py-2 border-2 rounded-md mt-[5px] hover:opacity-90 duration-500 transition-all" onClick={() => navigate("/home")}>Return home</button>
                </div>
            }
        </div>
    )
}

export default Myblogs