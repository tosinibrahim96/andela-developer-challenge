const createCategoryPicture = (data,index,role) => {
	const infoBlock = document.createElement("div");
	const productPicBLock = document.createElement("div");
	const catImage = document.createElement("img");
	const catInfo = document.createElement("div");
	const titleLink = document.createElement("a");
	const titleText = document.createElement("h6");
	const catdescription = document.createElement("p");
	
	const allContainer = document.querySelector(".attendant-info-container");
	

	infoBlock.classList.add("attendant-info-block");
	productPicBLock.classList.add("pic-block", "product-pic-block");
	catInfo.classList.add("info");
	catdescription.classList.add("description");
	titleText.classList.add("title");
	
	catImage.alt = "Product Image";
	catImage.src = data.image_url;
	titleLink.href = "#";
	titleText.innerText = data.name;
	catdescription.innerText = data.short_desc;
	
	titleLink.appendChild(titleText);
	catInfo.appendChild(titleLink);
	catInfo.appendChild(catdescription);
	
	productPicBLock.appendChild(catImage);
	productPicBLock.appendChild(catInfo);
	infoBlock.appendChild(productPicBLock);

	if (role == 'admin') {
		const deleteButton = document.createElement("button");
		const editButton = document.createElement("button");
		const identifier = document.createElement("input");
		const editIdentifier = document.createElement("input");
		deleteButton.classList.add("delete");
		editButton.classList.add("edit");
		deleteButton.innerText = "Delete";
		editButton.innerText = "Edit";
		identifier.value = data.id;
		editIdentifier.value = data.id;
		editIdentifier.style.display = "none";
		identifier.style.display = "none";
		catInfo.appendChild(deleteButton);
		catInfo.appendChild(editButton);
		deleteButton.appendChild(identifier);
		editButton.appendChild(editIdentifier);
	}
	allContainer.appendChild(infoBlock);
};

if (addCategoryForm) {
	const updateIdentifier = document.getElementById("update-identifier");
	addCategoryForm.addEventListener("submit", event => {
		if (!updateIdentifier.value) {
			fetch(
				"https://andela-developer-challenge.herokuapp.com/api/v1/categories/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem("authToken")
					},
					body: JSON.stringify({
						name: categoryName.value,
						image_url: categoryImage.value,
						description: categoryDescription.value
					})
				}
			)
				.then(res => res.json())
				.then(data => {
					if (data.rows) {
						location.reload();
					}
				})
				.catch(error => console.log(error));
		} else if (updateIdentifier.value) {
			const id = updateIdentifier.value;
			fetch(
				`https://andela-developer-challenge.herokuapp.com/api/v1/categories/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem("authToken")
					},
					body: JSON.stringify({
						name: categoryName.value,
						image_url: categoryImage.value,
						description: categoryDescription.value
					})
				}
			)
				.then(res => res.json())
				.then(data => {
					if (data.Message === "Category update successful") {
						location.reload();
					}
				})
				.catch(error => console.log(error));
		}
		event.preventDefault();
	});
}

const deleteACategory = id => {
	fetch(
		`https://andela-developer-challenge.herokuapp.com/api/v1/categories/${id}`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				token: localStorage.getItem("authToken")
			}
		}
	)
		.then(res => res.json())
		.then(data => {
			if (data.Message == "Category deleted successfuly") {
				location.reload();
			}
		})
		.catch(error => console.log(error));
};

const getACategory = id => {
	fetch(
		`https://andela-developer-challenge.herokuapp.com/api/v1/categories/${id}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				token: localStorage.getItem("authToken")
			}
		}
	)
		.then(res => res.json())
		.then(data => {
			categoryName.value = data.rows[0].name;
			categoryImage.value = data.rows[0].image_url;
			categoryDescription.value = data.rows[0].short_desc;
		})
		.catch(error => console.log(error));
};

if (categoryIndex) {
	const decoded = jwt_decode(localStorage.getItem("authToken"));
	const userRole = decoded.userRole;
	fetch(
		"https://andela-developer-challenge.herokuapp.com/api/v1/categories/",
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				token: localStorage.getItem("authToken")
			}
		}
	)
		.then(res => res.json())
		.then(data => {
			if (data.rows) {
				for (let index = 0; index < data.rows.length; index++) {
					createCategoryPicture(data.rows[index], index, userRole);
				}
				if (userRole == "admin") {
					const modalIdentifier = document.getElementById("modal-identifier");
					const updateIdentifier = document.getElementById("update-identifier");
					updateIdentifier.style.display = "none";
					modalIdentifier.style.display = "none";

					$(".delete").click(function() {
						// Get the value of textbox inside d delete button clicked
						$(".deleteModal").fadeIn(200);
						modalIdentifier.value = this.children[0].value;
					});

					$(".closeModal").click(function() {
						$(".deleteModal").hide("fast");
						categoryName.value = "";
						categoryDescription.value = "";
						categoryImage.value = "";
						const modalTitle = document.querySelector(".category-title");
						const updateButton = document.getElementById("loginbutton");
						modalTitle.innerText = "Add New Category";
						updateButton.value = "Add Category";
						updateIdentifier.value = "";
					});
					$(".close").click(function() {
						$(".deleteModal").hide("fast");
						categoryName.value = "";
						categoryDescription.value = "";
						categoryImage.value = "";
						const modalTitle = document.querySelector(".category-title");
						const updateButton = document.getElementById("loginbutton");
						modalTitle.innerText = "Add New Category";
						updateButton.value = "Add Category";
						updateIdentifier.value = "";
					});
					// When the user clicks anywhere outside of the modal, close it
					window.onclick = event => {
						if (event.target == modal) {
							modal.style.display = "none";
							categoryName.value = "";
							categoryDescription.value = "";
							categoryImage.value = "";
							const modalTitle = document.querySelector(".category-title");
							const updateButton = document.getElementById("loginbutton");
							modalTitle.innerText = "Add New Category";
							updateButton.value = "Add Category";
							updateIdentifier.value = "";
						}
					};
					$(".modal-delete").click(function() {
						deleteACategory(modalIdentifier.value);
					});

					$(".edit").click(function() {
						updateIdentifier.value = this.children[0].value;
						getACategory(updateIdentifier.value);
						const modalTitle = document.querySelector(".category-title");
						const updateButton = document.getElementById("loginbutton");
						modalTitle.innerText = "Update Category";
						updateButton.value = "Update Category";
						// Get the value of textbox inside d delete button clicked
						$(".updateModal").fadeIn(200);
					});
				}
			}
		})
		.catch(error => console.log(error));
}
