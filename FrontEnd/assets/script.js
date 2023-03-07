let categories = []

const checkIsLogin = () => {
  let token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    var navElement = document.createElement("div");
    navElement.className = "navigation";
    // BOUTON 1 ET ICONE PENSIL//
    var button1 = document.createElement("div");

    var iconePensil = document.createElement("i");
    iconePensil.className = "fa-regular fa-pen-to-square";
    button1.appendChild(iconePensil);

    var textButton1 = document.createElement("div");
    textButton1.innerHTML = "Mode édition";
    button1.appendChild(textButton1);
    button1.className = "btn-edit";
    navElement.appendChild(button1);
    // BOUTON 2 //
    var button2 = document.createElement("button");

    button2.textContent = "publier les changements";
    button2.className = "btn-publish-changes";
    navElement.appendChild(button2);

    document.getElementById("admin-bar-container").appendChild(navElement);

    // BOUTON MODIFIER //
    var iconePensil2 = document.createElement("button");
    iconePensil2.className = "fa-regular fa-pen-to-square";

    //iconePensil2.addEventListener("click", createModal, false);

    document.getElementById("modifier").appendChild(iconePensil2);

    var liElement = document.createElement("li");
    var aElement = document.createElement("a");
    aElement.className = "logout";

    aElement.title = "Deconnexion";
    aElement.innerHTML = "logout";
    aElement.addEventListener("click", () => logout(), false);
    liElement.appendChild(aElement);

    document.getElementsByClassName("navigationMenu")[0].appendChild(liElement);
  } else {
    var liElement = document.createElement("li");
    var aElement = document.createElement("a");
    aElement.className = "login";
    aElement.href = "./assets/login.html";
    aElement.title = "Se rendre à la page connexion pour l'administrateur";
    aElement.innerHTML = "login";

    liElement.appendChild(aElement);
    document.getElementsByClassName("navigationMenu")[0].appendChild(liElement);
  }
  var liElement2 = document.createElement("li");
  var imgElement = document.createElement("img");

  imgElement.src = "./assets/icons/instagram.png";
  imgElement.alt = "instagram";
  liElement2.appendChild(imgElement);
  document.getElementsByClassName("navigationMenu")[0].appendChild(liElement2);

};
checkIsLogin();

const getCategories = () => {
  var element = document.createElement("li");

  element.className = "liFilters";
  element.innerHTML = "Tous";
  element.addEventListener("click", () => getWorksFilters(0), false);
  document.getElementById("filters").appendChild(element);
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((count) => {
      console.log(count);
categories = count

      //Fonction forEach pour créer autant d'élément que dans le tableau de l'API
      count.forEach((el) => {
        //Création des boutons
        var element = document.createElement("li");
        //<li></li>
        element.className = "liFilters";
        //<li class="liFilter"></li>
        element.innerHTML = el.name;
        //<li class="liFilter">objet</li>
        element.addEventListener("click", () => getWorksFilters(el.id), false);
        document.getElementById("filters").appendChild(element);
        //<ul id="filters" class="ulFilters"><li class="liFilter">objet</li></ul>
      });
    });
};
getCategories();

const getWorks = (filter) => {
  var e = document.getElementsByClassName("gallery")[0];

  //Pour supprimer ce qu'il y avait avant
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((count) => {
      console.log(count);

      function createWorksList() {
        count.forEach((el) => {
          const createFigureElement = () => {
            var figureElement = document.createElement("figure");
            var imageElement = document.createElement("img");
            var figcaptionElement = document.createElement("figcaption");
            imageElement.src = el.imageUrl;
            imageElement.alt = el.title;
            imageElement.crossOrigin = "anonymous";
            figcaptionElement.innerHTML = el.title;

            figureElement.appendChild(imageElement);
            figureElement.appendChild(figcaptionElement);
            document
              .getElementsByClassName("gallery")[0]
              .appendChild(figureElement);
          };
          if (filter !== 0) {
            if (filter === el.categoryId) {
              createFigureElement();
            }
          } else {
            createFigureElement();
          }
        });
      }
      createWorksList();
    });
};
getWorks(0);

const getWorksFilters = (filter) => {
  console.log(filter);
  getWorks(filter);
};
/* Création de la première modal */

const firstModal = () => {
  document.getElementsByClassName("titleModal")[0].innerHTML = "Galerie photo";
  var e = document.getElementsByClassName("worksImgContainer")[0];
  var b = document.getElementsByClassName("workButtonModal")[0];
  //var d = document.getElementsByClassName("deleteGalery")[0];

  //Pour supprimer ce qu'il y avait avant
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  var childButton = b.lastElementChild;
  while (childButton) {
    b.removeChild(childButton);
    childButton = b.lastElementChild;
  }
  /*var childDelete = d.lastElementChild;
  while (childDelete) {
    d.removeChild(childDelete);
    childDelete = d.lastElementChild;
  }*/
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((count) => {
      console.log(count);

      function createWorksList() {
        count.forEach((el) => {
          var figureElement2 = document.createElement("figure");
          figureElement2.className = "worksFigureContainer";
          var imageElement2 = document.createElement("img");
          imageElement2.src = el.imageUrl;
          imageElement2.alt = el.title;
          imageElement2.crossOrigin = "anonymous";

          imageElement2.className = "modalImgSize";
          figureElement2.appendChild(imageElement2);
          /*Icone delete*/
          var iconeDelete = document.createElement("button");
          iconeDelete.className = "fa-regular fa-trash-can deleteButtonWorks";
          iconeDelete.id = "delete-gallery";
          iconeDelete.addEventListener("click", () => deleteWork(el.id), false);
          figureElement2.appendChild(iconeDelete);

          /*icone large image */

          var iconeLarge = document.createElement("button");
          iconeLarge.className =
            "fa-solid fa-arrows-up-down-left-right largeButtonWorks";
          iconeLarge.addEventListener("click", () => goToAddForm(), false);
          figureElement2.appendChild(iconeLarge);

          var buttonGalleryElementModale = document.createElement("button");
          buttonGalleryElementModale.className = "edit-button-modale";
          buttonGalleryElementModale.innerText = "éditer";
          // Rattachement de la balise BUTTON à la section
          figureElement2.appendChild(buttonGalleryElementModale);

          document
            .getElementsByClassName("worksImgContainer")[0]
            .appendChild(figureElement2);
            
        });
        /* Bouton "Ajouter une photo" */

var addButton = document.createElement("button");
addButton.className = "addWorksButton";
addButton.innerHTML = "Ajouter une photo";
addButton.addEventListener("click", () => goToAddForm(), false);
document.getElementsByClassName("workButtonModal")[0].appendChild(addButton);

var deleteGalery = document.createElement("button");
deleteGalery.className = "deleteGalery";
deleteGalery.innerHTML = "Supprimer la galerie";
deleteGalery.addEventListener("click", () => goToAddForm(), false);
document.getElementsByClassName("workButtonModal")[0].appendChild(deleteGalery);
      }
      createWorksList();
    });
};

/* Modal */
const modalContainer = document.querySelector(".modalContainer");
const modalTriggers = document.querySelectorAll(".modalTrigger");
console.log(modalTriggers);
modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

/* Affichage de la modal, et création du contenu de la galerie*/
function toggleModal() {
  modalContainer.classList.toggle("active");
  firstModal();
}
const goToAddForm = () => {
  console.log("je suis dans le formulaire d ajout");
  var e = document.getElementsByClassName("worksImgContainer")[0];
  var b = document.getElementsByClassName("workButtonModal")[0];

  //Pour supprimer ce qu'il y avait avant
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  var childButton = b.lastElementChild;
  while (childButton) {
    b.removeChild(childButton);
    childButton = b.lastElementChild;
  }
  /* Boutton précédent */
  var iconeReturn = document.createElement("i");
  iconeReturn.className = "fa-solid fa-arrow-left goBackModal";
  /* Pour retourner à la premère modal */
  iconeReturn.addEventListener("click", () => firstModal(), false);
  e.appendChild(iconeReturn);

  /* Ajout photo deuxième modal */ 
  document.getElementsByClassName("titleModal")[0].innerHTML = "Ajout photo";
  
  var divContainer = document.createElement("div")
  divContainer.className="width100"

  var inputImage = document.createElement("input");
  inputImage.type = "file";
  inputImage.id="inputImage"
  inputImage.name = "image";
  inputImage.className = "addPhoto";

  /*Créé label pour lier au boutton */

  var labelAddButton = document.createElement("label");
  labelAddButton.htmlFor = "inputImage";

  var divAddButton = document.createElement("div");
  divAddButton.className = "addPhotoTest";
  labelAddButton.appendChild(divAddButton);

  var divImgAddButton = document.createElement("div");
  divImgAddButton.className = "fa-solid fa-image photoIcone";
  divAddButton.appendChild(divImgAddButton);

  var buttonAddButton = document.createElement("div");
  buttonAddButton.textContent = "+ Ajouter photo";
  buttonAddButton.className = "buttonAddButton";
  divAddButton.appendChild(buttonAddButton);

  var labelCategory = document.createElement("label");
  labelCategory.for = "category";

  labelCategory.innerHTML = "Catégories";

  var labelTitle = document.createElement("label");
  labelTitle.for = "title";
  labelTitle.innerHTML = "Titre";

  var inputTitle = document.createElement("input");
  inputTitle.name = "title";
  inputTitle.id="inputTitle"
  inputTitle.className = "input";

  var selectCategory = document.createElement("select");
  selectCategory.id ="categorySelect"
  selectCategory.name = "category";
  selectCategory.className = "input";
console.log(categories)
categories.forEach((el) => {

  var option = document.createElement("option");
  option.innerHTML = el.name;
  option.value=el.id
  option.className="options"
  selectCategory.appendChild(option);
});
 
  divContainer.appendChild(inputImage)
  divContainer.appendChild(labelAddButton)
  divContainer.appendChild(labelTitle);
  divContainer.appendChild(inputTitle);
  divContainer.appendChild(labelCategory);
  divContainer.appendChild(selectCategory);
  e.appendChild(divContainer)
  
  var addButton = document.createElement("button");
addButton.className = "addWorksButton";
addButton.innerHTML = "Valider";
addButton.addEventListener("click", () => addWork(event));
document.getElementsByClassName("workButtonModal")[0].appendChild(addButton);

};



/* Création fonction delete works */

const deleteWork =(id)=>{
  const token=localStorage.getItem("token")
console.log(id)
fetch("http://localhost:5678/api/works/"+id, {
  method: "DELETE",
  headers: {
    Authorization: "Bearer "+token,
    "Content-Type": "application/json",
   Accept: "application/json",
  },
})
.then (()=>{
  firstModal()
getWorks(0)
})
}

const logout =()=>{
  localStorage.removeItem("token")
  window.location.href = "./index.html";
}
const addWork =(event)=>{
  const token=localStorage.getItem("token")
  
  console.log("test")
  const category = document.getElementById("categorySelect");
  const title = document.getElementById("inputTitle");
  const image = document.getElementById("inputImage");
  console.log(image.value)
  event.preventDefault();
  const formData = new FormData();
	formData.append("image", image.files[0]);
	formData.append("title", title.value);
	formData.append("category", category.value);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer "+token,
      Accept: "application/json",
    },
    body: formData,
  })
    .then((res) => {
      if (res.ok) {
        const modalContainer = document.querySelector(".modalContainer");
        modalContainer.classList.toggle("active");
        getWorks(0)
        return res.json();
      } else {
        console.log(res.statusText);
        throw new Error(res.statusText);
      }
    })
    .then((work) => {
      console.log(work);
      if (work) {
        console.log(work);
      } else {
        throw new Error("Invalid response from server");
      }
    })
    .catch((error) => {
      console.log(error.message)   
      
    });

}