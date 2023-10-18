import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { GetBlogs } from "../firebase/functions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { BlogDocumentArray } from "../types/types";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Banner = () => {

    const [blogs, setBlogs] = useState<BlogDocumentArray>();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    
    const GetAllBlogs = async () => {
        setLoading(true)
        try {
            const blogslist = await GetBlogs();
            const slicedlist = blogslist?.slice(0, 5)
            setBlogs(slicedlist as BlogDocumentArray);
            setLoading(false)
        } catch (err) {
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        GetAllBlogs();
    }, [])
    

    return (
        <div className="w-full banner h-[70vh] sm:h-[72vh] pt-[4vh] sm:pt-[8vh] lg:h-[80vh] bg-[#edeaea]">
            {loading && <Loading params= {"Blogs"}/>}
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={6000}
                showArrows={false}
                showStatus={false}
            >
                {blogs?.map((blog) => (
                    <div key={blog.id} className="flex pb-[7vh] flex-col lg:flex-row justify-center lg:justify-between gap-6 mx-[10%] items-center h-full w-[80%]">
                        <img className="w-[100px] md:h-[360px] rounded-md object-cover" src={blog.image} alt="blog-pic"/>
                        <div className="">
                            <h1 className="text-[#2d2d2d] font text-[25px] md:text-[35px] lg:text-[40px] font-bold">{blog.title.substring(0, 35)+"..."}</h1>
                            <p className="text-[#2d2d2d] mt-2 sm:mt-4 text-[10px] md:text-[14px] text-justify" dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(blog.content).substring(0, 250)+"...",
                            }}></p>
                            <div onClick={() => navigate(`/blogs/${blog?.username}`)} className="mt-[10px] flex cursor-pointer items-center gap-3">
                                <span className="text-[#2d2d2d] text-[18px] rounded-full font-bold"><img className="h-[40px] rounded-full" src={blog.profileImg} alt="user_img"/></span>
                                <p className="text-[#2d2d2d] font-semibold">{blog.username}</p>
                            </div>
                            <div className="mt-[7px] justify-start items-start text-left" onClick={() => navigate(`/blog/${blog.id}`)}><button className="px-3 text-sm font-semibold bg-[#2d2d2d] border-[#2d2d2d] text-[white] py-1 border-2 rounded-md hover:opacity-90 duration-500 transition-all">Read more</button></div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default Banner