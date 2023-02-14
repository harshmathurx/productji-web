const API = process.env.NEXT_PUBLIC_API_URL;
import queryString from "query-string"


export const getProducts = () => {
    return fetch(`${API}/products`,{
        method: "GET",
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const activateEmail = (token) => {
    
    return fetch(`${API}/email-activate/${token}`,{
        method: "GET"
    })
    .then(response => {
        if(response.error){
            console.log(response.error)
        }
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const search = (params) => {
    const query = queryString.stringify(params)
    return fetch(`${API}/products/search?${query}`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const getProductById = (productId) => {
    return fetch(`${API}/product/find/${productId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const getAllStores = () => {
    return fetch(`${API}/stores`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const getShop = (shopId) => {
    return fetch(`${API}/stores/${shopId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const getProductsByShop = (shopId) => {
    return fetch(`${API}/products/${shopId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
    })
}

export const signup = (user) => {
    // console.log(name,email,password)
    return fetch(`${API}/signup`,{
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err);
    })
}
