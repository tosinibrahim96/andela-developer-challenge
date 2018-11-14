const loginForm = document.querySelector(".login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginError = document.querySelector(".login-error");
loginForm.addEventListener("submit", event => {
  fetch("https://andela-developer-challenge.herokuapp.com/api/v1/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ email: username.value, password: password.value })
	})
		.then(res => res.json())
		.then(data => {
      if (data.message !== "Login Successful") {
				loginError.style.display = " block";
				setTimeout(() => {
					loginError.style.display = "none";
				}, 3000);
			} else {
				localStorage.setItem("authToken", data.token);
				const decoded = jwt_decode(data.token);
				window.location = decoded.userRole === "admin" ? "./andela-developer-challenge/admin/index.html" : "./andela-developer-challenge/attendant/index.html";
			}
		})
		.catch(error => console.log(error.message));
	event.preventDefault();
});
