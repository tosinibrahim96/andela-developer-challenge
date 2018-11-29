const createAdminProducts = (data, index) => {
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



if (adminIndex) {

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