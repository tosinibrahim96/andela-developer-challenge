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
