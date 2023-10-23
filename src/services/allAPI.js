import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

// Create
export const uploadContact = async (reqBody)=>{
    return await commonAPI("POST",`${serverURL}/contacts`,reqBody)
}

// Read all Contact
export const getAllContacts = async ()=>{
    return await commonAPI("GET",`${serverURL}/contacts`,"")
}

// Delete a Contact
export const deleteAContact = async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/contacts/${id}`,{})
}

// Update a Contact
export const updateContact = async (id,body)=>{
    return await commonAPI("PUT",`${serverURL}/contacts/${id}`,body)
}

// get a Contact from json server
export const getAContacts = async (id)=>{
    return await commonAPI("GET",`${serverURL}/contacts/${id}`,"")
}