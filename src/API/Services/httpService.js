import axios from "axios";

axios.interceptors.request.use(
    config => {
		config.headers.post["content-type"] = "application/json";
		config.headers.post["Accept"] = "application/json";
        return Promise.resolve(config);
    },
    error => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
    config => {
        return Promise.resolve(config);
    },
    error => {
		if(error.response.status==400){
			window.location.href="/result"
		}
		return Promise.reject(error);
	}
);

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	all: axios.all
};

