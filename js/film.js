var films = {
    kp_api_url: 'https://kinopoiskapiunofficial.tech/api/v2.1',
    kp_id_list: [
        568413,
        530,
        1045172,
        1005878,
        535341
    ],
    getFilmById: function (id) {
        return new Promise(function(resolve, reject) {
            fetch(`${films.kp_api_url}/films/${id}`, {
                headers: {
                "X-API-KEY": "5f2df07b-6b31-442c-a7f0-547a878cae6b"
                }
            }).then(response => response.json()).then(resolve)
        })
    },
    parseFilm: function (data) {
        data = data.data;
        let countries = '';
        let genres = '';
        console.log(data)
        data.genres.forEach(function(item){
            genres += `${item.genre} `
        })
        data.countries.forEach(function(item){
            countries += `${item.country} `
        })
        return {
            name: data.nameRu,
            country: countries,
            genre: data.genres,
            year: data.year,
            description: data.description,
            img: data.posterUrl,
            link: data.webUrl
        }
    },
    list: [
        {
            name: "Человек-паук",
            img: "img/movie/mov1.jpg",
            about: "More about selling in the Envato Marketplaces",
            link_kp: "https://www.kinopoisk.ru/film/838/",
            socials: {
                facebook: "#",
                twitter: "#",
                behance: "#",
                dribbble: "#"
            }
        },
        {
            name: "Собачья жизнь 2",
            img: "img/movie/mov2.jpg",
            about: "More about selling in the Envato Marketplaces",
            link_kp: "https://www.kinopoisk.ru/film/1122114/",
            socials: {
                facebook: "#",
                twitter: "#",
                behance: "#",
                dribbble: "#"
            }
        },
        {
            name: "Люди в черном: Интернэшнл",
            img: "img/movie/mov3.jpg",
            about: "More about selling in the Envato Marketplaces",
            link_kp: "https://www.kinopoisk.ru/film/693730/",
            socials: {
                facebook: "#",
                twitter: "#",
                behance: "#",
                dribbble: "#"
            }
        },
        {
            name: "Человек-паук",
            img: "img/movie/mov1.jpg",
            about: "More about selling in the Envato Marketplaces",
            link_kp: "https://www.kinopoisk.ru/film/838/",
            socials: {
                facebook: "#",
                twitter: "#",
                behance: "#",
                dribbble: "#"
            }
        },
        {
            name: "Собачья жизнь 2",
            img: "img/movie/mov2.jpg",
            about: "More about selling in the Envato Marketplaces",
            link_kp: "https://www.kinopoisk.ru/film/1122114/",
            socials: {
                facebook: "#",
                twitter: "#",
                behance: "#",
                dribbble: "#"
            }
        },
        {
            name: "Люди в черном: Интернэшнл",
            img: "img/movie/mov3.jpg",
            about: "More about selling in the Envato Marketplaces",
            link_kp: "https://www.kinopoisk.ru/film/693730/",
            socials: {
                facebook: "#",
                twitter: "#",
                behance: "#",
                dribbble: "#"
            }
        }
    ],
    target: "movies_container",
    loadfilms: function(callback) {
        this.list = [];
        this.kp_id_list.forEach(function(item){
            let film = films.getFilmById(item);
            film.then(result => {
                var prepareFilm = films.parseFilm(result);
                var c_mov = {
                    name: prepareFilm.name,
                    img: prepareFilm.img,
                    about: prepareFilm.description,
                    link_kp: "https://www.kinopoisk.ru/film/" + item,
                    socials: {
                        facebook: "#",
                        twitter: "#",
                        behance: "#",
                        dribbble: "#"
                    }
                }
                films.list.push(c_mov);
                var movies_flex = document.getElementById(films.target);
                movies_flex.innerHTML += `
                    <div class="movies-flex__card-wrapper">
                        <div class="movies-flex__card">
                            <img class="movies__card__img" src="${c_mov.img}" alt="${c_mov.name}"/>
                            <div class="movies__card__descr">
                                <div class="movies__card__name">
                                    <a
                                        href="${c_mov.link_kp}"
                                        target="_blank"
                                        title="Кинотеатр в Иннополисе"
                                    >
                                        ${c_mov.name}
                                    </a>
                                </div>
                                <div class="movies__card__limiter"></div>
                                <div class="movies__card__about">
                                    ${c_mov.about}
                                </div>
                                <div class="movies__card__socials">
                                    <a href="${c_mov.socials.facebook}" target="_blank">
                                        <img class="movies__card__social" src="img/socials/facebook.svg" alt="${c_mov.name} в facebook">
                                    </a>
                                    <a href="${c_mov.socials.twitter}" target="_blank">
                                        <img class="movies__card__social" src="img/socials/twitter.svg" alt="${c_mov.name} в twitter">
                                    </a>
                                    <a href="${c_mov.socials.behance}" target="_blank">
                                        <img class="movies__card__social" src="img/socials/behance.svg" alt="${c_mov.name} в behance">
                                    </a>
                                    <a href="${c_mov.socials.dribbble}" target="_blank">
                                        <img class="movies__card__social" src="img/socials/dribbble.svg" alt="${c_mov.name} в dribbble">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                if (films.kp_id_list.length == films.list.length)
                    if (callback)
                        callback();
            })
        });
    },
    show: function(callback) {
        var movies_flex = document.getElementById(films.target);
        movies_flex.innerHTML = "";
        this.loadfilms(callback);
        /*
        for (var i = 0; i < films.list.length; i++) {
            var c_mov = films.list[i];
            movies_flex.innerHTML += `
                <div class="movies-flex__card-wrapper">
                    <div class="movies-flex__card">
                        <img class="movies__card__img" src="${c_mov.img}" alt="${c_mov.name}"/>
                        <div class="movies__card__descr">
                            <div class="movies__card__name">
                                <a
                                    href="${c_mov.link_kp}"
                                    target="_blank"
                                    title="Кинотеатр в Иннополисе"
                                >
                                    ${c_mov.name}
                                </a>
                            </div>
                            <div class="movies__card__limiter"></div>
                            <div class="movies__card__about">
                                ${c_mov.about}
                            </div>
                            <div class="movies__card__socials">
                                <a href="${c_mov.socials.facebook}" target="_blank">
                                    <img class="movies__card__social" src="img/socials/facebook.svg" alt="${c_mov.name} в facebook">
                                </a>
                                <a href="${c_mov.socials.twitter}" target="_blank">
                                    <img class="movies__card__social" src="img/socials/twitter.svg" alt="${c_mov.name} в twitter">
                                </a>
                                <a href="${c_mov.socials.behance}" target="_blank">
                                    <img class="movies__card__social" src="img/socials/behance.svg" alt="${c_mov.name} в behance">
                                </a>
                                <a href="${c_mov.socials.dribbble}" target="_blank">
                                    <img class="movies__card__social" src="img/socials/dribbble.svg" alt="${c_mov.name} в dribbble">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }*/
    }
};

var genres = [
    'фентези',
    'драма',
    'комедия',
    'мультфильм',
    'боевик'
]

var shedule = {
    list: [
        {
            kpId: 1045172,
            time: '10:00',
        },
        {
            kpId: 1005878,
            time: '12:00'
        },
        {
            kpId: 535341,
            time: '14:00'
        },
        {
            kpId: 530,
            time: '16:00'
        }
    ],
    target: "movie-shedule",
    show: function() {
        var movies_shedule = document.getElementById(this.target);
        movies_shedule.innerHTML = "";
        for (var i = 0; i < shedule.list.length; i++) {
            let s = shedule.list[i];
            let film = films.getFilmById(s.kpId);
            film.then(result => {
                var prepareFilm = films.parseFilm(result);
                var c_mov = {
                    time: s.time,
                    name: prepareFilm.name,
                    genres: prepareFilm.genre
                }
                var h = ""
                h += 
                `
                <tr class="movie-list__table__row odd">
                    <td class="movie-list__table__cell movie-list__table__cell_body movie-list__table__cell_body_time">${c_mov.time}</td>
                    <td class="movie-list__table__cell movie-list__table__cell_body movie-list__table__cell_body_movieheader">${c_mov.name}</td>
                    <td class="movie-list__table__cell movie-list__table__cell_body movie-list__table__cell_body_order">`;
                for (var j = 0; j < c_mov.genres.length; j++)    
                    h += c_mov.genres[j].genre + ` `;
                    h += `</td>
                </tr>
                `;
                movies_shedule.innerHTML += h;
            })
        }
    }
}