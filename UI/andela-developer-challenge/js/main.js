const togggleButton = document.querySelector(".toggle-btn");
const sidebar = document.getElementById("sidebar");
let input, filter, table, tr, td, i;
input = document.getElementById("myInput");
// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close");
const logoutButton = document.querySelector(".logout-button");
const token = localStorage.getItem("authToken");


$(document).ready(() => {
	let changed = $(".incr").html();
	$(".admin-box").hide();
	$("#show").click(function () {
		$(".attendant-box").hide();
		$(".admin-box").fadeIn(200);
	});
	$("#hide").click(function () {
		$(".attendant-box").fadeIn(200);
		$(".admin-box").hide();
	});
	$(".close").click(function () {
		$("#myModal").hide("fast");
	});
	$(".myBtn").click(function () {
		$(".incr").html(++changed);
	});
	$(".btn-close").click(function () {
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
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

if (input || btn) {
	input.addEventListener("keyup", searchProduct);
	btn.addEventListener("click", showModal);
	togggleButton.addEventListener("click", toggleSidebar);
}

if (logoutButton) {
	logoutButton.addEventListener('click', () => {
		localStorage.removeItem('authToken');
		window.location = "/index.html";
	});
	
}




