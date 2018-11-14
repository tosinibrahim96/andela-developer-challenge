const loggedIn = localStorage.getItem("authToken");
if (loggedIn) {
	const decoded = jwt_decode(loggedIn);
	window.location =
		decoded.userRole === "admin"
			? "./andela-developer-challenge/admin/index.html"
			: "./andela-developer-challenge/attendant/index.html";
}

