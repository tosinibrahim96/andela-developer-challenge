let changed = $(".incr").html();
let selectedIds = [];
let salesArray = [];
let selectedItemInfo = {};


const createPicture = (data, index) => {
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

	for (let index = 0; index < 4; index++) {
		const productList = document.createElement("li");
		const nameText = document.createElement("strong");
		const priceText = document.createElement("strong");
		const quantityText = document.createElement("strong");
		const spanElement = document.createElement("span");

		if (index == 0) {
			spanElement.classList.add("one");
			spanElement.innerHTML = data.product_name;
			nameText.innerText = "Name:";
			productList.appendChild(nameText);
			productList.appendChild(spanElement);
			descriptionList.appendChild(productList);
		} else if (index == 1) {
			spanElement.classList.add("two");
			spanElement.innerHTML = data.product_price;
			priceText.innerText = "Price:";
			productList.appendChild(priceText);
			productList.appendChild(spanElement);
			descriptionList.appendChild(productList);
		} else if (index == 2) {
			spanElement.classList.add("three");
			spanElement.innerHTML = data.product_quantity;
			quantityText.innerText = "Quantity:";
			productList.appendChild(quantityText);
			productList.appendChild(spanElement);
			descriptionList.appendChild(productList);
		} else if (index == 3) {
			spanElement.innerHTML = data.product_id;
			productList.appendChild(spanElement);
			productList.style.display="none";
			descriptionList.appendChild(productList);
		}
	}

	productImage.alt = "Product Image";
	productImage.src = data.product_image_url;

	cartButton.appendChild(plusSign);
	cartButton.appendChild(toolTipText);
	picBlock.appendChild(productImage);
	picBlock.appendChild(cartButton);
	picDescription.appendChild(descriptionList);
	infoBlock.appendChild(picBlock);
	infoBlock.appendChild(picDescription);
	allContainer.appendChild(infoBlock);

	$(".myBtn").click(function () {		
		//get the id and other properties of the clicked product
		const selectedId = this.parentElement.parentElement.children[1].firstChild.children[3].children[0].innerText;
		const selectedPrice = this.parentElement.parentElement.children[1].firstChild.children[1].children[1].innerText;
		const selectedImage = this.parentElement.parentElement.children[0].children[0];
		if (!selectedIds.includes(selectedId)) {
			selectedIds.push(selectedId);
			$(".incr").html(++changed);
			toolTipText.innerText = "Added to Cart";
			selectedItemInfo.product_id = selectedId;
			selectedItemInfo.item_price = selectedPrice;
			selectedItemInfo.item_image = selectedImage; 
			salesArray.push(selectedItemInfo);
			//clear the object so we can add another one
			selectedItemInfo = {};
			console.log(salesArray);
		}		
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


const createItemsTable = (data)=>{
	const itemsList = document.createElement('ul');
	const imageContainer = document.createElement('li');
	const quantityContainer = document.createElement('li');
	const priceContainer = document.createElement('li');
	const totalContainer = document.createElement('li');
	const itemImage = document.createElement('img');
	const quantityDropdown = document.createElement('select');
	// const containerAll = document.querySelector('.items-container');

	//create quantity dropdown
	for (let index = 1; index <= 100; index++) {
		let dropdownOption = document.createElement('option');
		dropdownOption.text = index;
		dropdownOption.value = index;
		quantityDropdown.add(dropdownOption);
	}
	itemImage.src = data.item_image;
	itemImage.alt = "Product data";
	itemsList.classList.add('items-details');

	imageContainer.append(itemImage);
	quantityContainer.append(quantityDropdown);
	priceContainer.append(data.item_price);
	totalContainer.append(data.item_price);

	itemsList.append(imageContainer);
	itemsList.append(quantityContainer);
	itemsList.append(priceContainer);
	itemsList.append(totalContainer);
	containerAll.append(itemsList);
};

if (proceedToCheckout) {
	proceedToCheckout.addEventListener('click', (event) => {
		event.preventDefault();
		for (let index = 0; index < salesArray.length; index++) {
			createItemsTable(salesArray[index])
		}
	});
}

	// fetch("http://localhost:3000/api/v1/products/", {
	// 	method: "GET",
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		token: localStorage.getItem("authToken")
	// 	}
	// })
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		if (data.rows) {
	// 			for (let index = 0; index < data.rows.length; index++) {
	// 				createPicture(data.rows[index], index);
	// 			}
	// 			document.querySelectorAll(".tooltiptext").forEach(element => {
	// 				element.innerText = "Add to Cart";
	// 			});
	// 		}
	// 	})
	// 	.catch(error => console.log(error));