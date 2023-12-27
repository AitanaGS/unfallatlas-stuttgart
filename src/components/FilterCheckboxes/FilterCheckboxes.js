import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// const initialFilter = {
//   alle: true,
//   fuss: true,
//   rad: true,
//   krad: true,
//   pkw: true,
//   sonstige: true,
// };

// const falseFilter = {
//   alle: false,
//   fuss: false,
//   rad: false,
//   krad: false,
//   pkw: false,
//   sonstige: false,
// };

// const initialFilter = {
//   Fußgänger: true,
//   Fahrrad: true,
//   Kraftrad: true,
//   PKW: true,
//   Sonstige: true,
// };

function FilterCheckboxes({
  filter,
  setFilter,
  allFilter,
  setAllFilter,
  setFilteringMode,
  dashboardWidth,
  feature,
}) {
  // const [allFilter, setAllFilter] = useState(true);
  // const [filter, setFilter] = useState(initialFilter);

  // const filterList = ['allFiltere', ...Object.keys(initialFilter)];

  // New
  // const filterParticipant = filter.slice(0, -2);
  // const filterKateg = filter.slice(-2);

  // console.log('filterParticipant', filterParticipant);
  // console.log('filterKateg', filterKateg);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === 'Alle') {
      // If "allFiltere" checkbox is clicked, update allFilter other checkboxes accordingly
      setAllFilter(checked);
      const updatedFilter = { ...filter };
      for (const key in updatedFilter) {
        updatedFilter[key] = checked;
      }
      setFilter(updatedFilter);
      // setFilteringMode(checked ? 'checkbox' : 'none');
      setFilteringMode(!checked ? 'checkbox' : 'none');
    } else {
      // If any other checkbox is clicked, update its state and "allFiltere" checkbox
      const updatedFilter = { ...filter, [name]: checked };
      setFilter(updatedFilter);

      // Check if allFilter other checkboxes are checked, and update "allFiltere" accordingly
      const allFilterChecked = Object.values(updatedFilter).every(
        (value) => value
      );
      setAllFilter(allFilterChecked);
      // console.log('allfilterchecked', allFilterChecked);
      allFilterChecked
        ? setFilteringMode('none')
        : setFilteringMode(`checkbox ${name}`); // here: 'checkbox
    }
    // console.log('name', name, 'checked', checked);
  };

  // useEffect(() => {
  //   if (allFilter) {
  //     setFilter({
  //       Fußgänger: true,
  //       Fahrrad: true,
  //       Kraftrad: true,
  //       PKW: true,
  //       Sonstige: true,
  //     });
  //   }

  //   // if (Object.values(filter).every(Boolean)) {
  //   //   setallFilter(true);
  //   // }

  //   // if (Object.values(filter).any(false)) {
  //   //   setallFilter(false);
  //   // }
  // }, [allFilter, filter]);
  // // console.log('filter list', filterList);

  return (
    <>
      <FormWrapper
        dashboardWidth={dashboardWidth}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <fieldset style={{ border: 'none' }}>
          <legend>Auswahl {feature}:</legend>
          <label>
            <input
              type="checkbox"
              id="Alle"
              name="Alle"
              value="Alle"
              checked={allFilter}
              onChange={handleCheckboxChange}
            />
            Alle
          </label>
          {Object.keys(filter).map((key) => (
            <label key={key}>
              <input
                type="checkbox"
                id={key}
                name={key}
                value={key}
                checked={filter[key]}
                onChange={handleCheckboxChange}
              />
              {key}
            </label>
          ))}
          {/* {filterList.map((option) => (
            <div key={option}>
              <input
                type="checkbox"
                id={option}
                value={option}
                checked={
                  option === 'allFiltere'
                    ? allFilter === true
                    : filter[option] === true
                }
                onChange={(event) => {
                  if (option === 'allFiltere') {
                    console.log('allFiltere clicked', event.target.checked);
                    setAllFilter(event.target.checked);
                  } else if (option !== 'allFiltere') {
                    setFilter({
                      ...filter,
                      [option]: event.target.checked,
                    });
                    // if (Object.values(filter).every(Boolean)) {
                    //   setAll(true);
                    // }
                    if (!event.target.checked) {
                      setAll(false);
                    }
                    // !event.target.checked ? setAll(false) : undefined;
                  }
                }}
                // onChange={(event) => {
                //   console.log(event.target.checked);
                //   if (option === 'alle' && event.target.checked) {
                //     setFilter(initialFilter);
                //   } else if (
                //     option !== 'alle' &&
                //     event.target.checked === false
                //   ) {
                //     setFilter({
                //       ...filter,
                //       [option]: event.target.checked,
                //       alle: false,
                //     });
                //   } else {
                //     setFilter({
                //       ...filter,
                //       [option]: event.target.checked,
                //     });
                //   }

                //   // else if (option !== 'alle' && event.target.checked) {
                //   //   setFilter({
                //   //     ...filter,
                //   //     [option]: event.target.checked,
                //   //     alle: false
                //   //   });
                //   // }
                //   // else if (
                //   //   option != 'alle' &&
                //   //   !event.target.checked
                //   // ) {
                //   //   setFilter({
                //   //     ...filter,
                //   //     [option]: !event.target.checked,
                //   //     alle: false,
                //   //   });
                //   // }
                //   // else if (option != 'alle' && event.target.checked) {
                //   //   setFilter({
                //   //     ...filter,
                //   //     [option]: event.target.checked,
                //   //   });
                //   // }
                // }}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))} */}
        </fieldset>
      </FormWrapper>
      {/* <p>
        <strong>Stored state:</strong>
      </p>
      <p className="output">{JSON.stringify(filter, null, 2)}</p> */}
    </>
  );
}

export default FilterCheckboxes;

const FormWrapper = styled.form`
  /* display: flex;
  flex-wrap: wrap;
  max-width: 100%; // 500px */
  width: ${(props) => props.dashboardWidth}px;
  margin: 10px 0;
  /* border: none; */
`;
