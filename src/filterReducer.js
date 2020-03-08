import { selectCategory } from "./filterActions";

// these 2 functions came from a prior project
// generic formula for updating nested state in redux
const setToValue = (container, value) => {
  return value;
};
const spreadObject = (container, value) => {
  return { ...value };
};
const deepCopyAndUpdate = (state, path, value, cb) => {
  // this takes in a path as an array of keys(int, string)
  // and deep sets the array/dict at the end of the path ot cb(state, values)
  // state is an object
  // console.log("deep copy", path)
  // console.log("path", path)
  // console.log("reduced path", path.filter((node, i) => i > 0))
  // console.log(path.length === 0)
  // console.log(state)

  if (path.length === 0) {
    // console.log("replace", state, value)
    return cb(state, value);
  } else if (path.length > 0) {
    const firstNode = path[0];

    if (!state.hasOwnProperty(firstNode)) {
      // copy of original with some object references from the original?
      return { ...state };
    } else {
      return {
        ...state,
        // [] seems to protect the variable name from being treated as a key
        [firstNode]: deepCopyAndUpdate(
          state[firstNode],
          path.filter((node, i) => i > 0),
          value,
          cb
        )
      };
    }
  }
};

// import { loadOneMoreFilter } from "./filterActions";
// if the filters are all selected and all are being used
// shouldn't we be able to check
// can only have n - 1 filters active out of n filters
// it mght make sence to make a fake final filter so all n filters can be active
export const loadOneMoreFilterReducer = (state, action) => {
  console.log(
    Object.keys(state.catTree.filters).length,
    state.catTree.array.length
  );
  // if there is room to make another filter then add it else return the same set
  // if(Object.keys(state.catTree.filters).length < state.catTree.array.length - 1) {
  return {
    ...state,
    catTree: {
      ...state.catTree,
      filters:
        Object.keys(state.catTree.filters).length <
        state.catTree.array.length - 1
          ? {
              ...state.catTree.filters,
              [Object.keys(state.catTree.filters).length]: {
                selectedName: "",
                selectedOption: {}
              }
            }
          : {
              ...state.catTree.filters
            }
    }
  };
};

export const selectCategoryReducer = (state, action) => {
  //   console.log("new selection", action.payload);
  //   console.log(state.catTree.filters);
  // assume they start unchecked
  let options = {};
  if (
    Object.keys(state.catTree.categoriesToPickFrom).includes(
      action.payload.category
    )
  ) {
    state.catTree.categoriesToPickFrom[action.payload.category].options.forEach(
      option => {
        options = {
          ...options,
          [option]: false
        };
      }
    );
  }
  let x = deepCopyAndUpdate(
    state,
    ["catTree", "filters", String(action.payload.i), "selectedName"],
    action.payload.category,
    setToValue
  );
  return deepCopyAndUpdate(
    x,
    ["catTree", "filters", String(action.payload.i), "selectedOption"],
    options,
    spreadObject
  );
  //   return {
  //     ...state,
  //     catTree: {
  //       ...state.catTree,
  //       filters: {
  //         ...state.catTree.filters,
  //         [action.payload.i]: {
  // the set to value one
  //             selectedName: action.payload.category,
  // the set to spread object one
  //             selectedOption: {
  //                 ...options
  //             }
  //         }
  //       }
  //     }
  //   };
};
const flipSign = (state, action) => {
  // console.log()
  return !state.catTree.filters[action.payload.i].selectedOption[
    action.payload.option
  ];
};
export const selectOptionReducer = (state, action) => {
  // console.log("new option", action.payload);
  // console.log(state.catTree.filters);

  // each time this is called, flip the sign to uncheck or check the option being selected
  // state["catTree"]["filters"][action.payload.i]["selectedOption"][action.payload.i]
  // console.log(action.payload)
  return deepCopyAndUpdate(
    state,
    [
      "catTree",
      "filters",
      String(action.payload.i),
      "selectedOption",
      action.payload.option
    ],
    flipSign(state, action),
    setToValue
  );
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
const categories = {
  "Education Level": {
    options: [
      "University/College",
      "Secondary",
      "Primary",
      "No formal education"
    ],
    searchName: "education"
  },
  Gender: {
    options: ["Female", "Male"],
    searchName: "gender"
  },
  "Border Crossing Frequency": {
    options: ["Monthly", "Weekly", "Daily", "Never"],
    searchName: "crossing_freq"
  },
  Age: {
    options: ["60-70", "50-60", "40-50", "30-40", "20-30", "10-20"],
    searchName: "age"
  },
  "Country of Residence": {
    options: ["RWA", "UGA", "KEN", "TZA"],
    searchName: "country_of_residence"
  },
  "Primary Income": {
    options: ["No", "Yes"],
    searchName: "primary_income"
  },
  Language: {
    options: ["Lukiga", "Kinyarwanda", "Luganda", "Swahili", "English"],
    searchName: "language"
  },
  Produce: {
    options: ["No", "Yes"],
    searchName: "produce"
  }
};
// "choose a filter"
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
      functions: { "0": selectCategoryReducer }
    },
    SELECT_OPTION: {
      functions: { "0": selectOptionReducer }
    }
  },
  array: ["choose a filter", ...Object.keys(categories)],
  categoriesToPickFrom: {
    ...categories
  },
  // using an object makes editing each filter by index easier to do in the reducer
  // the mapping from id to data for each filter is replicated inside selectedOption
  // using a generator to make the keys(each selectable option)
  filters: {
    0: { selectedName: "", selectedOption: {} }, // all the options

    1: { selectedName: "", selectedOption: {} },

    2: { selectedName: "", selectedOption: {} }
  }
  // props.array.filter(option => props.filters[i].selectedName !== option)
  // props.array.filter(option => !(Object.keys(props.filters).map(filterId =>
  // props.filters[filterId].selectedName)) .includes(option))
};
