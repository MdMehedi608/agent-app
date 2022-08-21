import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";

export const Accordion = styled((props) => (  
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  padding: "0",
  margin: "0",
  border: "0",
  borderLeft: "none",
  borderRight: "none",
  border: `1px solid #e5e5e5`,
  position: "relative",
  [theme.breakpoints.down('md')]: {
    borderTop: 'none',
  },
  // border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  display: "flex",
  flexDirection: "column",
  "& a": {
    position: "relative",
    color: "#8F8F8F",
    padding: "7px 0 2px 15px",
    margin: "0",
    fontSize: "16px",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      color: "#dd4814",
      backgroundColor: "rgba(25,25,50,0.1)",
    },
    "&.active": {
      color: "#8F8F8F",
      fontWeight: "bold",
    },
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<KeyboardArrowDownSharpIcon sx={{fontSize: '20px'}} />} {...props} />
))(({ theme }) => ({
  padding: theme.spacing(0),  
  height: '38px',  
  backgroundColor:
    theme.palette.mode === "dark"
      ? "redrgba(255, 255, 255, .05)"
      : "transparent",
  flexDirection: "row",  
  [theme.breakpoints.down('md')]: {
    height: '30px',
    backgroundColor: 'red'
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "#bababa",
    marginRight: '3px'
  },
  "& .MuiAccordionSummary-content a": {
    padding: "0 16px 0 7px",
    color: "black",
    textShadow: "none !important",
    fontSize: "17px",
    textDecoration: "none",
    cursor: "pointer",
    paddingLeft: "14px",
    width: '100%',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
  },
  "& .MuiAccordionSummary-content.Mui-expanded a": {
    color: "#dd4814",
    fontWeight: "bold",
  },
  "& .MuiAccordionSummary-content .active": {
    color: "#dd4814",
    fontWeight: "bold",
  },
  "& .MuiAccordionSummary-content": {
    margin: theme.spacing(0),
    width: '100%',
    height: '100%',
    alignItems: 'center',    
  },
}));

export const AccordionSummaryBySingle = styled((props) => (
  <MuiAccordionSummary {...props} />
))(({ theme }) => ({
  padding: theme.spacing(0),
  height: '38px',
  backgroundColor:
    theme.palette.mode === "dark"
      ? "redrgba(255, 255, 255, .05)"
      : "transparent",
  flexDirection: "row",
  [theme.breakpoints.down('md')]: {
    height: '30px',
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "#bababa",
    marginRight: '3px'
  },
  "& .MuiAccordionSummary-content a": {
    padding: "0 16px 0 7px",
    color: "black",
    textShadow: "none !important",
    fontSize: "17px",
    textDecoration: "none",
    cursor: "pointer",
    paddingLeft: "14px",
    width: '100%',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
  },
  "& .MuiAccordionSummary-content .active": {
    color: "#0088CC",
    fontWeight: "bold",
  },
  "& .MuiAccordionSummary-content": {
    margin: theme.spacing(0),
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
}));