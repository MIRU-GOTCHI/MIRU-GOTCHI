import styled from "styled-components"

interface SectionTitleProps {
    children?: React.ReactNode,
    subTitle?: string,
}

const SectionTitleArea = styled("div") ({
  margin: "15px 0 10px",
  "&:first-child": {
    marginTop: "5px",
  },
  "& h2, & h3":{
    fontSize: "16px",
  },
  "& .subTitle":{
    marginTop: "4px",
    fontSize: "14px",
  }
})

const SectionTitle = ({children}:SectionTitleProps) => {
  return (
    <SectionTitleArea>
      {children}
    </SectionTitleArea>
  )
}

export default SectionTitle