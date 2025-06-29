import styled from "styled-components";
interface ContentTitleProps {
    children?: React.ReactNode,
}

const Inner = styled("div")({
    paddingBottom: "70px",
  '@media (min-width: 1000px)': { 
    paddingBottom: "50px",
  },
})

const ContentInner = ({children}:ContentTitleProps) => {
  return (
    <Inner className="innerContent">{children}</Inner>
  )
}

export default ContentInner