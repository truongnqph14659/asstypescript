import Product from "../model/product";
import instance from "./instance";

export const createProduct = (product: Product) => {
    return instance.post('/products', product)
}
export const getCate = ()=>{
    return instance.get('/categorys')
}
export const getCateId = (id:any)=>{
    return instance.get(`/categorys/${id}`)
}
export const getBrand = ()=>{
    return instance.get('/categorybrands')
}
export const getExpand = (id:any)=>{
    return instance.get(`/categorys/${id}?_embed=categorybrands`)
}
export const getExpandItem = (id:any)=>{
    return instance.get(`/categorybrands/${id}?_embed=products`)
}
export const getPro = ()=>{
    return instance.get('/products')
}
export const getProId = (id:any)=>{
    return instance.get(`/products/${id}`)
}
export const deletePro =(id:any)=>{
    return instance.delete(`/products/${id}`)

}
export const updatePro = (id:any,data:any)=>{
    return instance.patch(`/products/${id}`,data)
}
export const search = (keyword:any)=>{
    return instance.get(`/products?name_like=${keyword}`)
}