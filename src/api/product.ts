import Product from "../model/product";
import instance from "./instance";

export const createProduct = (product: Product) => {
    return instance.post('/products', product)
}
export const getCate = ()=>{
    return instance.get('/categorys')
}
export const getExpand = (id:any)=>{
    return instance.get(`/categorys/${id}?_embed=categorybrands`)
}