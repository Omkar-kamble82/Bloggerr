import { db } from "../firebase/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { Blog } from "../types/types";
import toast from "react-hot-toast";

export const UploadBlog = async ({title, content, image, category, profileimg, username}: Blog) => {
    try {
        await addDoc(collection(db, 'blog'), {
            title: title,
            content: content,
            image: image,
            category: category,
            profileImg: profileimg,
            username: username,
        });
    } catch (err) {
        toast.error("Something went wrong")
    }
};

export const GetBlogs = async () => {
    try {
        const data = await getDocs(collection(db, 'blog'));
        const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        }));
        return filteredData
    } catch (err) {
        toast.error("Something went wrong")
    }
};

export const DeleteBlog = async (id: string) => {
    try{
        await deleteDoc(doc(db, 'blog', id))
    } catch(e) {
        toast.error("Something went wrong")
    }
    
}

export const UpdateBlog = async (blog: Blog, id: string) => {
    try {
        await updateDoc(doc(db, 'blog', id), {
            ...blog
        })
    } catch (e) {
        toast.error("Something went wrong")
    }
}

export const GetBlog = async (id: string) => {
    try{
        const data = await getDoc(doc(db, 'blog', id));
        return data.data()
    } catch (e) {
        toast.error("Something went wrong")
    }
    
}

export const GetUserBlogs = async (username: string) => {
    try {
        const data = await getDocs(collection(db, 'blog'));
        const filteredData = data.docs.map((doc) => ({
            ...doc.data() as Blog,
            id: doc.id,
        }));
        const datalist = filteredData.filter((blog) => blog.username === username)
    
        return datalist
    } catch (e) {
        toast.error("Something went wrong")
    }
}

export const GetTagBlogs = async (category: string) => {
    try {
        const data = await getDocs(collection(db, 'blog'));
        const filteredData = data.docs.map((doc) => ({
            ...doc.data() as Blog,
            id: doc.id,
        }));
        const datalist = filteredData.filter((blog) => blog.category === category)
    
        return datalist
    } catch (e) {
        toast.error("Something went wrong")
    }
}