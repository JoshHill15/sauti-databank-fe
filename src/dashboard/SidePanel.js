import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import FilterBox from "../Components/FilterBox";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function SidePanel(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: true
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <div>
      <Button onClick={toggleDrawer("right", true)}>Open Filters</Button>

      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        <FilterBox
          onChange={props.onChange}
          onSubmit={props.onSubmit}
          index={props.index}
          checkboxOptions={props.checkboxOptions}
          crossFilter={props.crossFilter}
          setIndex={props.setIndex}
          setCrossFilter={props.setCrossFilter}
          setIndexLabel={props.setIndexLabel}
          setCrossLabel={props.setCrossLabel}
          setSelectedCheckbox={props.setSelectedCheckbox}
          setCheckboxOptions={props.setCheckboxOptions}
          setAdditionalFilter={props.setAdditionalFilter}
          startDate={props.startDate}
          endDate={props.endDate}
          setStartDate={props.setStartDate}
          setEndDate={props.setEndDate}
          setFirstSelectedCheckbox={props.setFirstSelectedCheckbox}
          setSecondSelectedCheckbox={props.setSecondSelectedCheckbox}
          secondCheckboxOptions={props.secondCheckboxOptions}
        />
      </Drawer>
    </div>
  );
}
