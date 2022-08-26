import { getBrand } from './../../../api/product';

const banner_user = {
    async render() {
        const categorys = await getBrand()
        return /*html*/ `
            <div class="banner_user container">
                <div class="nav col-2">
                    <ul>
                        ${
                            categorys.data.map((item:any)=>{
                                return/*html*/`
                                    <li>
                                        <a href="/brands/${item.id}">${item.name}</a>
                                        <i class="fas fa-angle-right"></i>
                                    </li>
                                `
                            }).join('')
                        }
                    </ul>
                </div>
                <div class="images col-10">
                    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/43fd4ce7-0b96-4846-94cb-9bcce96d532b.__CR0,0,970,300_PT0_SX970_V1___.jpg" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="https://png.pngtree.com/template/20220331/ourmid/pngtree-thanksgiving-earth-compact-laptop-banner-image_910162.jpg" class="d-block w-100" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="https://www.evetech.co.za/repository/ProductImages/laptop-banner-rtx-3080-980px-v1.jpg" class="d-block w-100" alt="...">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        `
    }
}


export default banner_user