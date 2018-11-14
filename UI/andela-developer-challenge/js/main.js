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
const addCategoryForm = document.querySelector(".add-category");
const attendantMail = document.getElementById("attendant-mail");
const attendantPassword = document.getElementById("attendant-password");
const addAttendantForm = document.querySelector(".add-attendant");
const categoryDropdown = document.getElementById("category-dropdown");
let defaultOption = document.createElement("option");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productQuantity = document.getElementById("product-quantity");
const productDescription = document.getElementById("product-description");
const addProductForm = document.querySelector(".add-product");

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
				body: JSON.stringify({ name: categoryName.value })
			}
		)
			.then(res => res.json())
			.then(data => {
				if (data.rows) {
					console.log("successfully added");
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
			"https://andela-developer-challenge.herokuapp.com/api/v1/auth/signup",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem("authToken")
				},
				body: JSON.stringify({
					email: attendantMail.value,
					password: attendantPassword.value
				})
			}
		)
			.then(res => res.json())
			.then(data => {
				if (data.rows) {
					console.log("successfully added");
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
		fetch("https://andela-developer-challenge.herokuapp.com/api/v1/products/", {
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
				description: productDescription.value
			})
		})
			.then(res => res.json())
			.then(data => {
				if (data.rows) {
					console.log("successfully added");
					location.reload();
				}
			})
			.catch(error => console.log(error));
		event.preventDefault();
	});
}
