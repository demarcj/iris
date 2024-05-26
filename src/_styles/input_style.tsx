import { styled } from '@mui/joy';

export const label = { 
  display: `inline-block`, 
  paddingBottom: `5px`
};

export const checkbox = { 
  paddingBottom: `5px`
};

export const disabled_class = {
  backgroundColor: `gray`,
  color: `black`,
  cursor: `not-allowed`
};

export const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;