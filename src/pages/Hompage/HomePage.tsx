
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImage from '../../assets/images/logo.png';
import { FormGroup } from "@mui/material";
import CustomItem from "@pages/HomPage/component/CustomItem";
import { getGoalsList, getGoalsWithTodayLog } from "@service/goalService";
import { useGetGoals } from "@hooks/useGetGoals";
import { useAuthContext } from "@hooks/auth/useAuthContext";
import { useGetLogs } from "@hooks/useGetLogs";
import { useGetGoalsWithTodyLog } from "@hooks/useGetGoalsWithTodyLog";
import CharacterBox from "@common/components/CharacterBox";
import { getTodayLog } from "@service/logService";

const MainContent = styled("div") ({
  margin: "-10px -20px 0",
  paddingBottom: "60px",
  // height: "calc(100% + 30px)",
})

const CharacterArea = styled("div") ({
  // height: "250px",
  backgroundColor: "#F2F2F3",
})

const CustomBox = styled("div") ({
  // height: "calc(100% - 250px)",
  padding: "20px 20px 0",
})

const CustomHead = styled("div") ({
  display: "flex",
  marginBottom: "15px",
  justifyContent: "space-between",
  "& .left, .right" : {

  }
})

const CustomList = styled("div") ({
  // height: "calc(100% - 37px)",
  // overflowY: "auto",
  "& > div" : {
    marginBottom: "10px",
  }
})




const HomePage = () => {
  // const goals = await getGoalsList(userId);

  const { userId } = useAuthContext();
   const { data } = useGetGoals(userId);
  //  const { data } = useGetGoalsWithTodyLog(userId);
  //  const { data:todayLog } = useGetLogs(userId,"Rm7igBZtyu3EY0EUJkh3");
  // const [checked, setChecked] = useState(true);
  // const { datas } = useGetLogs(userId, "E3hvMWrzWVyWsohJjYrt")

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };

  // console.log(todayLog)
  console.log(data)

  return (
  <MainContent>
    <CharacterArea>
      <CharacterBox/>
    </CharacterArea>
    <FormGroup>
    <CustomBox>
      <CustomHead>
        <div className="left">
          <span className="today">06월 26일</span>
        </div>
        <div className="right">
          <p>
            <span className="counter">4</span>
            <span className="total">/ {data ? data.length : "0"}</span>
            <span>개 완료</span>
          </p>
        </div>
      </CustomHead>
      <CustomList>
        {data && data.length > 0 ?
          (data.map((item) => (
          <CustomItem items={item} key={item.id}/>))) : "데이터 없음"
        }
      </CustomList>
    </CustomBox>
    </FormGroup>
  </MainContent>
  );
};

export default HomePage;
