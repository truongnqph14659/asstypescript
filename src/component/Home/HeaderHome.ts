const HeaderHome = {
    render: () => {
        let userAcc
        if (JSON.parse(localStorage.getItem('user') || "false")){
            const name = JSON.parse(localStorage.getItem('user')|| "false").name;
            userAcc = `
            <span>${name}</span>
            <i class="fa-solid cursor-pointer lognout fa-arrow-right-from-bracket"></i>
          ` 
        }else{
            userAcc=`
             <a href="/signin">Đăng nhập</a><span>/</span><a href="/signup">Đăng ký</a>
            `
        }
        return /* html */ `
            <div class="flex bg-[#d70018] justify-around items-center">
                <img class="w-[64px] p-2" src="https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg" alt="" />
                <div class="relative">
                    <form action="/search" id="search">
                        <input class="h-[30px] w-[500px] pl-4 pr-20 rounded-md serchInput" name="keyword"  type="text" placeholder="Tìm kiếm..."/>
                    </form>
                    <div class="suggestSearch hidden">
                        <ul class="absolute ulDataShow w-[100%] z-10 bg-white rounded-[5px] mt-1">
                        <li class=""> tìm kiếm vui vẻ!</li>
                        
                        </ul>
                    </div>
                </div>
                <ul class="menu-header">
                    <li><a href="#">Gọi mua hàng <br/>1800.2097</a></li>
                    <li>
                        <i class="fa-solid fa-location-dot"></i>
                        <a href="#">Cửa hàng <br/> của bạn</a>
                    </li>
                    <li>
                        <i class="fa-solid fa-truck-fast"></i>
                        <a href="#">Tra cứu <br/> đơn hàng</a>
                    </li>
                    <li>
                        <i class="fa-solid fa-cart-shopping"></i>
                        <a href="/cart">Giỏ hàng</a>
                    </li>
                    <li>
                        ${userAcc}
                    </li>
                </ul>
            </div>
        `
    }

}
export default HeaderHome;  