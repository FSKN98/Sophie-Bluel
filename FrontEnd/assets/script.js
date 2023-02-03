let modal = null;

const createModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;

  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  console.log("j'ai cliqué sur le bouton");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
};
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal = null;
};
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", createModal);
});
const checkIsLogin = () => {
  let token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    /*<div id="nav-admin" class="display-none">
      <button id="btn-edit">
        <i class="fa-regular fa-pen-to-square"></i>Mode édition
      </button>
      <button id="btn-publish-changes">
        <a href="#" class="text-decoration-none">
          publier les changements
        </a>
      </button>
    </div>;*/
    // Créer DIV
    // Donner un ID
    // Donner une classname
    // Créer bouton 1, donner classname
    // Créer icone fontawesome , donner classname
    // Donner le incone 1 en enfant de bouton 1
    // Creer bouton 2, donner classname
    // Creer un A, donner href et classname
    // Donner à A enfant de boutton 2
    // Ensuite les 2 boutons les donner en enfant à la DIV que j'ai crée
    // Recuperer la DIV avec l'ID admin-bar-container
    // Donner la DIV que je viens de créer en enfant à la div que j'ai récupérer par l'ID (ligne 36)
    // BARRE NAV /
    // DIV //
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
    var iconePensil2 = document.createElement("i");
    iconePensil2.className = "fa-regular fa-pen-to-square";
    iconePensil2.addEventListener("click", createModal, false);

    document.getElementById("projets").appendChild(iconePensil2);

    // BOUTON 1 //
    /*var button1 = document.createElement("button"); // Créer un élément <button>
    var t = document.createTextNode("Mode édition"); // Créer un noeud textuel

    document.body.appendChild(button1); // Ajoute la balise <button> à la balise <body>

    // ICONE FONTAWESOME //

    // BOUTON 2 //
    var button2 = document.createElement("button");
    var t = document.createTextNode("Mode édition");

    document.body.appendChild(button2);

    // A //
    var linkElement = document.createElement("a");
    linkElement.className = "linkNav";
    linkElement.href = "#";
    linkElement.innerHTML = "publier les changements";*/

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
