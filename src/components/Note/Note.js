import React from 'react';
import styled from 'styled-components';

function Note({ svgFontSize, margin, children }) {
  return (
    <NoteWrapper svgFontSize={svgFontSize} margin={margin}>
      {children}
    </NoteWrapper>
  );
}

const NoteWrapper = styled.div`
  /* margin-top: -60px; */
  /* margin-top: ${({ vizWrapperGap }) =>
    `${-(vizWrapperGap + 5)}px`}; */
  margin: ${({ margin }) => margin};
  font-size: ${({ svgFontSize }) => `${svgFontSize.text}rem`};
  font-family: var(--font-noto-sans);
  color: rgba(59, 59, 59, 1);
`;

export default Note;