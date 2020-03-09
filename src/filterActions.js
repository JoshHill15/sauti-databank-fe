export const loadOneMoreFilter = () => dispatch => {
  console.log("we are here");
  dispatch({
    // the 3rd string is the context(let's say we need to load one more filter for a different reason?)
    type: ["sautiTree", "LOAD_ONE_MORE_FILTER", "0"]
  });
};

export const selectCategory = (category, i) => dispatch => {
  console.log(category);

  dispatch({
    type: ["sautiTree", "SELECT_CATEGORY", "0"],
    payload: { category: category, i: i }
  });
};

export const selectOption = (category, option, i) => dispatch => {
  console.log(category);

  dispatch({
    type: ["sautiTree", "SELECT_OPTION", "0"],
    payload: { category: category, i: i, option: option }
  });
};

export const submitFilter = dataFromGraphQl => dispatch => {
  // We are assuming the data came in before they hit submit
  // console.log("we are here")
  if (dataFromGraphQl !== undefined) {
    // console.log("about to submit from graphql", dataFromGraphQl)
    // run dispatch
    dispatch({
      type: ["sautiTree", "SUBMIT_FILTER", "0"],
      payload: { dataFromGraphQl: dataFromGraphQl }
    });
  }
};
