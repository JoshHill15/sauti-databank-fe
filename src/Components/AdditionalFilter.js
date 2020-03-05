import React from "react";
import Dropdown from "react-dropdown";

import styled from "styled-components";

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
    setSearchCategories
  } = props;
  // this will show a single selected category and 1 search option
  // searchOptions = ['Primary', 'KEN', 'Tubers']
  // searchCategories = ['Education Level',
  // 'country of residence',
  // 'Most requested stuff']
  return (
    // <>
    <div>
      <p>Additional Filter</p>
      <p className="disclosure">
        *This optional filter adjusts samplesize and may not always alter the
        graph appearance.
      </p>
      <Dropdown
        controlClassName="myControlClassName"
        arrowClassName="myArrowClassName"
        className="dropdown"
        disabled={loading}
        options={FilterBoxOptions.default.filter(
          obj =>
            obj.label !== filterBoxIndexLabel &&
            obj.label !== filterBoxCrossLabel
        )}
        value={filterBoxAdditionalFilterLabel}
        placeholder="Select a filter..."
        onChange={e => {
          console.log(e);
          setFilterBoxAdditionalFilter({
            type: e.value.type,
            query: e.value.query,
            label: e.label
          });
          setFilterBoxAdditionalFilterLabel(e.label);
          setCheckboxOptions([]);
          //   ClickTracker(e.value.type);
          //   console.log("event", e);
        }}
      />
      <div
        className="reset-btn"
        onClick={() => {
          setFilterBoxAdditionalFilter({ type: "", query: "" });
          setFilterBoxAdditionalFilterLabel("");
          setAdditionalFilter({ type: "", query: "" });
          setCheckboxOptions([]);
          setSelectedCheckbox({});
        }}
      >
        <p>Clear Additional Filter</p>
      </div>
      {/* </> */}
      {/* )} */}

      {graphLabels[`${filterBoxAdditionalFilter.type}`] && (
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
      )}
    </div>
  );
};

export default AdditionalFilter;
