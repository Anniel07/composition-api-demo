import { ref } from 'vue'
import http from "../http-common";
import { useRouter } from 'vue-router'

export default function useMovies() {
    const movie = ref([])
    const movies = ref([])

    const errors = ref([]) //array of strings
    const router = useRouter()

    const getMovies = async () => {
        try {
            let response = await http.get('/api/movies')
            console.log(response.data)

            movies.value = response.data
        } catch (error) {
            console.log(error.message);
        }
    }

    const getMovie = async (id) => {
        let response = await http.get(`/api/movies/${id}`)
        movie.value = response.data
    }

    const storeMovie = async (data) => {
        errors.value = []
        try {
            await http.post('/api/movies', data)
            await router.push({ name: 'movies.index' })
        } catch (e) {
            if (e.response.status === 400) { //Bad request, for validation in .net core
                
                for (const key in e.response.data.errors) {
                    errors.value.push(e.response.data.errors[key][0]) ;
                }
            }
        }

    }

    const updateMovie = async (id) => {
        errors.value = [];
        try {
            // http method must be put for match put method in .net core api
            await http.put(`/api/movies/${id}`, movie.value) 
            await router.push({ name: 'movies.index' })
        } catch (e) {
            if (e.response.status === 400) { //Bad request, for validation
               
                for (const key in e.response.data.errors) {
                    errors.value.push( e.response.data.errors[key][0]);
                }
            }
        }
    }

    const destroyMovie = async (id) => {
        await http.delete(`/api/movies/${id}`)
    }

    return {
        errors,
        movie,
        movies,
        getMovie,
        getMovies,
        storeMovie,
        updateMovie,
        destroyMovie
    }
}