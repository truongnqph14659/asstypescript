const AdminHeader = {
	render: () => {
		return (
            /*html*/`
                <div class="flex bg-blue-300 items-center justify-around">
					<img class="w-[64px] p-2" src="https://raw.githubusercontent.com/vuanhtu1993/poly-web502/master/Assignment1/public/images/logo.png"/>
					<form class="ml-[100px]">
					<input class="form-control me-2 " size="50px" type="search" placeholder="Search" aria-label="Search">
				   </form>
                </div>
            `
		)
	}
}

export default AdminHeader