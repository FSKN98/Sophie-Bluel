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

    /*<button class="modalButton modalTrigger">modifier</button>;
    var modifierModal = document.createElement("button");
    modifierModal.class = "modalButton modalTrigger";
    modifierModal.innerHTML = "modifier";
    iconePensil2.appendChild(modifierModal);*/

    var liElement = document.createElement("li");
    var aElement = document.createElement("a");
    aElement.className = "logout";

    aElement.title = "Deconnexion";
    aElement.innerHTML = "logout";
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

  function logout() {
    // Supprimer les informations d'identification stockées
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    // Rediriger l'utilisateur vers la page de connexion
    window.location.href =
      "file:///C:/Users/33778/Documents/OPENCLASSROOMS/PROJET%20N%C2%B06/projet%20n%C2%B06/Portfolio-architecte-sophie-bluel/FrontEnd/assets/login.html";
  }
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
  var e = document.getElementsByClassName("worksImgContainer")[0];

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
          iconeDelete.addEventListener("click", () => goToAddForm(), false);
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

/* Bouton "Ajouter une photo" */

var addButton = document.createElement("button");
addButton.className = "addWorksButton";
addButton.innerHTML = "Ajouter une photo";
addButton.addEventListener("click", () => goToAddForm(), false);
document.getElementsByClassName("workButtonModal")[0].appendChild(addButton);

/* Affichage de la modal, et création du contenu de la galerie*/
function toggleModal() {
  modalContainer.classList.toggle("active");
  firstModal();
}
const goToAddForm = () => {
  console.log("je suis dans le formulaire d ajout");
  var e = document.getElementsByClassName("worksImgContainer")[0];

  //Pour supprimer ce qu'il y avait avant
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  /* Boutton précédent */
  var iconeReturn = document.createElement("i");
  iconeReturn.className = "fa-solid fa-arrow-left goBackModal";
  /* Pour retourner à la premère modal */
  iconeReturn.addEventListener("click", () => firstModal(), false);
  e.appendChild(iconeReturn);

  document.getElementsByClassName("titleModal")[0].innerHTML = "Ajout photo";
  var inputImage = document.createElement("input");
  inputImage.type = "file";
  inputImage.name = "Add-Image";
  inputImage.className = "addPhoto";

  /*Créé label pour lier au boutton */

  var labelAddButton = document.createElement("label");
  labelAddButton.htmlFor = "Add-Image";

  var divAddButton = document.createElement("div");
  divAddButton.className = "addPhotoTest";
  labelAddButton.appendChild(divAddButton);

  var divImgAddButton = document.createElement("div");
  divImgAddButton.className = "fa-solid fa-image photoIcone";
  divAddButton.appendChild(divImgAddButton);

  var buttonAddButton = document.createElement("button");
  buttonAddButton.textContent = "+ Ajouter photo";
  buttonAddButton.className = "buttonAddButton";
  divAddButton.appendChild(buttonAddButton);

  var labelCategory = document.createElement("label");
  labelCategory.for = "category";
  labelCategory.innerHTML = "Cathégories";

  var labelTitle = document.createElement("label");
  labelTitle.for = "title";
  labelTitle.innerHTML = "Titre";

  var inputTitle = document.createElement("input");
  inputTitle.name = "title";
  inputTitle.className = "input";

  var inputCategory = document.createElement("input");
  inputCategory.name = "category";
  inputCategory.className = "input";

  e.appendChild(inputImage);
  e.appendChild(labelAddButton);
  e.appendChild(labelTitle);
  e.appendChild(inputTitle);
  e.appendChild(labelCategory);
  e.appendChild(inputCategory);
};

var deleteGalery = document.createElement("button");
deleteGalery.className = "deleteGalery";
deleteGalery.innerHTML = "Supprimer la galerie";
deleteGalery.addEventListener("click", () => goToAddForm(), false);
document.getElementsByClassName("workButtonModal")[0].appendChild(deleteGalery);
