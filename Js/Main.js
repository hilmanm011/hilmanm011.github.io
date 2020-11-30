document.addEventListener("DOMContentLoaded", function () {
  const el = document.querySelectorAll(".sidenav");
  M.Sidenav.init(el);
  loadNav();

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) {
          return;
        } else {
          document.querySelectorAll(".sidenav, .menunav").forEach((elm) => {
            elm.innerHTML = xhttp.responseText;
          });

          document.querySelectorAll(".sidenav a, .menunav a").forEach((elm) => {
            elm.addEventListener("click", (e) => {
              const sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();
              console.log(e.target);
              page = e.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
        }
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  let page = window.location.hash.substr(1);
  if (page === "") page = "Teams";

  const loadPage = (page) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 3) {
        const content = document.querySelector("#root");
        if (page == "Teams") {
          getDataFootball();
        } else if (page == "Klasmen") {
          getDataScore();
        } else if (page == "Favorit") {
          getSavedTeam();
        }
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<h1>Halaman Tidak Ditemukan</h1>";
        } else {
          content.innerHTML = "<h1>Halaman tidak dapat di load</h1>";
        }
      }
    };
    xhttp.open("GET", "Pages/" + page + ".html", true);
    xhttp.send();
  };

  loadPage(page);
});
