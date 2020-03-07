import axios from "axios";

// export const FETCH_CAT_START = 'FETCH_CAT_START'
// export const FETCH_CAT_SUCCESS = 'FETCH_CAT_SUCCESS'
// export const FETCH_CAT_FAILURE = 'FETCH_CAT_FAILURE'

// keep redux
// can't really have the state machine version of react I want cause it messes with
// useEffect and can't have it with redux cause the components and the state will both be
// inside the reducer so the action function call will fail
// only using the state chart graph as a referece and use react redux as they were
// meant to be used
// have a graph of states and functions to be run so
// user can run a path of states
// the state will just return data for the user to use
// any contextual relathionship with the states and the data will be for reference only
// I have a graph for reference only
// have a function to run the states and return the last change in the store
// may also have a function to run back end algorithms that returns to the interface state
// to prevent potentially unwanted state changes to happen to the ui while the back end runs

// middleware functions
export const getCat = i => dispatch => {
  console.log("I am the", i, "th one");
  dispatch({ type: ["catTree", "FETCH_CAT_START", "0"] });

  axios
    .get("https://aws.random.cat/meow")
    .then(res => {
      // console.log("from api", res.data.file)
      dispatch({
        type: ["catTree", "FETCH_CAT_SUCCESS", "0"],
        payload: res.data.file
      });
    })
    .catch(err => {
      dispatch({
        type: ["catTree", "FETCH_CAT_FAILURE", "0"],
        payload: err.response
      });
    });
};

export const loadOneMoreFilter = () => dispatch => {
  console.log("we are here");
  dispatch({
    type: ["catTree", "LOAD_ONE_MORE_FILTER", "0"]
  });
};
