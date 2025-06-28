import CharacterBox from '@common/components/CharacterBox';
import { useAuthContext } from '@hooks/auth/useAuthContext';
import { useGetGoals } from '@hooks/useGetGoals';
import { FormGroup } from '@mui/material';
import CustomItem from '@pages/HomePage/component/CustomItem';
import styled from 'styled-components';

const MainContent = styled('div')({
  margin: '-10px -20px 0',
  paddingBottom: '60px',
  // height: "calc(100% + 30px)",
});

const CharacterArea = styled('div')({
  // height: "250px",
  backgroundColor: '#F2F2F3',
});

const CustomBox = styled('div')({
  // height: "calc(100% - 250px)",
  padding: '20px 20px 0',
});

const CustomHead = styled("div") ({
  display: "flex",
  marginBottom: "15px",
  justifyContent: "space-between",
  ".today": {
    color: "#5B93D5",
    fontWeight: 600,
    fontSize: "16px",
  },
  "& .totalCounter": {
    fontSize: "11px",
    color: "#898989",
    ".counter": {
      marginLeft: "5px",
      color: "#5B93D5",
      fontWeight: 600,
      fontSize: "16px",
    },
    "& .total": {
      marginLeft: "5px",
      fontWeight: 600,
    },
  },
  "& .left, .right" : {

  }
})

const CustomList = styled('div')({
  // height: "calc(100% - 37px)",
  // overflowY: "auto",
  '& > div': {
    marginBottom: '10px',
  },
});

const HomePage = () => {
  const { userId } = useAuthContext();
  const { data } = useGetGoals(userId);
  const todayDate = new Date();
  const dateFormat = `${todayDate.getMonth() + 1} 월 ${todayDate.getDate()}일`;

  console.log(data);

  return (
    <MainContent>
      <CharacterArea>
        {data && (
          <CharacterBox
            failCount={data[0].failCount}
            title={data[0].title}
            characterStatus={data[0].characterStatus}
            characterId={data[0].characterId}
            totalDays={data[0].totalDays}
            successCount={data[0].successCount}
            bubbleTalk='습관은 습관으로 극복할 수 있다.'
          />
        )}
      </CharacterArea>
      <FormGroup>
        <CustomBox>
          <CustomHead>
            <div className="left">
              <span className="today">{dateFormat}</span>
            </div>
            <div className="right">
              <p className="totalCounter">
                <span>완료 : </span>
                <span className="counter">4</span>
                <span className="total">/ {data ? data.length : "0"}</span>
              </p>
            </div>
          </CustomHead>
          <CustomList>
            {data && data.length > 0
              ? data.map((item) => <CustomItem items={item} key={item.id} />)
              : '데이터 없음'}
          </CustomList>
        </CustomBox>
      </FormGroup>
    </MainContent>
  );
};

export default HomePage;
