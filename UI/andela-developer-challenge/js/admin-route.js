const decoded = jwt_decode(loggedIn);
console.log(decoded);
if (decoded.userRole !== "admin") {
  window.location = "/access-denied.html"
}

