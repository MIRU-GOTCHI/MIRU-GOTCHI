import BeforeBtn from "@common/components/BeforeBtn"
import { AuthContext } from "@context/AuthContext"
import { useAuthContext } from "@hooks/auth/useAuthContext"
import { useGetGoalDetail } from "@hooks/useGetGoalDetail"
import { Box, Button, colors, Grid, LinearProgress, linearProgressClasses, styled } from "@mui/material"
import { useParams } from "react-router"

const FlexBox = styled(Box)({
  display:'flex', gap: 10,
})
const HabitDetailBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxHeight: '100%',
  flexGrow: 1,
  backgroundColor: '#FF101020',
  borderRadius: '10px',
  padding: '10px 20px'
})
const HabitDetailTitle = styled(Grid)({
  width: '100%',
  height: '6vh',
  display: 'flex'
})
const EditBtn = styled('button')({
  background: 'none',
  fontFamily: 'fontGalmuri', fontSize: '13px', color: 'rgba(17, 17, 17, 0.68)',
  padding: '3px 10px',
  '& selected': {
    color: ''
  }
})
const HabitContainBox = styled(Grid)({
  width: '100%',
  flexGrow: 1,
  display: 'flex',
  gap: 10,

})
const CharacterGrid = styled(Grid)({
  width: '100%',
  display: 'flex', flexDirection: 'column', gap: 20,
})
const HabitProgress = styled(LinearProgress)({
  height: 15,
  borderRadius: 15,
  flexGrow: 1,
  marginTop: '3px',
})
const HabitDescBox = styled(Box)({
  width: '100%',
  backgroundColor: '#ffffff60',
  flexGrow: 1,
  borderRadius: '10px',
  padding: '20px'
})
const HabitContSecGrid = styled(Grid)({
  width: '100%',
  gap: 10,
  display: 'flex',
  flexDirection: 'column'
})
const InformHeadBox = styled(Box)({
  display: 'flex', alignItems: 'center',
  color: 'rgba(17, 17, 17, 0.68)',
})
const HabitDoneBtn = styled(Button)({
  width: '100%', borderRadius: '20px',
})

const HabitDetailPage = () => {
  const { id } = useParams();
  const { userId } = useAuthContext();
  if (!id) { return <div>오류: 파라미터값이 발견되지 않았습니다.</div>; }
  if (!userId) { return <div>로그인이 필요합니다.</div>; }

  const { data } = useGetGoalDetail(userId, id);
  if (!data) { return <div>⚠️오류: 존재하지않는 습관입니다.</div>; }
  // console.log('data', data)

  // 진행률
  const totalDays = data?.totalDays ?? 0;
  const successCount = data?.successCount ?? 0;
  const progressValue = (successCount / totalDays) * 100;

  return (
    <>
      <BeforeBtn />
      <HabitDetailBox >

        <HabitDetailTitle>
          <h2>{data?.title}</h2>
          <Box sx={{ marginLeft: 'auto' }}>
            <EditBtn>수정</EditBtn>|
            <EditBtn>삭제</EditBtn>
          </Box>
        </HabitDetailTitle>

        <HabitContainBox container spacing={2}>

          <CharacterGrid size={{ xs: 12, sm: 7 }} >
            <Box sx={{ width: '100%', height: '90%', minHeight: '150px', backgroundColor: '#fff', borderRadius: '10px', }}></Box>
            <FlexBox >
              <div className="fontBitBit" >Lv.{data.characterStatus.level} </div>
              <HabitProgress value={progressValue} variant="determinate" color="secondary" />
            </FlexBox>
          </CharacterGrid>

          <HabitContSecGrid size={{ xs: 12, sm: 5 }} >
            <InformHeadBox>
              <p >목표기간 : {data?.startDate.toLocaleDateString()}~{data?.endDate.toLocaleDateString()}</p>
            </InformHeadBox>
            <HabitDescBox>
              <p>{data?.description}</p>
            </HabitDescBox>
            <HabitDoneBtn variant="contained" color="secondary">오늘의 ({data?.title.slice(0, 10)}) 완료하기</HabitDoneBtn>
          </HabitContSecGrid>

        </HabitContainBox>

      </HabitDetailBox>
    </>
  )
}

export default HabitDetailPage

