const baseUrl = "https://api.football-data.org/v2/";
const token = "f4a2a5a1fd744a7486cb90a453f32323";
const id_liga = [2001, 2002, 2003, 2021, 2014, 2015, 2019];
let idbase = [];

const randomLiga = () => {
  const index = Math.floor(Math.random() * 7);
  console.log(index);
  return id_liga[index];
};

const url = `${baseUrl}competitions/${randomLiga()}/standings`;
const score = `${baseUrl}competitions/SA/scorers?limit=20`;

const getDataKompetisi = (url) => {
  return fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "X-Auth-Token": token,
    },
  }).then((response) => response.json());
};

const getDataFootball = () => {
  if ("caches" in window) {
    for (let index = 0; index < id_liga.length; index++) {
      caches
        .match(`${baseUrl}competitions/${id_liga[index]}/standings`)
        .then(function (res) {
          if (res) {
            res.json().then((data) => {
              console.log(data);
              setDataKlasmenLiga(data);
              getDataKompetisi(url).then((data) => {
                setDataKlasmenLiga(data);
              });
              return;
            });
          }
        });
    }
  }
  getDataKompetisi(url).then((data) => {
    setDataKlasmenLiga(data);
  });
};

const getDataScore = () => {
  if ("caches" in window) {
    caches.match(score).then(function (res) {
      if (res) {
        res.json().then((data) => {
          console.log(data);
          setDataScore(data);
          return;
        });
      }
    });
  }
  getDataKompetisi(score).then((data) => {
    setDataScore(data);
  });
};
{/* <div class="center-align"><a href="#Teams" class="waves-effect waves-light navy-blue btn-small"><i class="material-icons right">add</i>Tambahkan</a></div> */}

const getSavedTeam = () => {
  cardHtml = "";
  idbase = getAllDataLove();
  idbase.then((e) => {
    if (e== "") {
      cardHtml += `<h5 class="center-align grey-text">Anda belum menambahkan Team Favorite</h5>`
    } else {
      e.forEach((item) => {
        cardHtml += `<div class="col s12 m4">
                    <div class="card">
                        <div class="card-image">
                            <img src="${item.crestUrl}" width="150px">
                            <a class="btn-floating btn-floating-delete halfway-fab waves-effect waves-light red"><i data-id="${item.id}" data-name="${item.name}" class="material-icons">delete_forever</i></a>
                        </div>
                        <div class="card-content">
                            <h6 class="black-text font-weight-bold">${item.name}</h6>
                        </div>
                    </div>
                </div>`;
      });
    }
    document.getElementById("FavoritCard").innerHTML = cardHtml;
    btnDeleteFunction();
  });
};

const btnSaveFunction = () => {
  Array.from(document.getElementsByClassName("btn-floating-save")).forEach(
    function (element) {
      element.addEventListener("click", (e) => {
        checkIDTeam(e.target.getAttribute("data-id").toString()).then(
          (status) => {
            if (status) {
              M.toast({ html: `Sudah ada di favorite!!` })
              if (Notification.permission === "granted") {
                navigator.serviceWorker.ready.then((regist) => {
                  regist.showNotification(
                    `Tim ${e.target.getAttribute("data-name")} Gagal disimpan`,
                    {
                      body: `${e.target.getAttribute(
                        "data-name"
                      )} sudah pernah di simpan`,
                      icon: "/Images/Icon/MS_ICON.png",
                      badge: "/Images/Favicon/ms-icon-144x144.png",
                    }
                  );
                });
              }
            } else {
              SaveFootBall({
                id: e.target.getAttribute("data-id"),
                name: e.target.getAttribute("data-name"),
                crestUrl: e.target.getAttribute("data-crestUrl"),
              });
            }
          }
        );
      });
    }
  );
};

const btnDeleteFunction = () => {
  Array.from(document.getElementsByClassName("btn-floating-delete")).forEach(
    (elm) => {
      elm.addEventListener("click", (e) => {
        deleteData(
          e.target.getAttribute("data-id"),
          e.target.getAttribute("data-name")
        ).then((e) => {
          getSavedTeam();
        });
      });
    }
  );
};

const setDataKlasmenLiga = (data) => {
  // console.log(data);
  let cardHtml = "";
  for (let index = 0; index < data.standings.length; index++) {
    let type = data.standings[index].type;
    data.standings[index].table.forEach((value) => {
        cardHtml += `
              <div class="col s12 m4">
                  <div class="card">
                      <div class="card-image">
                          <img src="${value.team.crestUrl}" width="150px">
                          <a class="btn-floating btn-floating-save halfway-fab waves-effect waves-light orange"><i data-id="${value.team.id}" data-name="${value.team.name}" data-crestUrl="${value.team.crestUrl}" class="material-icons">add</i></a>
                      </div>
                      <div class="card-content">
                          <h6 class="black-text font-weight-bold">${value.team.name}</h6>
                          <br/>
                          <b>Type : ${type}</b>
                          <table>
                                  <tbody>
                                  <tr>
                                      <td>Bermain</td>
                                      <td>:</td>
                                      <td>${value.playedGames}</td>
                                  </tr>
                                  <tr>
                                      <td>Menang</td>
                                      <td>:</td>
                                      <td>${value.won}</td>
                                  </tr>
                                  <tr>
                                      <td>Seri</td>
                                      <td>:</td>
                                      <td>${value.draw}</td>
                                  </tr>
                                  <tr>
                                      <td>Kalah</td>
                                      <td>:</td>
                                      <td>${value.lost}</td>
                                  </tr>
                                  <tr>
                                      <td>Poin</td>
                                      <td>:</td>
                                      <td>${value.points}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          `;
    });
    document.getElementById('progress').style.display = 'none'
    document.getElementById("teams").innerHTML = cardHtml;
    btnSaveFunction();
  }
};
const setDataScore = (data) => {
  // console.log(data);
  let tableHTML = "";
  data.scorers.forEach((e, i) => {
    tableHTML += `<tr><td>${i + 1}</td><td>${e.team.name}</td><td>${
      e.numberOfGoals
    }</td><td>${e.player.name}</td><td>${e.player.position}</td><td>${
      data.season.startDate
    }</td><td>${data.season.endDate}</td></tr>`;
  });
  document.getElementById('progress').style.display = 'none'
  document.getElementById("klasmen").innerHTML = tableHTML;
};
