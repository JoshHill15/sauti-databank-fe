import React, { useState } from "react";
import Dropdown from "react-dropdown";

import styled from "styled-components";
import { connect } from "react-redux";

import {
  getCat,
  loadOneMoreFilter,
  selectCategory,
  selectOption
} from "../filterActions";

const CheckboxContainer = styled.div`
  max-height: 40vh;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;
const FilterOption = styled.p`
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  font-size: 1rem;
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
`;

const AdditionalFilter = props => {
  /*
    drop down array = [
        Gender
        Education
        Border Crossing Frequency
        Age
        Country of Residence
    ]
    selected item "Gender"
    
    options array = ["Female", "Male"]

    selected option = "Female"

Most Requested Procedures Commodities
most_requested_procedures_commodities

catergories = name of the array that you can choose from in the drop down
selector parts
categories.selectedCategory = "gender"
slectedCategory.option = "female"


all options to show to the user

x = { gender: [ male, female],
countries: [ kenya, uganda]

}

Object is a js thing

Object.keys(x) = [gender, countries]

selectedCategory = gender

options to show the user after they click on gender
x[selectedCategory] = [male, female]

selectedOption = female
if (category) {
  filter out selectedCategory from x
}





    */

  let {
    FilterBoxOptions,
    filterBoxAdditionalFilter,
    setFilterBoxAdditionalFilter,
    filterBoxAdditionalFilterLabel,
    setFilterBoxAdditionalFilterLabel,
    filterBoxIndexLabel,
    filterBoxCrossLabel,
    graphLabels,
    loading,
    setAdditionalFilter,
    setCheckboxOptions,
    setSelectedCheckbox,
    searchOptions,
    setSearchOptions,
    searchCategories,
    setSearchCategories,

    categories,
    setCategories,

    selectedNames,
    setSelectedNames,
    ithComponent,
    setIthComponent,
    i
  } = props;

  //   console.log(
  //     "input into component",
  //     FilterBoxOptions,
  //     filterBoxAdditionalFilter,
  //     filterBoxAdditionalFilterLabel,
  //     filterBoxIndexLabel,
  //     filterBoxCrossLabel,
  //     graphLabels,
  //     loading)
  // this will show a single selected category and 1 search option
  // searchOptions = ['Primary', 'KEN', 'Tubers']
  // searchCategories = ['Education Level',
  // 'country of residence',
  // 'Most requested stuff']
  // each filter maps to an id
  //   each id maps to the data being held for that filter
  //
  //   console.log("entering component", selectedNames);
  //   console.log(categories);
  //   const [showNames, setShowNames] = useState(Object.keys(categories));
  //   console.log(showNames);
  //   const [selectedName, setSelectedName] = useState("");
  return (
    // <>
    <div>
      <form>
        <p>Additional Filter</p>
        <p className="disclosure">
          *This optional filter adjusts samplesize and may not always alter the
          graph appearance.
        </p>
        <p>{props.cat}</p>
        <Dropdown
          controlClassName="myControlClassName"
          arrowClassName="myArrowClassName"
          className="dropdown"
          disabled={loading}
          options={
            props.array.filter(
              option =>
                !Object.keys(props.filters)
                  .map(filterId => props.filters[filterId].selectedName)
                  .includes(option)
            )
            //   props.array.filter(option => props.filters[i].selectedName !== option)
            //   props.array.filter(name => name !== "1")
            //   showNames.filter(name => selectedNames.length === 0 ?
            //         name !== selectedName :
            //         !selectedNames.includes(name)
            // )
            //       FilterBoxOptions.default.filter(
            //     obj =>
            //       obj.label !== filterBoxIndexLabel &&
            //       obj.label !== filterBoxCrossLabel
            //   )
          }
          value={
            props.filters[i].selectedName
            // selectedName
            //   filterBoxAdditionalFilterLabel
          }
          placeholder="Select a filter..."
          onChange={e => {
            // console.log(
            //   "event",
            //   e,
            //   showNames.filter(name => name !== e.value)
            // );
            // props.getCat(i);
            props.selectCategory(e.value, i);
            // setSelectedName(e.value);
            // setSelectedNames([...selectedNames, e.value]);

            // // the value isn't changed for this round
            // let newCategories = {};
            // Object.keys(categories).forEach(category => {
            //   //   console.log(category, e.value);
            //   if (category !== e.value) {
            //     newCategories = {
            //       ...newCategories,
            //       [category]: categories[category]
            //     };
            //   }
            // });
            // // console.log("new categories", newCategories, "|", e.value, "|");
            // setCategories(newCategories);
            // console.log("new categories", newCategories, categories);

            // setFilterBoxAdditionalFilter({
            //   type: e.value.type,
            //   query: e.value.query,
            //   label: e.label
            // });
            // setFilterBoxAdditionalFilterLabel(e.label);
            // setCheckboxOptions([]);
            //   ClickTracker(e.value.type);
            //   console.log("event", e);
          }}
        />
        <div
          className="reset-btn"
          onClick={() => {
            // console.log(selectedName);
            // setSelectedName("");
            // setFilterBoxAdditionalFilter({ type: "", query: "" });
            // setFilterBoxAdditionalFilterLabel("");
            // setAdditionalFilter({ type: "", query: "" });
            // setCheckboxOptions([]);
            // setSelectedCheckbox({});
          }}
        >
          <p>Clear Additional Filter</p>
        </div>
        {/* </> */}
        {/* )} */}

        <CheckboxContainer>
          <p>Select an option to further filter the data: </p>
          {Object.keys(props.categoriesToPickFrom).includes(
            props.filters[i].selectedName
          )
            ? props.categoriesToPickFrom[
                props.filters[i].selectedName
              ].options.map(option => (
                <Options key={option}>
                  <input
                    type="checkBox"
                    name="CrossFilter"
                    value={option}
                    onChange={e => {
                      console.log("event", e);
                      props.selectOption(
                        props.filters[i].selectedName,
                        option,
                        i
                      );

                      // setSelectedCheckbox({
                      //   // if this is a string then we could do this?
                      //   // [ filterBoxAdditionalFilter.type ]
                      //   [`${filterBoxAdditionalFilter.type}`]: option
                      // }),
                      // setAdditionalFilter(filterBoxAdditionalFilter)
                    }}
                  />
                  <FilterOption>{option}</FilterOption>
                </Options>
              ))
            : []}
        </CheckboxContainer>
        {/* {graphLabels[`${filterBoxAdditionalFilter.type}`] && (
          <CheckboxContainer>
            <p>Select an option to further filter the data: </p>
            {graphLabels[`${filterBoxAdditionalFilter.type}`].labels.map(
              option => (
                <Options key={option}>
                  <input
                    type="radio"
                    name="CrossFilter"
                    value={option}
                    onChange={e => (
                      setSelectedCheckbox({
                        // if this is a string then we could do this?
                        // [ filterBoxAdditionalFilter.type ]
                        [`${filterBoxAdditionalFilter.type}`]: option
                      }),
                      setAdditionalFilter(filterBoxAdditionalFilter)
                    )}
                  />
                  <FilterOption>{option}</FilterOption>
                </Options>
              )
            )}
          </CheckboxContainer>
        )} */}
      </form>
      <div
        onClick={e => {
          console.log(props.filters);
        }}
      >
        check status of redux
      </div>
    </div>
  );
};

// export default AdditionalFilter;
const mapStateToProps = state => {
  return {
    error: state.catTree.error,
    isFetching: state.catTree.isFetching,
    cat: state.catTree.cat,
    array: state.catTree.array,
    filters: state.catTree.filters,
    categoriesToPickFrom: state.catTree.categoriesToPickFrom
  };
};

export default connect(mapStateToProps, {
  getCat,
  loadOneMoreFilter,
  selectCategory,
  selectOption
})(AdditionalFilter);
