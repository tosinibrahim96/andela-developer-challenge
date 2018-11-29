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
  const identifier = document.createElement("input");

  identifier.value = data.id;
  identifier.style.display = "none";
  deleteButton.classList.add("delete");
  deleteButton.innerText = "Delete";
  deleteButton.appendChild(identifier);

  nameColumn.append(data.first_name);
  productColumn.append(data.product_name);
  categoryColumn.append(data.category_name);
  quantityColumn.append(data.quantity);
  priceColumn.append(data.item_price);
  operationColumn.append(deleteButton);

  tablerow.appendChild(nameColumn);
  tablerow.appendChild(productColumn);
  tablerow.appendChild(categoryColumn);
  tablerow.appendChild(quantityColumn);
  tablerow.appendChild(priceColumn);
  tablerow.appendChild(operationColumn);
  salesIndex.appendChild(tablerow);
};

const deleteSale = (id) => {
  fetch(
    `https://andela-developer-challenge.herokuapp.com/api/v1/sales/${id}`,
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
      if (data.Message == "Record deleted successfully") {
        location.reload();
      }
    })
    .catch(error => console.log(error));
}


if (salesIndex) {
  const modalIdentifier = document.getElementById("modal-identifier");
  modalIdentifier.style.display = "none";
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
        $(".delete").click(function () {
          // Get the value of textbox inside d delete button clicked
          $(".deleteModal").fadeIn(200);
          modalIdentifier.value = this.children[0].value;
        });

        $(".closeModal").click(function () {
          $(".deleteModal").hide("fast");
        });
        $(".close").click(function () {
          $(".deleteModal").hide("fast");
        });
        $(".modal-delete").click(function () {
          deleteSale(modalIdentifier.value);
        });
      }
    })
    .catch(error => console.log(error));
}

const createProductPicture = (data) => {
  const productBlock = document.createElement("div");
  const productPicBLock = document.createElement("div");
  const imageOfProduct = document.createElement("img");
  const productInfo = document.createElement("div");
  const titleText = document.createElement("h6");
  const descriptionList = document.createElement("ul");
  const allContainer = document.querySelectorAll(".attendant-info-container");
  
  productBlock.classList.add("attendant-product-block");
  productPicBLock.classList.add("pic-block", "product-pic-block");
  productInfo.classList.add("info");
  descriptionList.classList.add("description", "description-list");
  titleText.classList.add("title");

  titleText.innerText = data.product_name;
  imageOfProduct.alt = "Product Image";
  imageOfProduct.src = data.product_image;


  for (let index = 0; index < 3; index++) {
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
      spanElement.innerHTML = data.item_price;
      priceText.innerHTML = "Price:";
      productList.appendChild(priceText);
      productList.appendChild(spanElement);
      descriptionList.appendChild(productList);
    } else if (index == 2) {
      const quantityText = document.createElement("strong");
      spanElement.classList.add("span-three");
      spanElement.innerHTML = data.quantity;
      quantityText.innerHTML = "Quantity:";
      productList.appendChild(quantityText);
      productList.appendChild(spanElement);
      descriptionList.appendChild(productList);
    } 
  }

  productInfo.appendChild(titleText);
  productInfo.appendChild(descriptionList);
  productPicBLock.appendChild(imageOfProduct);
  productPicBLock.appendChild(productInfo);
  productBlock.appendChild(productPicBLock);

  allContainer[1].appendChild(productBlock);
};




if (attendantSales) {
  console.log("yes");
  const decoded = jwt_decode(localStorage.getItem("authToken"));
  const id = decoded.userId;

  fetch(`https://andela-developer-challenge.herokuapp.com/api/v1/sales/${id}`, {
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
					createProductPicture(data.attendantSale.rows[index]);
        }
			}
		})
		.catch(error => console.log(error));
}