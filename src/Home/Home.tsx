// import { UserButton, useUser, useClerk } from "@clerk/clerk-react"
// import { ChangeEvent, useState } from "react";
// import { UploadBlog, GetBlogs, DeleteBlog, GetBlog, UpdateBlog } from "../firebase/functions";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../firebase/firebase";
// import { v4 } from "uuid";
// import { Blog, BlogId, BlogDocumentArray } from "../types/types";

import Navbar from "../components/Navbar";
import Banner from "./Banner";
import Homeblogs from "./Homeblogs";
// const Home = () => {
//     const { user } = useUser();

//     // console.log(user?.primaryEmailAddress?.emailAddress)
//     // console.log(user?.fullName)

//     const [title, setTitle] = useState("")
//     const [content, setContent] = useState("")
//     const [image, setImage] = useState("")
//     const [tag, setTag] = useState("")

//     const [blogobj, setBlogobj] = useState<Blog>({title: "", content: "", image: "", tag: ""})
//     const [update, setUpdate] = useState(false)
//     const [id, setId] = useState("")
//     const [blogs, setBlogs] = useState<BlogDocumentArray>()

//     const ImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
//         const image = e.target.files?.[0];
//         if (image == null) return;
//         const imageRef = ref(storage, `BlogImages/${image.name + v4()}`);
//             uploadBytes(imageRef, image).then((snapshot) => {
//             getDownloadURL(snapshot.ref).then((url) => {
//                 setImage(url);
//             });
//         });
//     };

//     const Uploaddoc = async () => {
//         const BlogObject =  {title, content, image, tag}
//         await UploadBlog(BlogObject)
//     };

//     const getblogs = async () => {
//         const blogsList = await GetBlogs()
//         setBlogs(blogsList as BlogDocumentArray)
//     }

//     const deleteblog = async (id: string) => {
//         await DeleteBlog(id)
//         const blogsList = await GetBlogs()
//         setBlogs(blogsList as BlogDocumentArray)
//     }

//     const updateblog = async (id: string) => {
//         const updateblog = await GetBlog(id)
//         setBlogobj({title: updateblog?.title, content: updateblog?.content, tag: updateblog?.tag, image: updateblog?.image})
//         setUpdate(true)
//         setId(id)
//     }

//     const updatesubmit = async () => {
//         const blogid = {id, ...blogobj}
//         await UpdateBlog(blogid)
//         setUpdate(false)
//         const blogsList = await GetBlogs()
//         if(blogsList && blogsList?.length > 0) {
//             setBlogs(blogsList as BlogDocumentArray)
//         }
//     }
//     const { signOut } = useClerk();

//     return (
//         <div className="top-0 left-0">
//             <UserButton />
//             <button onClick={() => signOut()}>sign out</button>
//             <h1 className="text-4xl font-semibold"> Welcome {user?.fullName}</h1>
//             <p>Title</p>
//             <input onChange={(e) => {setTitle(e.target.value)}} className="border-2" type="text"/>
//             <p>Content</p>
//             <textarea onChange={(e) => {setContent(e.target.value)}} className="border-2" />
//             <p>Tags</p>
//             <select className="border-2" onChange={(e) => {setTag(e.target.value)}}>
//                 <option value={"1"}>1</option>
//                 <option value={"2"}>2</option>
//                 <option value={"3"}>3</option>
//                 <option value={"4"}>4</option>
//             </select>
//             <p>Image</p>
//             <input type="file" onChange={(e) => ImageUpload(e)}/>
//             {/* <input onChange={(e) => {setImage(e.target.value)}} className="border-2" type="text" /> */}
//             <button onClick={Uploaddoc}>Submit</button><br/>
//             <button onClick={getblogs}>GetData</button>
//             <br/>
//             <br/>
//             <br/>
//             {blogs?.map((blog: BlogId) => {
//                 return (
//                     <div key={blog.title} className="flex justify-center items-center gap-4">
//                         <h1>{blog.title}</h1>
//                         <button className="text-[red]" onClick={() => deleteblog(blog.id)}>Delete</button>
//                         <button className="text-[#46c546]" onClick={() => updateblog(blog.id)}>Update</button>
//                     </div>
//                 )
//             })}
//             {update && 
//                 <div>
//                     <p>Title</p>
//                     <input value={blogobj.title} onChange={(e) => {setBlogobj({...blogobj, title:e.target.value})}} className="border-2" type="text"/>
//                     <p>Content</p>
//                     <textarea value={blogobj.content} onChange={(e) => {setBlogobj({...blogobj, content:e.target.value})}} className="border-2" />
//                     <p>Tags</p>
//                     <select value={blogobj.tag} className="border-2" onChange={(e) => {setBlogobj({...blogobj, tag:e.target.value})}}>
//                         <option value={"1"}>1</option>
//                         <option value={"2"}>2</option>
//                         <option value={"3"}>3</option>
//                         <option value={"4"}>4</option>
//                     </select>
//                     <button onClick={updatesubmit}>Update</button>

//                 </div>
//             }
//         </div>
//     )
// }

// export default Home 


const Home = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <Homeblogs />
        </div>
    )
}

export default Home