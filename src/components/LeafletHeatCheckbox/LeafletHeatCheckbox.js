import React from 'react';
import styled from 'styled-components';

function LeafletHeatCheckbox({
  selectHeatmap,
  setSelectHeatmap,
  dashboardWidth,
}) {
  const handleSelectHeatmap = (event) => {
    setSelectHeatmap(event.target.checked);
  };

  return (
    <>
      <FormWrapper
        dashboardWidth={dashboardWidth}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <fieldset style={{ border: 'none' }}>
          {/* <legend>Heatmap</legend> */}
          <label>
            <input
              type="checkbox"
              id="heatmap"
              name="heatmap"
              value="Alle"
              checked={selectHeatmap}
              onChange={handleSelectHeatmap}
            />
            Heatmap
          </label>
        </fieldset>
      </FormWrapper>
    </>
  );
}

export default LeafletHeatCheckbox;

const FormWrapper = styled.form`
  /* display: flex;
  flex-wrap: wrap;
  max-width: 100%; // 500px */
  width: ${(props) => props.dashboardWidth}px;
`;
