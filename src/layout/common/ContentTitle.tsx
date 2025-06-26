import styled from "styled-components";

interface ContentTitleProps {
    children?: React.ReactNode,
}

const ContentTitleBar = styled("div") ({
  margin: "0 -20px 10px",
  display: "flex",
  alignItems: "center",
  padding: "0 20px",
  minHeight: "40px",
  "& > button": {
    marginLeft: "-20px",
  },
  "& h2, & h3":{
    fontSize: "16px"
  }
});

const ContentTitle = ({children}:ContentTitleProps) => {
   return (
     <ContentTitleBar>
        {children}
     </ContentTitleBar>
   )
 }
 
 export default ContentTitle;