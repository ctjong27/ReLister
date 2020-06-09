import axios, { AxiosResponse } from 'axios';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IGroup } from '../models/group';
import { IUser } from '../models/user';
import { IItem } from '../models/item';

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

const Groups ={
    list: (): Promise<IGroup[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity:IGroup) => requests.post('/activities', activity),
    update: (activity:IGroup) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id:string) => requests.del(`/activities/${id}`),  
}


const Items ={
    list: (): Promise<IItem[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity:IItem) => requests.post('/activities', activity),
    update: (activity:IItem) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id:string) => requests.del(`/activities/${id}`),  
}


const User ={
    list: (): Promise<IUser[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity:IUser) => requests.post('/activities', activity),
    update: (activity:IUser) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id:string) => requests.del(`/activities/${id}`),  
}

export default {
    Groups, Items, User
}