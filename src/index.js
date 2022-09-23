let addToy = false;
let idCount = 0

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
      idCount = json.length
      displayToys(json)
    })

    
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  let createToyBtn = document.getElementsByClassName('add-toy-form')[0]
  createToyBtn.addEventListener('submit', createToy)
});

function displayToys(array) {
  for (i of array) {
    toyCard(i)
  }
}

function toyCard(object) {
  let toyCollection = document.getElementById("toy-collection")
  let toy = document.createElement("div")
  toy.className = "card"

  let toyName = document.createElement('h2')
  toyName.innerHTML = object.name
  toy.appendChild(toyName)

  let toyImage = document.createElement('img')
  toyImage.src = object.image
  toyImage.className = "toy-avatar"
  toyImage.alt = "Invalid Url Provided"
  toy.appendChild(toyImage)

  let toyLikes = document.createElement('p')
  toyLikes.id = `${object.id}toy-likes`
  toyLikes.innerHTML = object.likes
  toy.appendChild(toyLikes)

  let likeButton = document.createElement('button')
  likeButton.innerHTML = "Add Like"
  likeButton.className = `${object.id}like-btn`
  likeButton.id = object.id
  likeButton.addEventListener('click', increaseLikes)
  toy.appendChild(likeButton)

  toyCollection.appendChild(toy)
}

function increaseLikes(e) {
  let likes = document.getElementById(`${e.target.id}toy-likes`)

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: parseInt(likes.innerHTML) + 1,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

  likes.innerHTML = parseInt(likes.innerHTML) + 1
}

function createToy(e) {
  e.preventDefault()
  let nameInput = document.getElementsByClassName("input-text")[0]
  let urlInput = document.getElementsByClassName("input-text")[1]
  idCount += 1

  let object = {"name": nameInput.value, "image": urlInput.value, "likes": 0, "id": idCount}

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json",
    },
    body: JSON.stringify(object) 
  })
    .then((response) => response.json())
    .then((data) => {
      toyCard(object);
    })
}