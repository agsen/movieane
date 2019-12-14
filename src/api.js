import axios from 'axios';

const api_key = 'a4a36a5773994090662c9d1e6ab1fbbc';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const getGenre = () => {
    let result = []
    axios.get(`/genre/movie/list?api_key=${api_key}`)
        .then((res) => {
            result = res
        })
    return result
}

