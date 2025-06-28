import styled from "styled-components";

const LoadingBox = styled("div") ({

});

const Loader = styled("div") ({
  display: "block",
  position: "relative",
  height: "20px",
  width: "140px",
  margin: "0 auto",
  backgroundImage: `linear-gradient(#FFF 20px, transparent 0), 
  linear-gradient(#FFF 20px, transparent 0), 
  linear-gradient(#FFF 20px, transparent 0), 
  linear-gradient(#FFF 20px, transparent 0)`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "20px auto",
  backgroundPosition: "0 0, 40px 0, 80px 0, 120px 0",
  animation: "pgfill 1s linear infinite",
  "@keyframes pgfill": {
    "0%": { backgroundImage: `linear-gradient(#FFF 20px, transparent 0), linear-gradient(#FFF 20px, transparent 0), linear-gradient(#FFF 20px, transparent 0), linear-gradient(#FFF 20px, transparent 0)` },
    "25%": { backgroundImage: `linear-gradient(#5B93D5 20px, transparent 0), linear-gradient(#FFF 20px, transparent 0), linear-gradient(#FFF 20px, transparent 0), linear-gradient(#FFF 20px, transparent 0)`},
    "50%": { backgroundImage: `linear-gradient(#5B93D5 20px, transparent 0), linear-gradient(#5B93D5 20px, transparent 0), linear-gradient(#FFF 20px, transparent 0), linear-gradient(#FFF 20px, transparent 0)`},
    "75%": { backgroundImage: `linear-gradient(#5B93D5 20px, transparent 0), linear-gradient(#5B93D5 20px, transparent 0), linear-gradient(#5B93D5 20px, transparent 0), linear-gradient(#FFF 20px, transparent 0)`},
    "100%": { backgroundImage: `linear-gradient(#5B93D5 20px, transparent 0), linear-gradient(#5B93D5 20px, transparent 0), linear-gradient(#5B93D5 20px, transparent 0), linear-gradient(#5B93D5 20px, transparent 0)`},
  },
});

const Loading = () => {
  return (
  <LoadingBox>
    <Loader></Loader>
  </LoadingBox>
  );
};

export default Loading;
