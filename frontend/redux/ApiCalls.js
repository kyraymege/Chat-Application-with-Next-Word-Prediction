import axios from "axios"
import { loginFailure, loginStart, loginSuccess, logout } from "./authSlice"
import { removeActiveContact } from "./contactSlice"
import { toast } from 'react-toastify'

const BASE = "http://localhost:8800/api/";


export const PF = "http://localhost:8800/images/"

const baseRequest = axios.create({
    baseURL: BASE,
    withCredentials: true,
});

const guessRequest = axios.create({
    baseURL: "http://127.0.0.1:5000/",
    withCredentials: false,
});

// Image Upload
export const uploadImage = async (file) => {
    try {
        const res = await baseRequest.post("/upload", file);
        return res.data;
    } catch (err) {
        toast.error(err);
    }
}

// Image Load
export const loadImage = async (name) => {
    try {
        const res = await baseRequest.get("/upload/image/" + name);
        return res.data;
    } catch (err) {
        toast.error(err);
    }
}

//register
export const register = async (user, router) => {
    try {
        const res = await baseRequest.post("/auth/register", user);
        if (res) {
            toast.success(res?.data?.message);
        }
        setTimeout(() => {
            router.push('/signin')
        }, 1000)
    } catch (err) {
        toast.error(err);
    }
}

//login
export const login = async (dispatch, user, router) => {
    dispatch(loginStart());
    try {
        const res = await baseRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
        if (res.data) {
            toast.success("Logged in");
            setTimeout(() => {
                router.push('/chat')
            }, 1000)
        }
    } catch (err) {
        toast.error();
        dispatch(loginFailure())
    }
}

// Logout
export const logOut = async (dispatch, router) => {
    dispatch(logout());
    dispatch(removeActiveContact());
    toast.success("Logged out");
    setTimeout(() => {
        router.push('/signin')
    }, 1000)
}


export const fetchChats = async (userId) => {
    try {
        const res = await baseRequest.get(`/chat/${userId}`);
        return res.data;
    } catch (err) {
        toast.error(err);
    }
}

export const fetchChatMessages = async (chatId,page,userId) => {
    try {
        const res = await baseRequest.get("/message/"+chatId+"?page="+page+"&userId="+userId);
        return res.data;
    } catch (err) {
        toast.error(err);
    }
}

export const sendMessageToChat = async (content, userId, chatId) => {
    try {
        const res = await baseRequest.post("/message", { content, userId, chatId });
        return res.data;
    } catch (err) {
        toast.error(err);
    }
}

export const fetchAllUsersBySearch = async (query) => {
    try {
        const res = await baseRequest.get(`/user?search=${query}`);
        return res.data;
    } catch (err) {
        toast.error(err);
    }
}

export const accessChat = async (currentUserId, contactId) => {
    try {
        const res = await baseRequest.post("/chat", { currentUserId, contactId });
        return res.data;
    } catch (err) {
        toast.error(err);
    }
}

export const readMessage = async (messageId, userId) => {
    try {
        const res = await baseRequest.put(`/message/read/${messageId}`, { userId });
        return res.data;
    } catch (err) {
        toast.error(err);
    }
}

export const guessWord = async (word, userId) => {
    try {
        const res = await guessRequest.get(`/guessWord?userId=${userId}&word=${word}`);
        return res.data;
    } catch (err) {
        toast.error(err);
    }
}



