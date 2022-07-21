class Product {
    name: string;
    originalPrice: number;
    saleOffPrice?: number;
    category?: number;
    feature?: string;
    description?: string;
    shortDescription?: string;
    constructor(
        name: string,
        originalPrice: number,
        category?: number,
        feature?: string,
        description?: string,
        saleOffPrice?:number,
        shortDescription?: string
    ) {
        this.name = name;
        this.originalPrice = originalPrice;
        this.saleOffPrice = saleOffPrice;
        this.category = category;
        this.feature = feature;
        this.description = description;
        this.shortDescription = shortDescription;
    }
}

export default Product