import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { history } from '../..'
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:5000/API'; // all api will now use this base url

// axios can intercept requests or responses. we need error response
axios.interceptors.response.use(undefined, error => {

    // console.log(error.response);

    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network Error - API!');
    }

    const {status, data, config} = error.response;

    // console.log(error.response);

    if (error.response.status === 404) {
        // throw error.response;
        // history object is passed in from index.tsx by using <Router> instead of <BrowserRouter>
        // router allows us to use history object that can be passed down explicitly
        history.push('/notfound');
    }
    // after throw is given, it is caught by activityStore

    // error has the data including data error variable type (id), html status, and data errors (viewabble from browser) used for filter
    // console.log(error.response);

    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        // this means most recent history entry is /notfound page
        history.push('/notfound');
    }

    if (status === 500) {
        toast.error('Server error - check terminal for info!');
    }

    // at least catch some error in activity store
    throw error.response;
})

const responseBody = (response: AxiosResponse) => response.data;

// curring a function = process for transforming one function of multiple arguments into multiple nested functions
const sleep = (ms: number) => (response: AxiosResponse) =>
// resolve() method in JS returns a Promise object that is resolved with a given value

// order of operation for logic in nested function is AxiosResponse is 'resolved'(response). SetTimeout delays the resolve response by 1000 ms
// result of the resolved response dealyed by setTimeout(xx, 1000) is going to be resolved as AxiosReponse in result of sleep
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

// request object
const requests = {
    // axios.get gets the return response that is 
    get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url:string, body: object) => axios.put(url, body).then(sleep(1000)).then(responseBody),
    del: (url:string) => axios.delete(url).then(sleep(1000)).then(responseBody),
}

const Activities ={
    // promise allows me to use functions like agent.Activity.list().then..etc because it is expected to return IActivity[]
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity:IActivity) => requests.post('/activities', activity),
    update: (activity:IActivity) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id:string) => requests.del(`/activities/${id}`),  
}

export default {
    Activities
}