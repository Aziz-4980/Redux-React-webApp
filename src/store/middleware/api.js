import axios from 'axios';
import * as actions from '../api';



const api = ({ dispatch }) => next => async action => {

    if (action.type !== actions.apiCallBegan.type) return next(action);


    const { url, onSuccess, onStart, onError, method, data } = action.payload;
    if (onStart)
        dispatch({ type: onStart })
    next(action);
    try {
        const request = await axios.request({
            baseURL: 'http://localhost:9001/api',
            url,
            method,
            data
        });
        // console.log('before', request);

        //genral
        dispatch(actions.apiCallSuccess(request.data));
        //specific
        if (onSuccess)
            dispatch({ type: onSuccess, payload: request.data });
        // console.log('after', request);
    } catch (error) {

        //general
        dispatch(actions.apiCallFailed(error.message))

        //specific
        if (onError)
            dispatch({ type: onError, payload: error.message })

    }
}

export default api;