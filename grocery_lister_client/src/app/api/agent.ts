import axios, { AxiosResponse } from 'axios';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IIngredient } from '../models/ingredient';
import { IUser } from '../models/user';
import { IRecipe } from '../models/recipe';

axios.defaults.baseURL = 'http://localhost:5000/'; // all api will now use this base url

// handle requests
axios.interceptors.response.use(undefined, error => {

    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network Error - API!');
    }

    const { status, data, config } = error.response;

    if (error.response.status === 404) {
        history.push('/notfound');
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound');
    }

    if (status === 500) {
        toast.error('Server error - check terminal for info!');
    }

    throw error.response;
})


const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));


// request object
const requests = {
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url:string, body: object) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url:string) => axios.delete(url).then(sleep(1000)).then(responseBody),
}


const Ingredients ={
    list: (): Promise<IIngredient[]> => requests.get('/ingredients'),
    details: (name: string) => requests.get(`/ingredient/${name}`),
    create: (ingredient:IIngredient) => requests.post('/ingredient', ingredient),
    update: (ingredient:IIngredient) => requests.put(`/ingredient/${ingredient.name}`, ingredient),
    delete: (name:string) => requests.del(`/ingredient/${name}`),  
}

const Recipes ={
    list: (): Promise<IRecipe[]> => requests.get('/molecules'),
    details: (name: string) => requests.get(`/molecule/${name}`),
    create: (molecule:IRecipe) => requests.post('/molecule', molecule),
    update: (molecule:IRecipe) => requests.put(`/molecule/${molecule.name}`, molecule),
    delete: (name:string) => requests.del(`/molecule/${name}`),  
}

const User ={
    list: (): Promise<IUser[]> => requests.get('/users'),
    details: (id: string) => requests.get(`/user/${id}`),
    create: (activity:IUser) => requests.post('/user', activity),
    update: (activity:IUser) => requests.put(`/user/${activity.id}`, activity),
    delete: (id:string) => requests.del(`/user/${id}`),  
}

export default {
    Ingredients, Recipes, User
}