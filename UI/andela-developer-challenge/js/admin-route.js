const decoded = jwt_decode(loggedIn);

if (decoded.userRole !== "admin") {
  window.location = "/access-denied.html"
}
