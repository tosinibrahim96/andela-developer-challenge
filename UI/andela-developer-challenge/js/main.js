const togggleButton = document.querySelector(".toggle-btn");
const sidebar = document.getElementById("sidebar");
let input, filter, table, tr, td, i;
input = document.getElementById("myInput");
// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close");
const logoutButton = document.querySelector(".logout-button");
const token = localStorage.getItem("authToken");
const categoryName = document.getElementById("categoryName");
const categoryImage = document.getElementById("category-image");
const categoryDescription = document.getElementById("category-description");
const addCategoryForm = document.querySelector(".add-category");
const attendantMail = document.getElementById("attendant-mail");
const attendantPassword = document.getElementById("attendant-password");
const addAttendantForm = document.querySelector(".add-attendant");
const attendantName = document.getElementById("attendant-name");
const attendantContact = document.getElementById("attendant-mobile");
const attendantImage = document.getElementById("attendant-img");
const categoryDropdown = document.getElementById("category-dropdown");
let defaultOption = document.createElement("option");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productQuantity = document.getElementById("product-quantity");
const productDescription = document.getElementById("product-description");
const productImage = document.getElementById("product-image");
const addProductForm = document.querySelector(".add-product");
const testImage = document.querySelector(".image-test");
const categoryIndex = document.querySelector(".category-index");
const productIndex = document.querySelector(".product-index");
const attendantIndex = document.querySelector(".attendant-index");
const salesIndex = document.querySelector(".sales-information");
const adminIndex = document.querySelector(".admin-right");


$(document).ready(() => {
	let changed = $(".incr").html();
	$(".admin-box").hide();
	$("#show").click(function() {
		$(".attendant-box").hide();
		$(".admin-box").fadeIn(200);
	});
	$("#hide").click(function() {
		$(".attendant-box").fadeIn(200);
		$(".admin-box").hide();
	});
	$(".close").click(function() {
		$("#myModal").hide("fast");
	});
	$(".myBtn").click(function() {
		$(".incr").html(++changed);
	});
	$(".btn-close").click(function() {
		$("#myModal").hide(10);
	});
});

toggleSidebar = () => {
	sidebar.classList.toggle("active");
	sidebar.classList.toggle("show");
};

searchProduct = () => {
	// Declare variables
	filter = input.value.toUpperCase();
	table = document.querySelector(".searchTable");
	tr = table.getElementsByTagName("tr");

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[0];
		if (td) {
			if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
};

// When the user clicks on the button, open the modal
showModal = () => {
	modal.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = event => {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

if (input) {
	input.addEventListener("keyup", searchProduct);
}

if (btn) {
	btn.addEventListener("click", showModal);
	togggleButton.addEventListener("click", toggleSidebar);
}

if (logoutButton) {
	logoutButton.addEventListener("click", () => {
		localStorage.removeItem("authToken");
		window.location = "/index.html";
	});
}
if (addCategoryForm) {
	addCategoryForm.addEventListener("submit", event => {
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
		event.preventDefault();
	});
}

if (addAttendantForm) {
	addAttendantForm.addEventListener("submit", event => {
		fetch(
			"https://andela-developer-challenge.herokuapp.com/api/v1/auth/signup/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem("authToken")
				},
				body: JSON.stringify({
					email: attendantMail.value,
					password: attendantPassword.value,
					first_name: attendantName.value,
					mobile_number: attendantContact.value,
					image_url: attendantImage.value
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
		event.preventDefault();
	});
}

if (categoryDropdown) {
	(() => {
		categoryDropdown.length = 0;
		defaultOption.text = "Choose Product Category";
		categoryDropdown.add(defaultOption);
		categoryDropdown.selectedIndex = 0;
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
	})();
}

if (addProductForm) {
	addProductForm.addEventListener("submit", event => {
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
		event.preventDefault();
	});
}

const createPicture = (data, index) => {
	let changed = $(".incr").html();
	const infoBlock = document.createElement("div");
	const picBlock = document.createElement("div");
	const productImage = document.createElement("img");
	const cartButton = document.createElement("div");
	const plusSign = document.createElement("i");
	const toolTipText = document.createElement("span");
	const picDescription = document.createElement("div");
	const descriptionList = document.createElement("ul");
	const allContainer = document.querySelector(".attendant-info-container");

	//if statement to determine colour of add to cart button
	index % 2 !== 0
		? cartButton.classList.add("cart", "cart2", "myBtn")
		: cartButton.classList.add("cart", "myBtn");
	plusSign.classList.add("fas", "fa-plus");
	toolTipText.classList.add("tooltiptext");
	infoBlock.classList.add("attendant-info-block");
	picBlock.classList.add("pic-block");
	picDescription.classList.add("pic-description");
	descriptionList.classList.add("description-list");

	for (let index = 0; index < 3; index++) {
		const productList = document.createElement("li");
		const nameText = document.createElement("strong");
		const priceText = document.createElement("strong");
		const quantityText = document.createElement("strong");
		const spanElement = document.createElement("span");

		if (index == 0) {
			spanElement.classList.add("one");
			spanElement.innerHTML = data.name;
			nameText.innerText = "Name:";
			productList.appendChild(nameText);
			productList.appendChild(spanElement);
			descriptionList.appendChild(productList);
		} else if (index == 1) {
			spanElement.classList.add("two");
			spanElement.innerHTML = data.price;
			priceText.innerText = "Price:";
			productList.appendChild(priceText);
			productList.appendChild(spanElement);
			descriptionList.appendChild(productList);
		} else if (index == 2) {
			spanElement.classList.add("three");
			spanElement.innerHTML = data.quantity;
			quantityText.innerText = "Quantity:";
			productList.appendChild(quantityText);
			productList.appendChild(spanElement);
			descriptionList.appendChild(productList);
		}
	}

	productImage.alt = "Product Image";
	productImage.src = data.image_url;

	cartButton.appendChild(plusSign);
	cartButton.appendChild(toolTipText);
	picBlock.appendChild(productImage);
	picBlock.appendChild(cartButton);
	picDescription.appendChild(descriptionList);
	infoBlock.appendChild(picBlock);
	infoBlock.appendChild(picDescription);
	allContainer.appendChild(infoBlock);

	$(".myBtn").click(function() {
		$(".incr").html(++changed);
	});
};

if (testImage) {
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
					createPicture(data.rows[index], index);
				}
				document.querySelectorAll(".tooltiptext").forEach(element => {
					element.innerText = "Add to Cart";
				});
			}
		})
		.catch(error => console.log(error));
}

const createCategoryPicture = data => {
	const infoBlock = document.createElement("div");
	const productPicBLock = document.createElement("div");
	const catImage = document.createElement("img");
	const catInfo = document.createElement("div");
	const titleLink = document.createElement("a");
	const titleText = document.createElement("h6");
	const catdescription = document.createElement("p");
	const deleteButton = document.createElement("button");
	const editButton = document.createElement("button");
	const allContainer = document.querySelector(".attendant-info-container");
	const identifier = document.createElement('input');
	

	infoBlock.classList.add("attendant-info-block");
	productPicBLock.classList.add("pic-block", "product-pic-block");
	catInfo.classList.add("info");
	catdescription.classList.add("description");
	titleText.classList.add("title");
	deleteButton.classList.add("delete");
	editButton.classList.add("edit");

	catImage.alt = "Product Image";
	catImage.src = data.image_url;
	titleLink.href = "#";
	titleText.innerText = data.name;
	catdescription.innerText = data.short_desc;
	deleteButton.innerText = "Delete";
	editButton.innerText = "Edit";
	identifier.value = data.id;
	identifier.style.display="none";

	titleLink.appendChild(titleText);
	catInfo.appendChild(titleLink);
	catInfo.appendChild(catdescription);
	catInfo.appendChild(deleteButton);
	catInfo.appendChild(editButton);
	productPicBLock.appendChild(catImage);
	productPicBLock.appendChild(catInfo);
	infoBlock.appendChild(productPicBLock);
	deleteButton.appendChild(identifier);
	allContainer.appendChild(infoBlock);
};


const deleteACategory = (id)=>{
	
	fetch(`https://andela-developer-challenge.herokuapp.com/api/v1/categories/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				token: localStorage.getItem("authToken")
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.Message == "Category deleted successfuly") {
					location.reload();
				}
			})
			.catch(error => console.log(error));
}

if (categoryIndex) {
	const modalIdentifier = document.getElementById("modal-identifier");
	modalIdentifier.style.display = "none";
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
					createCategoryPicture(data.rows[index], index);
				}

				$(".delete").click(function() {
					// Get the value of textbox inside d delete button clicked
					$(".deleteModal").fadeIn(200);
					modalIdentifier.value = this.children[0].value;
				});

				$(".closeModal").click(function() {
					$(".deleteModal").hide("fast");
				});
				$(".close").click(function() {
					$(".deleteModal").hide("fast");
				});
				$(".modal-delete").click(function() {
					deleteACategory(modalIdentifier.value);
				});
			}
		})
		.catch(error => console.log(error));
}

const createProductPicture = (data, index) => {
	const productBlock = document.createElement("div");
	const productPicBLock = document.createElement("div");
	const imageOfProduct = document.createElement("img");
	const productInfo = document.createElement("div");
	const titleText = document.createElement("h6");
	const descriptionList = document.createElement("ul");
	const deleteButton = document.createElement("button");
	const editButton = document.createElement("button");
	const allContainer = document.querySelector(".attendant-info-container");
	const identifier = document.createElement('input');

	productBlock.classList.add("attendant-product-block");
	productPicBLock.classList.add("pic-block", "product-pic-block");
	productInfo.classList.add("info");
	descriptionList.classList.add("description", "description-list");
	titleText.classList.add("title");
	deleteButton.classList.add("delete");
	editButton.classList.add("edit");

	titleText.innerText = data.product_name;
	imageOfProduct.alt = "Product Image";
	imageOfProduct.src = data.product_image_url;
	identifier.value = data.product_id;
	identifier.style.display="none";

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
		} else if (index == 3) {
			deleteButton.innerText = "Delete";
			editButton.innerText = "Edit";
			deleteButton.appendChild(identifier);
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

const deleteAProduct = (id)=>{
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

if (productIndex) {
	const modalIdentifier = document.getElementById("modal-identifier");
	modalIdentifier.style.display = "none";
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
					createProductPicture(data.rows[index], index);
				}
				$(".delete").click(function() {
					// Get the value of textbox inside d delete button clicked
					$(".deleteModal").fadeIn(200);
					modalIdentifier.value = this.children[0].value;
				});

				$(".closeModal").click(function() {
					$(".deleteModal").hide("fast");
				});
				$(".close").click(function() {
					$(".deleteModal").hide("fast");
				});
				$(".modal-delete").click(function() {
					deleteAProduct(modalIdentifier.value);
				});
			}
		})
		.catch(error => console.log(error));
}

const createAttendantPicture = (data, index) => {
	const attendantBlock = document.createElement("div");
	const attendantPicBLock = document.createElement("div");
	const imageOfattendant = document.createElement("img");
	const attendantInfo = document.createElement("div");
	const titleText = document.createElement("h6");
	const descriptionList = document.createElement("ul");
	const deleteButton = document.createElement("button");
	const editButton = document.createElement("button");
	const allContainer = document.querySelector(".attendant-info-container");

	attendantBlock.classList.add("attendant-product-block");
	attendantPicBLock.classList.add("pic-block", "product-pic-block", "att-info");
	attendantInfo.classList.add("info");
	descriptionList.classList.add("description", "description-list");
	titleText.classList.add("title");
	deleteButton.classList.add("delete");
	editButton.classList.add("edit");

	titleText.innerText = data.first_name;
	imageOfattendant.alt = "Attendant Image";
	imageOfattendant.src = data.image_url;

	for (let index = 0; index < 4; index++) {
		const attendantList = document.createElement("li");
		const spanElement = document.createElement("span");

		if (index == 0) {
			const mailText = document.createElement("strong");
			mailText.innerHTML = "Mail:";
			spanElement.innerHTML = data.email;
			attendantList.appendChild(mailText);
			attendantList.appendChild(spanElement);
			descriptionList.appendChild(attendantList);
		} else if (index == 1) {
			const mobileText = document.createElement("strong");
			spanElement.innerHTML = data.mobile_number;
			mobileText.innerHTML = "Contact:";
			attendantList.appendChild(mobileText);
			attendantList.appendChild(spanElement);
			descriptionList.appendChild(attendantList);
		} else if (index == 2) {
			const salesText = document.createElement("strong");
			spanElement.innerHTML = `$ ${data.sales}`;
			salesText.innerHTML = "Sales:";
			attendantList.appendChild(salesText);
			attendantList.appendChild(spanElement);
			descriptionList.appendChild(attendantList);
		} else if (index == 3) {
			deleteButton.innerText = "Delete";
			editButton.innerText = "Edit";
			attendantList.appendChild(deleteButton);
			attendantList.appendChild(editButton);
			descriptionList.appendChild(attendantList);
		}
	}

	attendantInfo.appendChild(titleText);
	attendantInfo.appendChild(descriptionList);
	attendantPicBLock.appendChild(imageOfattendant);
	attendantPicBLock.appendChild(attendantInfo);
	attendantBlock.appendChild(attendantPicBLock);
	allContainer.appendChild(attendantBlock);
};

if (attendantIndex) {
	fetch("https://andela-developer-challenge.herokuapp.com/api/v1/users", {
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
					createAttendantPicture(data.rows[index], index);
				}
			}
		})
		.catch(error => console.log(error));
}

const createSalesImage = (cat_name, cat_image) => {
	const infoBlock = document.createElement("div");
	const picBlock = document.createElement("div");
	const catPic = document.createElement("img");
	const picDescription = document.createElement("div");
	const descriptionList = document.createElement("ul");
	const descriptionStrong = document.createElement("strong");
	const categoryName = document.createElement("li");
	const allContainer = document.querySelector(".attendant-info-container");

	infoBlock.classList.add("attendant-info-block");
	picBlock.classList.add("pic-block");
	catPic.alt = "Product Image";
	catPic.src = cat_image;
	picDescription.classList.add("pic-description");
	descriptionList.classList.add("description-list");
	categoryName.append(cat_name);
	descriptionStrong.append(categoryName);
	descriptionList.append(descriptionStrong);
	picDescription.appendChild(descriptionList);
	picBlock.appendChild(catPic);
	infoBlock.appendChild(picBlock);
	infoBlock.appendChild(picDescription);	
	allContainer.appendChild(infoBlock);
};

const createSalesTable = data => {
	const tablerow = document.createElement("tr");
	const nameColumn = document.createElement("td");
	const productColumn = document.createElement("td");
	const categoryColumn = document.createElement("td");
	const quantityColumn = document.createElement("td");
	const priceColumn = document.createElement("td");
	const operationColumn = document.createElement("td");
	const deleteButton = document.createElement("button");
	const editButton = document.createElement("button");

	deleteButton.classList.add("delete");
	editButton.classList.add("edit");
	deleteButton.innerText = "Delete";
	editButton.innerText = "Edit";

	nameColumn.append(data.first_name);
	productColumn.append(data.product_name);
	categoryColumn.append(data.category_name);
	quantityColumn.append(data.quantity);
	priceColumn.append(data.item_price);
	operationColumn.append(editButton);
	operationColumn.append(deleteButton);

	tablerow.appendChild(nameColumn);
	tablerow.appendChild(productColumn);
	tablerow.appendChild(categoryColumn);
	tablerow.appendChild(quantityColumn);
	tablerow.appendChild(priceColumn);
	tablerow.appendChild(operationColumn);
	salesIndex.appendChild(tablerow);
};

if (salesIndex) {
	fetch("https://andela-developer-challenge.herokuapp.com/api/v1/sales/", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			token: localStorage.getItem("authToken")
		}
	})
		.then(res => res.json())
		.then(data => {
			const catName = [];
			if (data.attendantSale) {
				//Here we want to get the images of categories.
				for (let index = 0; index < data.attendantSale.rows.length; index++) {
					if (!catName.includes(data.attendantSale.rows[index].category_name)) {
						catName.push(data.attendantSale.rows[index].category_name);
						createSalesImage(data.attendantSale.rows[index].category_name, data.attendantSale.rows[index].category_image);
					}
					createSalesTable(data.attendantSale.rows[index]);
				}
			}
		})
		.catch(error => console.log(error));
}


const createAdminProducts = (data, index)=> {
	const infoBlock = document.createElement("div");
	const picBlock = document.createElement("div");
	const catPic = document.createElement("img");
	const infoBlockContent = document.createElement("div");
	const amountInStock = document.createElement("h3");
	const stockValue = document.createElement("p");
	const infoFooter = document.createElement("div");
	const footerParagraph = document.createElement("p");
	const footerSpan = document.createElement("span");
	const allContainer = document.querySelector(".up-info-container");

	infoBlock.classList.add("info-block");
	picBlock.classList.add("info-block-header", "info-block-header3");
	infoBlockContent.classList.add("info-block-content");
	infoFooter.classList.add("info-block-footer");
	footerSpan.classList.add("date");

	catPic.src = data.product_image_url;
	catPic.alt = "Product Image";
	picBlock.append(catPic);
	amountInStock.append("Amount in Stock");
	stockValue.append(data.product_quantity);
	infoBlockContent.append(amountInStock);
	infoBlockContent.append(stockValue);
	footerSpan.append(data.product_name)
	footerParagraph.append("Product Name");
	footerParagraph.append(footerSpan);
	infoFooter.append(footerParagraph);
	infoBlock.append(picBlock);
	infoBlock.append(infoBlockContent);
	infoBlock.append(infoFooter);
	allContainer.appendChild(infoBlock);
}



if(adminIndex){

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
					createAdminProducts(data.rows[index], index);
				}
			}
		})
		.catch(error => console.log(error));

	
	
}