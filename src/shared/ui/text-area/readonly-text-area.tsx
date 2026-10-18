import { TextareaAutosize } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ReadonlyTextArea = styled(TextareaAutosize)(
	({ theme }) => `
    width: 100%;
    font-family: ${theme.typography.fontFamily};
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 4px;
    resize: none;
    border-radius: 12px 12px 12px 12px;
    border: 1px solid ${theme.palette.primary.light};
  
    &:focus {
      border-color:${theme.palette.primary.light};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
