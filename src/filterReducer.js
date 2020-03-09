import { selectCategory } from "./filterActions";
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
  // Produce: {
  //   options: ["No", "Yes"],
  //   searchName: "produce"
  // }
  // I don't know if the searchName is the proper column, but there is data to search for there
  Commodities: {
    // should set it up so they can only pick "All" or another one
    options: ["All", "Dry Maize", "Eggs", "Nile Perch"],
    searchName: "commodityproduct"
  }
};
// these 2 functions came from a prior project
// generic formula for updating nested state in redux
// the selection system is slow in debug mode but fast in regular mode
const setToValue = (container, value) => {
  return value;
};
const spreadObject = (container, value) => {
  return { ...value };
};
const copyArrayOfObjects = (container, value) => {
  return value.map(object => ({ ...object }));
};
const spreadArray = (container, value) => {
  return [...value];
};
const makeNewFilter = () => {
  return {
    selectedName: "",
    selectedOption: {}
  };
};
const addToObject = (container, value) => {
  return { ...container, ...value };
};
const deepCopyAndUpdate = (state, path, value, cb) => {
  // this takes in a path as an array of keys(int, string)
  // and deep sets the array/dict at the end of the path ot cb(state, values)
  // state is an object
  // console.log("deep copy", path, state)
  // console.log("path", path)
  // console.log("reduced path", path.filter((node, i) => i > 0))
  // console.log(path.length === 0)
  // console.log(state)

  if (path.length === 0) {
    // console.log("replace", state, value, cb(state, value))
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
  // console.log(
  //   Object.keys(state.catTree.filters).length,
  //   state.catTree.array.length
  // );
  // if(state.catTree.searched) {
  //   return deepCopyAndUpdate(
  //     state,
  //     [
  //       "catTree",
  //       "filters"
  //     ],
  //     state.catTree.filters,
  //     spreadObject
  //   );
  //   // return {
  //   //   ...state,
  //   //   catTree: {
  //   //     ...state.catTree,
  //   //     filters: {
  //   //             ...state.catTree.filters
  //   //           }
  //   //   }
  //   // };
  // }
  // if there is room to make another filter then add it else return the same set
  if (
    Object.keys(state.catTree.filters).length <
    state.catTree.array.length - 1
  ) {
    console.log("add another filter");
    return deepCopyAndUpdate(
      state,
      ["catTree", "filters"],
      {
        [Object.keys(state.catTree.filters).length]: {
          selectedName: "",
          selectedOption: {}
        }
      },
      addToObject
    );
    // return {
    //   ...state,
    //   catTree: {
    //     ...state.catTree,
    //     filters: {
    //             ...state.catTree.filters,
    //             [Object.keys(state.catTree.filters).length]: {
    //               selectedName: "",
    //               selectedOption: {}
    //             }
    //           }

    //   }
    // };
  } else {
    return deepCopyAndUpdate(
      state,
      ["catTree", "filters"],
      state.catTree.filters,
      spreadObject
    );
    // return {
    //   ...state,
    //   catTree: {
    //     ...state.catTree,
    //     filters: {
    //             ...state.catTree.filters
    //           }
    //   }
    // };
  }
  // return {
  //   ...state,
  //   catTree: {
  //     ...state.catTree,
  //     filters:
  //       Object.keys(state.catTree.filters).length <
  //       state.catTree.array.length - 1
  //         ? {
  //             ...state.catTree.filters,
  //             [Object.keys(state.catTree.filters).length]: {
  //               selectedName: "",
  //               selectedOption: {}
  //             }
  //           }
  //         : {
  //             ...state.catTree.filters
  //           }
  //   }
  // };
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
  const i = String(action.payload.i);
  let x = deepCopyAndUpdate(
    state,
    ["catTree", "filters", i, "selectedName"],
    action.payload.category,
    setToValue
  );
  return deepCopyAndUpdate(
    x,
    ["catTree", "filters", i, "selectedOption"],
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
const OR = (category, optionsChosen, row) => {
  let passes = 0;
  // return true if at least one of the options chosen is inside the row
  optionsChosen.forEach(optionString => {
    // console.log(row)

    if (Object.keys(row).includes(category)) {
      // if(row.id === 62) {
      // console.log(category, "|", optionsChosen, "|",row)

      // console.l
      // console.log(optionString, category, row)
      // console.log(row[category], optionString)

      // }
      // this way we can get all possibilities
      if (optionString === "All") {
        // console.log(row, 'passes')
        passes += 1;
        // this is because many different options may be
      }
      // else if(row[category].includes(optionString))
      else if (row[category] === optionString) {
        passes += 1;
      }
    }
  });
  // if(row.id === 62) {
  //   console.log(passes)

  // }

  return passes > 0 && passes <= optionsChosen.length;
};

const AND = listOfResultsFromOr => {
  // console.log(listOfResultsFromOr)
  // return true if all the values in listOfResultsFromOr say true
  for (var i in listOfResultsFromOr) {
    if (!listOfResultsFromOr[i]) {
      return false;
    }
  }
  return true;
};

const ANDORCondition = (categories, listsOfOptions, row) => {
  return AND(
    categories.map((category, i) => {
      return OR(category, listsOfOptions[i], row);
    })
  );
};
// check each row to make sure the condition is met

const filterThroughTable = (table, categories, listsOfOptions) => {
  // this function will take the table and run it
  // console.log(table)
  // or inside each category
  // and across catagories
  // AND([OR(), OR(), OR()])
  // console.log(categories, listsOfOptions)
  const filteredTable = table
    .map(row => {
      // if its true return it
      if (ANDORCondition(categories, listsOfOptions, row)) {
        // console.log(row)
        return row;
      }
    })
    .filter(row => row !== undefined);
  return filteredTable;
  // console.log(filteredTable)
};
export const submitFilterReducer = (state, action) => {
  // collect the query data from the filters
  // console.log("data from table", action.payload.dataFromGraphQl)
  // console.log('get filter query from here', state.catTree.filters)
  // makes sure only categories that are selected and have at least ne selected option be recorded

  const andFunction = Object.keys(state.catTree.filters)
    .map(filterId => {
      if (state.catTree.filters[filterId].selectedName.length > 0) {
        // make sure all the options are selected before collecting a category
        let options = Object.keys(
          state.catTree.filters[filterId].selectedOption
        )
          .map(option => {
            if (
              state.catTree.filters[filterId].selectedOption[option] === true
            ) {
              return option;
            }
          })
          .filter(option => option !== undefined);
        if (options.length > 0) {
          return categories[state.catTree.filters[filterId].selectedName]
            .searchName;
        }
      }
    })
    .filter(selectedName => selectedName !== undefined);
  console.log(andFunction);
  const orFunction = Object.keys(state.catTree.filters)
    .map(filterId => {
      // uses same logic for filters as before
      return Object.keys(state.catTree.filters[filterId].selectedOption)
        .map(option => {
          if (state.catTree.filters[filterId].selectedOption[option] === true) {
            return option;
          }
        })
        .filter(option => option !== undefined);
    })
    .filter(orGroup => orGroup.length > 0);
  console.log(orFunction);
  // const results = filterThroughTable(
  //     action.payload.dataFromGraphQl.sessionsData,
  //     ["gender", "country_of_residence", "commodityproduct"],
  //     [["Female"], ["UGA", "KEN"], ["Dry Maize", "Eggs", "Nile Perch"]])
  // fails if an option isn't selected
  const results = filterThroughTable(
    action.payload.dataFromGraphQl.sessionsData,
    andFunction,
    orFunction
  );
  // save the results and set the search setting to 1
  // console.log(results)
  // can't save it cause setting leaves it undefined, spreadding it results in an error(can't spread an object into an array)
  let x = deepCopyAndUpdate(
    state,
    ["catTree", "results"],
    results,
    copyArrayOfObjects
  );
  return deepCopyAndUpdate(x, ["catTree", "searched"], 1, setToValue);
  // run the js on the tables and query data
  // save the resulting table in state
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
    },
    SUBMIT_FILTER: {
      functions: { "0": submitFilterReducer }
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
  },
  // this will tell me if I already searched before
  // that way the already existing search can be modified
  searched: 0,
  results: []
  // props.array.filter(option => props.filters[i].selectedName !== option)
  // props.array.filter(option => !(Object.keys(props.filters).map(filterId =>
  // props.filters[filterId].selectedName)) .includes(option))
};