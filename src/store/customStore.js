import reducer from "./reducer";

function createStore() {

    let state;
    let listners = [];

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);

        for (let i = 0; i < listners.length; i++) {
            listners[i]();
        }
    }

    function subscribe(listner) {
        listners.push(listner);
    }

    return {
        subscribe,
        dispatch,
        getState
    }
}


export default createStore(reducer);