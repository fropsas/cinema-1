/**
 * Это заглушки данных, которые мы как будто получили со стороннего сервиса
 * В списке фильмов есть новинки (3 фильма с полем filmNew:true)
 * а так же фильмы в прокате (все фильмы с полем filmHire:true)
 * их нужно будет рассортировать для таблицы и мозайки внизу
 *
 * Жанры заданы отдельным справочником. Здесь представлен несколько
 * отличающийся от лекции способ, но суть остается той же. Когда с
 * сервера приходят данные, по некоторым полям (например, как у нас genre)
 * приходят просто идентификаторы (числа). С помощью этих идентификаторов
 * можно получить текстовые представления, сделав другой запрос на сервер
 * к справочнику ( у нас это пока заглушка const genres );
 */

const mock = [
    {
        name: "Человек-паук",
        start: "10:00",
        kinopoisk: 'https://kinopoisk.ru',
        genre: [0, 1, 2],
        filmHire: true,
        filmNew: true,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias, animi, commodi eius",
        image: "img/movie/mov1.jpg", //для д.з. CA
        fb: "https://fb.com",
        twitter: "https://twitter.com",
        behance: "https://www.behance.net",
        dribbble: "https://dribbble.com/"
    },
    {
        name: "Собачья жизнь 2",
        start: "12:00",
        kinopoisk: 'https://kinopoisk.ru',
        genre: [3, 4, 5],
        filmHire: true,
        filmNew: true,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias, animi, commodi eius",
        image: "img/movie/mov2.jpg", //для д.з. CA
        fb: "https://fb.com",
        twitter: "https://twitter.com",
        behance: "https://www.behance.net",
        dribbble: "https://dribbble.com/"
    },
    {
        name: "История игрушек 4",
        start: "14:00",
        kinopoisk: 'https://kinopoisk.ru',
        genre: [6, 3, 5],
        filmHire: true,
        filmNew: false,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias, animi, commodi eius",
        image: "", //для д.з. CA
        fb: "https://fb.com",
        twitter: "https://twitter.com",
        behance: "https://www.behance.net",
        dribbble: "https://dribbble.com/"
    },
    {
        name: "Люди в чёрном: Интернэшнл",
        start: "16:00",
        kinopoisk: 'https://kinopoisk.ru',
        genre: [0, 1, 5],
        filmHire: true,
        filmNew: true,
        description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci alias, animi, commodi eius",
        image: "img/movie/mov3.jpg", //для д.з. CA
        fb: "https://fb.com",
        twitter: "https://twitter.com",
        behance: "https://www.behance.net",
        dribbble: "https://dribbble.com/"
    }
];

//справочник жанров (шаг5) - так часто работают сервисы
const genres = [
    {
        id: 0,
        name: "фантастика"
    },
    {
        id: 1,
        name: "боевик"
    },
    {
        id: 2,
        name: "приключения"
    },
    {
        id: 3,
        name: "фэнтези"
    },
    {
        id: 4,
        name: "драма"
    },
    {
        id: 5,
        name: "комедия"
    },
    {
        id: 6,
        name: "мультфильм"
    }
];

//так делали на лекции. Более простой вариант
/*
const ganars = [
    'Фантастика', // 0
    'Боевик',     // 1
    'Фэнтези',    // 2
    'Драма',      // 3
    'Комедия',    // 4
    'Мультфильм'  // 5
  ]
*/

//массивы для хранения отсортированных данных
let filmsNew = [],
    filmsHire = [];

for (let i = 0; i < mock.length; i++) {
    let currentFilm = mock[i];

    if (currentFilm.filmHire) {
        filmsHire.push(currentFilm);
    }

    if (currentFilm.filmNew) {
        filmsNew.push(currentFilm);
    }
}

//объект-обертка для универсализации работы с данными
const film = {
    getName: function() {
        return this.name;
    },

    getStart: function() {
        return this.start;
    },

    // метод получения жанра шаг 6
    getGanre: function() {
        //хранит текущие идентификаторы жанров. Здесь тоже используется this!
        const ganarsIds = this.genre;

        //вспомогательный массив, который будет хранить текстовые описания жанров
        let arrGanars = [];

        //проходим по id шникам жанров
        for (let i = 0; i < ganarsIds.length; i++) {
            let currentId = ganarsIds[i];

            //так делали на лекции
            //arrGanars.push( genres[currentId] );

            //@see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/find
            let genreText = genres.find(
                //el содержит текущий элемент перебираемого массива genres
                function(el) {
                    //если условие выполняется, то возвращается проверяемый элемент
                    return el.id == currentId;
                }
            ).name; //элементом genres является объект справочника { id:..., name... }, на этом объекте
            // берем поле name и сохраняем как genreText;

            arrGanars.push(genreText); //добаляем полученный genreText во вспомогательный массив
        }

        //текстовое представление жанров
        //@see https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/join
        let strGanars = arrGanars.join(", ");
        return strGanars;
    },
    renderFilmRow() {
        let filmName = this.name,
            filmStart = this.start,
            filmGanars = film.getGanre.apply(this),
            filmHTML = `
            <td class="movie-list__table__cell movie-list__table__cell_body movie-list__table__cell_body_time">${filmStart}</td>
            <td class="movie-list__table__cell movie-list__table__cell_body movie-list__table__cell_body_movieheader">${filmName}</td>
            <td class="movie-list__table__cell movie-list__table__cell_body movie-list__table__cell_body_order">${filmGanars}</td>
          `;
        return filmHTML;
    },

    renderFilmBlock() {
        let filmName = this.name,
            filmImage = this.image,
            filmDescription = this.description,
            filmKPLink = this.kinopoisk,
            filmFb = this.fb,
            filmTw = this.twitter,
            filmBh = this.behance,
            filmBbb = this.dribbble,
            filmHTML = `

                <div class="movies-flex__card">
                    <img class="movies__card__img" src="${filmImage}" alt="${filmName}"/>
                    <div class="movies__card__descr">
                        <div class="movies__card__name">
                            <a
                                href="${filmKPLink}"
                                target="_blank"
                                title="Кинотеатр в Иннополисе"
                            >
                                ${filmName}
                            </a>
                        </div>
                        <div class="movies__card__limiter"></div>
                        <div class="movies__card__about">
                            ${filmDescription}
                        </div>
                        <div class="movies__card__socials">
                            <a href="${filmFb}" target="_blank">
                                <img class="movies__card__social" src="img/socials/facebook.svg" alt="${filmName} в facebook">
                            </a>
                            <a href="${filmTw}" target="_blank">
                                <img class="movies__card__social" src="img/socials/twitter.svg" alt="${filmName} в twitter">
                            </a>
                            <a href="${filmBh}" target="_blank">
                                <img class="movies__card__social" src="img/socials/behance.svg" alt="${filmName} в behance">
                            </a>
                            <a href="${filmBbb}" target="_blank">
                                <img class="movies__card__social" src="img/socials/dribbble.svg" alt="${filmName} в dribbble">
                            </a>
                        </div>
                    </div>
                </div>
          `;
        return filmHTML;
    }
};

let tableDOM = document.getElementById("movie-shedule");
for (let i = 0; i < filmsHire.length; i++) {
    let currentFilm = filmsHire[i],
        filmRowHTML = film.renderFilmRow.bind(currentFilm)(),
        tr = document.createElement("tr");
        tr.classList.add('movie-list__table__row');
    if (i % 2 == 0)
        tr.classList.add('even');
    else
        tr.classList.add('odd');
    tr.innerHTML = filmRowHTML;
    tableDOM.appendChild(tr);
}

let mosaicDOM = document.getElementById("movies_container");
for (let i = 0; i < filmsNew.length; i++) {
    let currentFilm = filmsNew[i],
        filmBlockHTML = film.renderFilmBlock.bind(currentFilm)(),
        div = document.createElement("div");


    div.classList.add("movies-flex__card-wrapper");
    div.innerHTML = filmBlockHTML;
    mosaicDOM.appendChild(div);

}
    
    movies_container = $("#movies_container").owlCarousel({
        nav: true,
        navText: ["<i class='icon icon-left'></i>","<i class='icon icon-right'></i>"]
    });
