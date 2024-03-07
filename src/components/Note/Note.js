import React from 'react';
import styled from 'styled-components';

function Note({ svgFontSize, margin, children }) {
  return (
    <NoteWrapper
      svgFontSize={svgFontSize}
      margin={margin}
      tabIndex={0}
    >
      {children}
    </NoteWrapper>
  );
}

const NoteWrapper = styled.div`
  margin: ${({ margin }) => margin};
  font-size: ${({ svgFontSize }) => `${svgFontSize.text}rem`};
  font-family: var(--font-noto-sans);
  color: rgba(59, 59, 59, 1);
`;

export default Note;
