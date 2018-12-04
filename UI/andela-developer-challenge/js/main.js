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
const updateButton = document.getElementById("loginbutton");
const attendantSales = document.querySelector(".attendant-sales");
const proceedToCheckout = document.querySelector("#proceedToCheckout");

$(document).ready(() => {
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

