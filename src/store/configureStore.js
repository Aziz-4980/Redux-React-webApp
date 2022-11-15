import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// import reducer from './bugs';
import reducer from './reducer';
import logger from './middleware/logger';
import toast from './middleware/toast';
import api from './middleware/api';
// import func from './middleware/func';



export default function () {
    return configureStore({
        // reducer: reducer (or)
        reducer,

        middleware: [
            ...getDefaultMiddleware(),
            logger({ destination: "console" }),
            toast,
            api

        ]
    })
}

