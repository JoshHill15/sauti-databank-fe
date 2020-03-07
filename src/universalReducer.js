// import { Cat } from './solutions/cat/catReducer'
// import { BreakApp } from './reducers/breakAppReducer'
import { Cat } from "./filterReducer";
const initialState = {
  catTree: Cat
  // breakAppTree: BreakApp
};

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

  // console.log('going to run a state', action.type)
  return state[solutionName]["tree"][stateFirstName]["functions"][context](
    state,
    action
  );
};

export default universalReducer;
