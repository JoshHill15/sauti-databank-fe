import { selectCategory } from "./filterActions";

// import { loadOneMoreFilter } from "./filterActions";

export const loadOneMoreFilterReducer = (state, action) => {
  return {
    ...state,
    catTree: {
      ...state.catTree,
      filters: {
        ...state.catTree.filters,
        [Object.keys(state.catTree.filters).length]: { selectedName: "" }
      }
    }
  };
};

export const selectCategoryReducer = (state, action) => {
  console.log("new selection", action.payload);
  console.log(state.catTree.filters);
  return {
    ...state,
    catTree: {
      ...state.catTree,
      filters: {
        ...state.catTree.filters,
        [action.payload["i"]]: { selectedName: action.payload["category"] }
      }
    }
  };
};
export const fetchCatStart = (state, action) => {
  return { ...state, catTree: { ...state.catTree, isFetching: true } };
};

export const fetchCatSuccess = (state, action) => {
  return {
    ...state,
    catTree: {
      ...state.catTree,
      error: "",
      isFetching: false,
      cat: action.payload
    }
  };
};
export const fetchCatFailure = (state, action) => {
  return {
    ...state,
    catTree: {
      ...state.catTree,
      error: action.payload,
      cat: null,
      isFetching: false
    }
  };
};

// reducers and the state for it in the same file
// merge the states with 1 initialState
// group by context of problem, not by kind of coding construct

// start state
export const Cat = {
  // have a cat category
  // have a BreakApp category
  // store the different reducer functions outside this function
  // break up the reducers but keep the store the same
  error: "",
  cat: null,
  tree: {
    // -> FETCH_CAT_SUCCESS or FETCH_CAT_FAILURE
    // this node structure was taken from another one of my projects
    FETCH_CAT_START: {
      next: { "0": { FETCH_CAT_SUCCESS: "0", FETCH_CAT_FAILURE: "0" } },
      functions: { "0": fetchCatStart }
    },

    FETCH_CAT_SUCCESS: {
      next: { "0": { validate: "0", invalid: "0" } },
      functions: { "0": fetchCatSuccess }
    },

    FETCH_CAT_FAILURE: {
      next: { "0": {} },
      children: { "0": { char: "0" } },
      functions: { "0": fetchCatFailure }
    },
    LOAD_ONE_MORE_FILTER: {
      next: { "0": {} },
      children: { "0": { char: "0" } },
      functions: { "0": loadOneMoreFilterReducer }
    },
    SELECT_CATEGORY: {
      next: { "0": {} },
      children: { "0": { char: "0" } },
      functions: { "0": selectCategoryReducer }
    }
  },
  array: ["0", "1", "2", "3", "4"],
  filters: {
    0: { selectedName: "" }, // all the options
    1: { selectedName: "" },
    2: { selectedName: "" }
  }
  // props.array.filter(option => props.filters[i].selectedName !== option)
  // props.array.filter(option => !(Object.keys(props.filters).map(filterId =>
  // props.filters[filterId].selectedName)) .includes(option))
};
