// import { Cat } from './solutions/cat/catReducer'
// import { BreakApp } from './reducers/breakAppReducer'
// Cat was remenant of the project this was migrated from
import { Cat } from "./filterReducer";
const initialState = {
  sautiTree: Cat
  // breakAppTree: BreakApp
};

// you can just trust that this works as long as you write the states as they are made in the store(Cat)
const universalReducer = (state = initialState, action) => {
  // console.log(action.type, state, Cat)
  if (typeof action.type === "string") {
    return state;
  }
  let [solutionName, stateFirstName, context] = action.type;
  // console.log('got name parts', action.type)
  if (!Object.keys(state[solutionName]["tree"]).includes(stateFirstName)) {
    return state;
  }

  // context is just another way to use the state's name (stateFirstName)
  // it's like (x, y) on a coordinate plane
  // you can hold x(stateFirstName=SELECT_CATEGORY) constant and let there be more detail(context="0") in what you are doing with
  // x
  // console.log('going to run a state', action.type)
  return state[solutionName]["tree"][stateFirstName]["functions"][context](
    state,
    action
  );
};

export default universalReducer;
