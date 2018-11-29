const  showAllCategories = ()=> {
  if (categoryDropdown) {
		categoryDropdown.length = 0;
		defaultOption.text = "Choose Product Category";
		categoryDropdown.add(defaultOption);
		categoryDropdown.selectedIndex = 0;
		
		fetch("https://andela-developer-challenge.herokuapp.com/api/v1/categories/", {
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
					let option;

					for (let i = 0; i < data.rows.length; i++) {
						option = document.createElement("option");
						option.text = data.rows[i].name;
						option.value = data.rows[i].id;
						categoryDropdown.add(option);
					}
				}
			})
			.catch(error => console.log(error));
	}
}

showAllCategories();

if (addProductForm) {
  const updateIdentifier = document.getElementById("update-identifier");
  addProductForm.addEventListener("submit", event => {
    if (!updateIdentifier.value) {
    
      fetch(
				"https://andela-developer-challenge.herokuapp.com/api/v1/products/",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem("authToken")
					},
					body: JSON.stringify({
						name: productName.value,
						category_id: categoryDropdown.value,
						price: productPrice.value,
						quantity: productQuantity.value,
						description: productDescription.value,
						image_url: productImage.value
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
     
    }else if (updateIdentifier.value){
      console.log(productImage.value);
      const id = updateIdentifier.value;
      fetch(
				`https://andela-developer-challenge.herokuapp.com/api/v1/products/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						token: localStorage.getItem("authToken")
					},
					body: JSON.stringify({
						name: productName.value,
						category_id: categoryDropdown.value,
						price: productPrice.value,
						quantity: productQuantity.value,
						description: productDescription.value,
						image_url: productImage.value
					})
				}
			)
				.then(res => res.json())
				.then(data => {
					if (data.Message === "Product update successful") {
						location.reload();
					}
				})
				.catch(error => console.log(error));
      
    }
    event.preventDefault();
  });
}




const createProductPicture = (data, index,role) => {
	const productBlock = document.createElement("div");
  const productPicBLock = document.createElement("div");
  const imageOfProduct = document.createElement("img");
  const productInfo = document.createElement("div");
  const titleText = document.createElement("h6");
  const descriptionList = document.createElement("ul");
  const allContainer = document.querySelector(".attendant-info-container");
	const deleteButton = document.createElement("button");
	const editButton = document.createElement("button");
	const identifier = document.createElement("input");
	const editIdentifier = document.createElement("input");


	if (role == "admin") {
		deleteButton.classList.add("delete");
		editButton.classList.add("edit");
		identifier.value = data.product_id;
		editIdentifier.value = data.product_id;
		identifier.style.display = "none";
		editIdentifier.style.display = "none";
	}
  productBlock.classList.add("attendant-product-block");
  productPicBLock.classList.add("pic-block", "product-pic-block");
  productInfo.classList.add("info");
  descriptionList.classList.add("description", "description-list");
  titleText.classList.add("title");
  
  titleText.innerText = data.product_name;
  imageOfProduct.alt = "Product Image";
  imageOfProduct.src = data.product_image_url;
	

  for (let index = 0; index < 4; index++) {
    const productList = document.createElement("li");
    const spanElement = document.createElement("span");

    if (index == 0) {
      const categoryText = document.createElement("strong");
      categoryText.innerHTML = "Category:";
      spanElement.classList.add("span-one");
      spanElement.innerHTML = data.category_name;

      productList.appendChild(categoryText);
      productList.appendChild(spanElement);
      descriptionList.appendChild(productList);
    } else if (index == 1) {
      const priceText = document.createElement("strong");
      spanElement.classList.add("span-two");
      spanElement.innerHTML = data.product_price;
      priceText.innerHTML = "Price:";
      productList.appendChild(priceText);
      productList.appendChild(spanElement);
      descriptionList.appendChild(productList);
    } else if (index == 2) {
      const quantityText = document.createElement("strong");
      spanElement.classList.add("span-three");
      spanElement.innerHTML = data.product_quantity;
      quantityText.innerHTML = "Quantity:";
      productList.appendChild(quantityText);
      productList.appendChild(spanElement);
      descriptionList.appendChild(productList);
    } else if (index == 3 && role=='admin') {
      deleteButton.innerText = "Delete";
      editButton.innerText = "Edit";
      deleteButton.appendChild(identifier);
      editButton.appendChild(editIdentifier);
      productList.appendChild(deleteButton);
      productList.appendChild(editButton);
      descriptionList.appendChild(productList);
    }
  }

  productInfo.appendChild(titleText);
  productInfo.appendChild(descriptionList);
  productPicBLock.appendChild(imageOfProduct);
  productPicBLock.appendChild(productInfo);
	productBlock.appendChild(productPicBLock);
	
	allContainer.appendChild(productBlock);
};

const deleteAProduct = (id) => {
  fetch(
		`https://andela-developer-challenge.herokuapp.com/api/v1/products/${id}`,
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
			if (data.Message == "Product deleted successfuly") {
				location.reload();
			}
		})
		.catch(error => console.log(error));
}

const getAProduct = (id)=>{
  
	fetch(`https://andela-developer-challenge.herokuapp.com/api/v1/products/${id}`,{
      method: "GET",
			headers: {
				"Content-Type": "application/json",
				token: localStorage.getItem("authToken")
			}
		}
	)
		.then(res => res.json())
		.then(data => {
      productName.value = data.rows[0].product_name;
      productPrice.value = data.rows[0].product_price; 
      productQuantity.value = data.rows[0].product_quantity;
      productDescription.value = data.rows[0].product_description;
      productImage.value = data.rows[0].product_image_url;
      defaultOption.text = data.rows[0].category_name;
      defaultOption.value = data.rows[0].category_id;
		})
		.catch(error => console.log(error));
}


if (productIndex) {
	const decoded = jwt_decode(localStorage.getItem("authToken"));
	const userRole = decoded.userRole;

	fetch("https://andela-developer-challenge.herokuapp.com/api/v1/products/", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			token: localStorage.getItem("authToken")
		}
	})
		.then(res => res.json())
		.then(data => {
			if (data.rows) {
				for (let index = 0; index < data.rows.length; index++) {
					createProductPicture(data.rows[index], index, userRole);
				}
				if (userRole == 'admin') {
					const modalIdentifier = document.getElementById("modal-identifier");
					const updateIdentifier = document.getElementById("update-identifier");
					modalIdentifier.style.display = "none";
					updateIdentifier.style.display = "none";
					$(".delete").click(function () {
						// Get the value of textbox inside d delete button clicked
						$(".deleteModal").fadeIn(200);
						modalIdentifier.value = this.children[0].value;
					});

					$(".closeModal").click(function () {
						$(".deleteModal").hide("fast");
						productName.value = "";
						productPrice.value = "";
						productQuantity.value = "";
						productDescription.value = "";
						productImage.value = "";
						defaultOption.text = "Choose Product Category";
						defaultOption.removeAttribute("value");
						categoryDropdown.selectedIndex = 0;
						const modalTitle = document.querySelector(".category-title");
						const updateButton = document.getElementById("loginbutton");
						modalTitle.innerText = "Add New Product";
						updateButton.value = "Add Product";
						updateIdentifier.value = "";
					});
					$(".close").click(function () {
						$(".deleteModal").hide("fast");
						productName.value = "";
						productPrice.value = "";
						productQuantity.value = "";
						productDescription.value = "";
						productImage.value = "";
						defaultOption.text = "Choose Product Category";
						defaultOption.removeAttribute("value");
						categoryDropdown.selectedIndex = 0;
						const modalTitle = document.querySelector(".category-title");
						const updateButton = document.getElementById("loginbutton");
						modalTitle.innerText = "Add New Product";
						updateButton.value = "Add Product";
						updateIdentifier.value = "";
					});
					// When the user clicks anywhere outside of the modal, close it
					window.onclick = event => {
						if (event.target == modal) {
							modal.style.display = "none";
							productName.value = "";
							productPrice.value = "";
							productQuantity.value = "";
							productDescription.value = "";
							productImage.value = "";
							defaultOption.text = "Choose Product Category";
							defaultOption.removeAttribute("value");
							categoryDropdown.selectedIndex = 0;
							const modalTitle = document.querySelector(".category-title");
							const updateButton = document.getElementById("loginbutton");
							modalTitle.innerText = "Add New Product";
							updateButton.value = "Add Product";
							updateIdentifier.value = "";
						}
					};
					$(".modal-delete").click(function () {
						deleteAProduct(modalIdentifier.value);
					});
					$(".edit").click(function () {
						updateIdentifier.value = this.children[0].value;
						getAProduct(updateIdentifier.value);
						const modalTitle = document.querySelector(".category-title");
						const updateButton = document.getElementById("loginbutton");
						modalTitle.innerText = "Update Product";
						updateButton.value = "Update Product";
						// Get the value of textbox inside d delete button clicked
						$(".updateModal").fadeIn(200);
					});
				
				
				}
				
			}
		})
		.catch(error => console.log(error));
}
