let api = "https://swapi.dev/api/";
let selectedUrl;
let url = api + "people/?search=";
let ul = document.querySelector('.search_result');
let select = document.querySelector('#select');
let errorMsg = document.querySelector('.error');
let searchBtn = document.querySelector('.button');
let persData = document.querySelector('.person_data');
let persFilmsCount = document.querySelector('#films_count');
let persFilmsCountValue = document.querySelector('#films_count-value');


// ========
select.addEventListener('change', () => {
  searchResultClear();
  personDataClear();
  selectSearch()
});

function selectSearch() {
  if (select.value === "Корабль") {
    selectedUrl = "starships/?search=";
    url = api + selectedUrl;
  } else if (select.value === "Планета") {
    selectedUrl = "planets/?search=";
    url = api + selectedUrl;
  } else if (select.value === "Персонаж") {
    selectedUrl = "people/?search=";
    url = api + selectedUrl;
  } else {
    selectedUrl = "people/?search=";
    url = api + selectedUrl;
  }
}
selectSearch()
// ========

let searchName = document.querySelector('.person_search');


searchBtn.addEventListener('click', () => {
  url += searchName.value;
  var request = new XMLHttpRequest();

  request.addEventListener("load", function () {
    var response = JSON.parse(request.response);

    if (request.status !== 200) {
      alert(
        "Произошла ошибка при получении ответа от сервера:\n\n" +
        response.message
      );
      return;
    }

    if (response.count == 0) {
      errorMsg.innerHTML = 'Ничего не найдено, попробуйте еще раз!';
      return;
    }
    let li;
    /*Корабли*/
    if (select.value === "Корабль") {
      for (let i in response.results) {
        li = document.createElement('li');
        ul.append(li);
        li.innerHTML = `${response.results[i]["name"]} &#x203A;`;
        li.addEventListener('click', () => {
          personDataClear()
          let ship = document.createElement('div')
          persData.appendChild(ship);
          ship.innerHTML = ` Название: ${response.results[i]["name"]}.`;

          let model = document.createElement('div')
          persData.appendChild(model);
          model.innerHTML = `Модель: ${response.results[i]["model"]}.`;

          let crew = document.createElement('div')
          persData.appendChild(crew);
          crew.innerHTML = `Экипаж: ${response.results[i]["crew"]} чел.`;

          let cargo = document.createElement('div')
          persData.appendChild(cargo);
          cargo.innerHTML = `Грузовместимость:  ${response.results[i]["cargo_capacity"]} кг.`;

          let length = document.createElement('div')
          persData.appendChild(length);
          length.innerHTML = `Длина: ${response.results[i]["length"]} м.`;

          let speed = document.createElement('div')
          persData.appendChild(speed);
          speed.innerHTML = `Максимальная скорость: ${response.results[i]["max_atmosphering_speed"]} км/ч.`;

          let persFilmsCount = document.createElement('div')
          persData.appendChild(persFilmsCount);
          persFilmsCount.innerHTML = `Появлялся в ${response.results[i]["films"]["length"]} фильмах`;
        });
      };


      /*Планеты*/
    } else if (select.value === "Планета") {
      for (let i in response.results) {
        li = document.createElement('li');
        ul.append(li);
        li.innerHTML = `${response.results[i]["name"]} &#x203A;`;

        li.addEventListener('click', () => {
          personDataClear()
          let name = document.createElement('div')
          persData.appendChild(name);
          name.innerHTML = `Имя планеты: ${response.results[i]["name"]}.`;

          let population = document.createElement('div')
          persData.appendChild(population);
          population.innerHTML = `Население: ${response.results[i]["population"]} чел.`;

          let diameter = document.createElement('div')
          persData.appendChild(diameter);
          diameter.innerHTML = `Диаметр: ${response.results[i]["diameter"]} км.`;

          let climate = document.createElement('div')
          persData.appendChild(climate);
          climate.innerHTML = `Климат :${response.results[i]["climate"]}.`;

          let persFilmsCount = document.createElement('div')
          persData.appendChild(persFilmsCount);
          persFilmsCount.innerHTML = `Появлялся в ${response.results[i]["films"]["length"]} фильмах`;
        });
      };
      /*Персонажи*/
    } else if (select.value === "Персонаж") {

      for (let i in response.results) {
        li = document.createElement('li');
        ul.append(li);
        li.innerHTML = `${response.results[i]["name"]} &#x203A;`;

        li.addEventListener('click', () => {
          personDataClear()
          let name = document.createElement('div')
          persData.appendChild(name);
          name.innerHTML = `Имя: ${response.results[i]["name"]}`;


          let height = document.createElement('div')
          persData.appendChild(height);
          height.innerHTML = `Рост: ${response.results[i]["height"]} см`;


          let mass = document.createElement('div')
          persData.appendChild(mass);
          mass.innerHTML = `Вес: ${response.results[i]["mass"]} кг`;


          let persBirthYear = document.createElement('div')
          persData.appendChild(persBirthYear);
          persBirthYear.innerHTML = `Год рождения: ${response.results[i]["birth_year"]}`;


          let persFilmsCount = document.createElement('div')
          persData.appendChild(persFilmsCount);
          persFilmsCount.innerHTML = `Появлялся в ${response.results[i]["films"]["length"]} фильмах`;

        });
      };
    };

    errorMsg.innerHTML = '';
    console.log(response.results);
  });

  request.open("get", url);
  request.send();

  searchName.value = '';
  url = api + selectedUrl;

});

function personDataClear() {
  persData.innerHTML = '';
}
function searchResultClear() {
  ul.innerHTML = '';
}