if (addAttendantForm) {
  addAttendantForm.addEventListener("submit", event => {
    fetch(
			"https://andela-developer-challenge.herokuapp.com/api/v1/auth/signup/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					token: localStorage.getItem("authToken")
				},
				body: JSON.stringify({
					email: attendantMail.value,
					password: attendantPassword.value,
					first_name: attendantName.value,
					mobile_number: attendantContact.value,
					image_url: attendantImage.value
				})
			}
		)
			.then(res => res.json())
			.then(data => {
				if (data.rows) {
					location.reload();
				}
			})
			.catch(error => console.log(error));
    event.preventDefault();
  });
}


const createAttendantPicture = (data, index) => {
  const attendantBlock = document.createElement("div");
  const attendantPicBLock = document.createElement("div");
  const imageOfattendant = document.createElement("img");
  const attendantInfo = document.createElement("div");
  const titleText = document.createElement("h6");
  const descriptionList = document.createElement("ul");
  const deleteButton = document.createElement("button");
  const identifier = document.createElement("input");
  const allContainer = document.querySelector(".attendant-info-container");

  attendantBlock.classList.add("attendant-product-block");
  attendantPicBLock.classList.add("pic-block", "product-pic-block", "att-info");
  attendantInfo.classList.add("info");
  descriptionList.classList.add("description", "description-list");
  titleText.classList.add("title");
  deleteButton.classList.add("delete");

  identifier.value = data.id;
  identifier.style.display = "none";
  titleText.innerText = data.first_name;
  imageOfattendant.alt = "Attendant Image";
  imageOfattendant.src = data.image_url;

  for (let index = 0; index < 4; index++) {
    const attendantList = document.createElement("li");
    const spanElement = document.createElement("span");

    if (index == 0) {
      const mailText = document.createElement("strong");
      mailText.innerHTML = "Mail:";
      spanElement.innerHTML = data.email;
      attendantList.appendChild(mailText);
      attendantList.appendChild(spanElement);
      descriptionList.appendChild(attendantList);
    } else if (index == 1) {
      const mobileText = document.createElement("strong");
      spanElement.innerHTML = data.mobile_number;
      mobileText.innerHTML = "Contact:";
      attendantList.appendChild(mobileText);
      attendantList.appendChild(spanElement);
      descriptionList.appendChild(attendantList);
    } else if (index == 2) {
      const salesText = document.createElement("strong");
      spanElement.innerHTML = `$ ${data.sales}`;
      salesText.innerHTML = "Sales:";
      attendantList.appendChild(salesText);
      attendantList.appendChild(spanElement);
      descriptionList.appendChild(attendantList);
    } else if (index == 3) {
      deleteButton.innerText = "Delete";
      deleteButton.appendChild(identifier);
      attendantList.appendChild(deleteButton);
      descriptionList.appendChild(attendantList);
    }
  }

  attendantInfo.appendChild(titleText);
  attendantInfo.appendChild(descriptionList);
  attendantPicBLock.appendChild(imageOfattendant);
  attendantPicBLock.appendChild(attendantInfo);
  attendantBlock.appendChild(attendantPicBLock);
  allContainer.appendChild(attendantBlock);
};

const deleteAttendant = (id) => {
  fetch(
    `https://andela-developer-challenge.herokuapp.com/api/v1/users/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("authToken")
      }
    }
  )
    .then(res => res.json())
    .then(data => {
      if (data.Message == "User deleted successfuly") {
        location.reload();
      }
    })
    .catch(error => console.log(error));
}


if (attendantIndex) {
  const modalIdentifier = document.getElementById("modal-identifier");
  modalIdentifier.style.display = "none";
  fetch("https://andela-developer-challenge.herokuapp.com/api/v1/users", {
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
					createAttendantPicture(data.rows[index], index);
				}
				$(".delete").click(function() {
					// Get the value of textbox inside d delete button clicked
					$(".deleteModal").fadeIn(200);
					modalIdentifier.value = this.children[0].value;
				});

				$(".closeModal").click(function() {
					$(".deleteModal").hide("fast");
				});
				$(".close").click(function() {
					$(".deleteModal").hide("fast");
				});
				$(".modal-delete").click(function() {
					deleteAttendant(modalIdentifier.value);
				});
			}
		})
		.catch(error => console.log(error));
}
