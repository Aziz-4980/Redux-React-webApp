
const logger = params => store => next => action => {
    console.log("logging => ", params);


    next(action);

}

export default logger;