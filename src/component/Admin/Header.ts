const AdminHeader = {
	render: () => {
		return (
            /*html*/`
                <div class="flex bg-blue-300 items-center">
					<img class="w-[64px] p-2" src="https://raw.githubusercontent.com/vuanhtu1993/poly-web502/master/Assignment1/public/images/logo.png"/>
					<div class="input-group flex-nowrap h-[30px]">
						<button type="submit" class="input-group-text border-none">
						<i class="fa fa-search "></i>
						</button>
							<input type="text" class="" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
						</div>
                	</div>
            `
		)
	}
}

export default AdminHeader