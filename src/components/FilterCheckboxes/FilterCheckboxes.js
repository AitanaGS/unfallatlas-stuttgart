import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils/constants';

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
  chartWidth,
  description,
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

  // TODO: accessibility
  // TODO: add css transion of checkmarks
  // console.log(COLORS);
  // console.log('render');

  return (
    <>
      <FormWrapper
        chartWidth={chartWidth}
        onSubmit={(event) => {
          event.preventDefault();
        }}
        tabIndex={0}
        aria-label={`Checkboxen zum Filtern von ${description}`}
      >
        <Fieldset style={{ border: 'none' }}>
          <legend
            style={{
              fontWeight: 700,
              marginBottom: '5px',
              marginTop: '3px',
            }}
          >
            {description}:
          </legend>
          <Label>
            Alle
            <CheckboxInput
              type="checkbox"
              id="Alle"
              name="Alle"
              value="Alle"
              checked={allFilter}
              onChange={handleCheckboxChange}
              colors={COLORS}
            />
            {/* Alle */}
            <Checkmark className="checkmark" colors={COLORS} />
          </Label>
          {Object.keys(filter).map((key) => (
            <Label key={key}>
              {key}
              <CheckboxInput
                type="checkbox"
                id={key}
                name={key}
                value={key}
                checked={filter[key]}
                onChange={handleCheckboxChange}
                colors={COLORS}
              />
              <Checkmark className="checkmark" colors={COLORS} />
              {/* {key} */}
            </Label>
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
        </Fieldset>
      </FormWrapper>
      {/* <p>
        <strong>Stored state:</strong>
      </p>
      <p className="output">{JSON.stringify(filter, null, 2)}</p> */}
    </>
  );
}

const FormWrapper = styled.form`
  /* display: flex;
  flex-wrap: wrap;
  max-width: 100%; // 500px */
  width: ${(props) => props.chartWidth}px;
  /* margin: 10px 0; */
  /* border: none; */
`;

// const Label = styled.label`
//   /* padding-left: 10px;
//   input[type='checkbox'] {
//     height: 20px;
//     width: 20px;

//     background-color: red;
//   } */

//   /* display: block;
//   position: relative;
//   padding-left: 35px;
//   margin-bottom: 12px;
//   cursor: pointer;
//   font-size: 22px;
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none; */

//   input {
//     position: absolute;
//     opacity: 0;
//     cursor: pointer;
//   }
//   input:checked + .checkmark {
//     background-color: #2196f3; /* Change background color when checked */
//   }

//   input:checked + .checkmark:after {
//     display: block;
//   }
// `;

// const Checkmark = styled.span`
//   /* position: absolute;
//   top: 0;
//   left: 0;
//   height: 25px;
//   width: 25px;
//   background-color: #eee; */

//   position: absolute;
//   top: 0;
//   left: 0;
//   height: 20px;
//   width: 20px;
//   background-color: #eee; /* Background color of the checkbox */
//   border: 1px solid #aaa; /* Border color of the checkbox */
//   border-radius: 5px; /* Border radius to create rounded corners */

//   :after {
//     content: '';
//     position: absolute;
//     display: none;
//     left: 7px;
//     top: 3px;
//     width: 5px;
//     height: 10px;
//     border: solid white;
//     border-width: 0 2px 2px 0;
//     transform: rotate(45deg);
//   }
// `;

const Fieldset = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
`;

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 30px;
  margin: 5px;

  /* margin-bottom: 12px; */
  cursor: pointer;
  /* font-size: 22px; */
  user-select: none;

  /* On mouse-over, add a grey background color */
  /* &:hover input ~ .checkmark {
    background-color: #ccc;
  } */
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  /* border: 3px solid rgba(97, 90, 74, 1); */
  /* border: 3px solid rgba(104, 104, 104, 1); */
  border: ${(props) => `3px solid ${props.colors.gray.dark}`};
  border-radius: 5px;
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  /* background-color: rgba(255, 238, 199, 1); */
  /* background-color: rgba(255, 247, 228, 1); */
  background-color: ${(props) => props.colors.yellow.medium};
  /* border: 3px solid rgba(97, 90, 74, 1); */
  /* border: 3px solid rgba(104, 104, 104, 1); */
  border: ${(props) => `3px solid ${props.colors.gray.dark}`};
  border-radius: 5px;

  /* When the checkbox is checked, add a blue background */
  /* ${CheckboxInput}:checked ~ & {
    background-color: #2196f3;
  } */
  /* ${CheckboxInput} ~ & {
    background-color: rgba(255, 238, 199, 1);
  } */

  /* Create the checkmark/indicator (hidden when not checked) */
  &:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  ${CheckboxInput}:checked ~ &:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  &:after {
    left: 7px; /* Adjusted position for the larger checkmark */
    top: 2px; /* Adjusted position for the larger checkmark */
    width: 5px;
    height: 10px;
    /* border: solid rgba(97, 90, 74, 1); */
    /* border: solid rgba(104, 104, 104, 1); */
    border: ${(props) => `solid ${props.colors.gray.dark}`};
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

export default React.memo(FilterCheckboxes);
