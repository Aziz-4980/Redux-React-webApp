import { createSlice } from "@reduxjs/toolkit";
import moment from "moment/moment";
import { createSelector } from 'reselect';
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: "bugs",
    initialState: {
        list: null,
        loading: false,
        lastFetch: null,
    },
    reducers: {

        bugsRequested: (bugs, action) => {
            bugs.loading = true;
        },
        bugResolved: (bugs, action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
            bugs.list[index].resolved = true;
        },
        bugsReceived: (bugs, action) => {
            bugs.list = action.payload;
            bugs.loading = false;
            bugs.lastFetch = Date.now();
        },
        bugAdded: (bugs, action) => {
            bugs.list.push(action.type)
        },
        bugsRequestFailed: (bugs, action) => {
            bugs.loading = false;
        },
        bugAssignedToUser: (bugs, action) => {
            const { id, userId } = action.payload;
            const index = bugs.list.findIndex(bug => bug.id === id);
            bugs.list[index].userId = userId;
        },
    }
});



export const { bugAdded, bugResolved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestFailed } = slice.actions;
export default slice.reducer;

const url = '/bugs';

export const resolveBugs = (id) => apiCallBegan({
    url: url + '/' + id,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type
})

export const addBugToUser = (id, userId) => apiCallBegan({
    url: url + '/' + id,
    method: 'patch',
    data: { userId },
    onSuccess: bugAssignedToUser.type

})

export const loadBugs = () => (dispatch, getState) => {
    const { lastFetch } = getState().entities.bugs;

    // console.log(lastFetch);
    const diffInTime = moment().diff(moment(lastFetch), 'minute');

    if (diffInTime < 10) return;

    dispatch(
        apiCallBegan({
            url,
            onStart: bugsRequested.type,
            onSuccess: bugsReceived.type,
            onError: bugsRequestFailed.type
        }))
}


export const addBug = bug => apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: bugAdded.type,
})


export const getUnresolvedBug = createSelector(
    state => state.entities.bugs,
    state => state.entities.products,
    (bugs, products) => bugs.list.filter(bug => !bug.resolved)
)

