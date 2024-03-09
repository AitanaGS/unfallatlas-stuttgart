import { COLORS } from '@/utils/constants';

import React from 'react';
import styled from 'styled-components';

function FilterCheckboxes({
  filter,
  setFilter,
  allFilter,
  setAllFilter,
  setFilteringMode,
  chartWidth,
  description,
}) {
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    if (name === 'Alle') {
      setAllFilter(checked);
      const updatedFilter = { ...filter };
      for (const key in updatedFilter) {
        updatedFilter[key] = checked;
      }
      setFilter(updatedFilter);
      setFilteringMode(!checked ? 'checkbox' : 'none');
    } else {
      const updatedFilter = { ...filter, [name]: checked };

      setFilter(updatedFilter);

      const allFilterChecked = Object.values(updatedFilter).every(
        (value) => value
      );
      setAllFilter(allFilterChecked);

      allFilterChecked
        ? setFilteringMode('none')
        : setFilteringMode(`checkbox ${name}`);
    }
  };

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
            </Label>
          ))}
        </Fieldset>
      </FormWrapper>
    </>
  );
}

const FormWrapper = styled.form`
  width: ${(props) => props.chartWidth}px;
`;

const Fieldset = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
`;

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 30px;
  margin: 5px;
  cursor: pointer;
  user-select: none;
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  border: ${({ colors }) => `3px solid ${colors.gray.dark}`};
  border-radius: 5px;
`;

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: ${({ colors }) => colors.yellow.medium};
  border: ${({ colors }) => `3px solid ${colors.gray.dark}`};
  border-radius: 5px;

  &:after {
    content: '';
    position: absolute;
    display: none;
  }

  ${CheckboxInput}:checked ~ &:after {
    display: block;
  }

  &:after {
    left: 7px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: ${({ colors }) => `solid ${colors.gray.dark}`};
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

export default React.memo(FilterCheckboxes);
