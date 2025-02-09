
import {defineQuery} from "next-sanity"

// export const allproducts = groq`*[_type == "product"]`;
// export const four =`*[_type == "product"][0..3]`;
export const allproducts = defineQuery(`
    *[_type == "product"]{
     _id,
    name,
    price,
    image
    }`)

    export const fourproducts = defineQuery(`
        *[_type == "product"][0..3]{
         _id,
        name,
        price,
        image
        }`)