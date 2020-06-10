import axios, { AxiosResponse } from 'axios';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IAtom } from '../models/atom';
import { IUser } from '../models/user';
import { IMolecule } from '../models/molecule';

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


const Atoms ={
    list: (): Promise<IAtom[]> => requests.get('/atoms'),
    details: (name: string) => requests.get(`/atom/${name}`),
    create: (atom:IAtom) => requests.post('/atom', atom),
    update: (atom:IAtom) => requests.put(`/atom/${atom.name}`, atom),
    delete: (name:string) => requests.del(`/atom/${name}`),  
}

const Molecules ={
    list: (): Promise<IMolecule[]> => requests.get('/molecules'),
    details: (name: string) => requests.get(`/molecule/${name}`),
    create: (molecule:IMolecule) => requests.post('/molecule', molecule),
    update: (molecule:IMolecule) => requests.put(`/molecule/${molecule.name}`, molecule),
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
    Atoms, Molecules, User
}