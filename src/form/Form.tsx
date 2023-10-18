import { useState, ChangeEvent } from "react";
import Navbar from "../components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { v4 } from "uuid";
import { imagedata } from "../data/data";
import { useUser } from "@clerk/clerk-react"
import { UploadBlog } from "../firebase/functions";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const { user } = useUser();
    const navigate = useNavigate()

    const [blog, setBlog] = useState({title: "", image: "", category: ""})
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [imagetype, setImagetype] = useState(0)

    const ImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files?.[0];
        setLoading(true)
        setImagetype(0)
        if (image == null) return;
        const imageRef = ref(storage, `BlogImages/${image.name + v4()}`);
            uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setBlog({...blog, image: url});
                setLoading(false)
                console.log(true)
            });
        });
    };

    const Submit =async () => {
        if(blog.category === "" || blog.image === "" || blog.title === "" || content === "") {
            toast.error("Please fill all fields")
            return 
        }
        try {
            await UploadBlog({...blog, content: content, username: user?.fullName, profileimg: user?.imageUrl})
            toast.success("Blog successfully uploaded")
            navigate("/home")
        } catch (e) {
            console.log(e)
            toast.error("Something went wrong")
        }
    }


    return (
        <div>
            <Navbar />
            <div className="my-[50px] w-[90%] mx-[5%] sm:w-[80%] sm:mx-[10%]">
                <form>
                    <p className="text-[35px] sm:text-[60px] font-semibold font">Title: </p>
                    <input onChange={(e) => {setBlog({...blog, title: e.target.value})}} type="text" className="border-[1px] border-[#c9c9c9] w-full p-2 outline-none" placeholder="Exploring the Wonders of Nature...."/>

                    <p className="text-[35px] mt-[15px] sm:mt-[10px] sm:text-[60px] font-semibold font">Blog: </p>
                    <ReactQuill onChange={setContent} className="editor" theme="snow" />

                    <p className="text-[35px] mt-[15px] sm:mt-[10px] sm:text-[60px] font-semibold font">Image Upload: </p>
                    <div className="flex gap-2 flex-wrap mb-[10px]">
                        <p onClick={() => setImagetype(1)} className="px-5 cursor-pointer font-semibold bg-[#2d2d2d] border-[#2d2d2d] text-[white] py-2 border-2 rounded-md hover:opacity-90 duration-500 transition-all">Uplaod a image</p>
                        <p onClick={() => setImagetype(2)} className="px-5 cursor-pointer font-semibold bg-[#2d2d2d] border-[#2d2d2d] text-[white] py-2 border-2 rounded-md hover:opacity-90 duration-500 transition-all">Choose from gallery</p>
                    </div>
                    {imagetype === 1 && <input onChange={(e) => ImageUpload(e)} className="border-[1px] border-[#c9c9c9] w-full p-2 outline-none" type="file"/>}
                    {imagetype === 2 && 
                        <div className="min-h-[100vh] w-full flex items-center justify-center overflow-scroll overflow-x-hidden flex-col fixed top-0 left-0 right-0 bottom-0 backdrop-filter backdrop-blur-lg z-50">
                            <h1 className="text-[35px] sm:text-[60px] font-semibold font mt-[700px] sm:mt-[100px] lg:mt-[250px] mb-[20px]">Our Gallery</h1>
                            <span onClick={() => setImagetype(0)} className="absolute cursor-pointer top-6 right-6 h-[40px] w-[40px] flex justify-center items-center bg-black rounded-full"><img className="h-[30px]" src="/close.svg" alt="close_icon"/></span>
                            <div className="flex justify-center items-center flex-wrap gap-4 mb-[40px]">
                                {imagedata.map((img) => (
                                    <img onClick={() => {setBlog({...blog, image: img.url}); setImagetype(0)}} className="w-[150px] sm:w-[200px] cursor-pointer" key={img.id} src={img.url} alt="gallery_img"/>
                                ))}
                            </div>
                        </div>
                    }
                    {blog.image !== "" && <p className="font-bold text-green-500">Image Uploaded!!</p>}
                    {loading === true && <p className="font-bold text-red-500">Uploading....</p>}

                    <p className="text-[35px] mt-[15px] sm:mt-[10px] sm:text-[60px] font-semibold font">Choose the Category: </p>
                    <div className="flex gap-5 flex-wrap">
                        <span><input onChange={(e) => {setBlog({...blog, category: e.target.value})}} type="radio" name="cat" value={"Adventure"}/><label className="text-[20px] font ml-[3px]">Adventure</label></span>
                        <span><input onChange={(e) => {setBlog({...blog, category: e.target.value})}} type="radio" name="cat" value={"Art"}/><label className="text-[20px] font ml-[3px]">Art</label></span>
                        <span><input onChange={(e) => {setBlog({...blog, category: e.target.value})}} type="radio" name="cat" value={"Technology"}/><label className="text-[20px] font ml-[3px]">Technology</label></span>
                        <span><input onChange={(e) => {setBlog({...blog, category: e.target.value})}} type="radio" name="cat" value={"Science"}/><label className="text-[20px] font ml-[3px]">Science</label></span>     
                        <span><input onChange={(e) => {setBlog({...blog, category: e.target.value})}} type="radio" name="cat" value={"Food"}/><label className="text-[20px] font ml-[3px]">Food</label></span>     
                        <span><input onChange={(e) => {setBlog({...blog, category: e.target.value})}} type="radio" name="cat" value={"Cinema"}/><label className="text-[20px] font ml-[3px]">Cinema</label></span>     
                    </div>               
                </form>
                <button onClick={Submit} className="px-5 font-semibold bg-[#2d2d2d] border-[#2d2d2d] text-[white] py-2 border-2 rounded-md mt-[25px] hover:opacity-90 duration-500 transition-all">Publish</button>
            </div>
        </div>
    )
}

export default Form