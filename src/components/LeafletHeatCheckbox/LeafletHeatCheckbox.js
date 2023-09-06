import React from 'react';

function LeafletHeatCheckbox({ selectHeatmap, setSelectHeatmap }) {
  const handleSelectHeatmap = (event) => {
    setSelectHeatmap(event.target.checked);
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <fieldset>
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
      </form>
    </>
  );
}

export default LeafletHeatCheckbox;
