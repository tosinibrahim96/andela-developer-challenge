const loggedIn = localStorage.getItem("authToken");
if (!loggedIn) {
	window.location = "/index.html";
}
