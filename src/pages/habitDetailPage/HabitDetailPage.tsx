import BeforeBtn from "@common/components/BeforeBtn"
import { Box, Button, Grid, styled } from "@mui/material"

const HabitDetailBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxHeight: '100%',
  flexGrow: 1,
  backgroundColor: '#5B93D5',
  borderRadius: '10px',
  padding: '10px 20px'
})
const HabitDetailTitle = styled(Grid)({
  width: '100%',
  height: '6vh'
})
const HabitContainBox = styled(Grid)({
  width: '100%',
  flexGrow: 1,
  display: 'flex'
})
const HabitDescBox = styled(Box)({
  width: '100%',
  backgroundColor: '#ffffff60',
  flexGrow: 1,
  borderRadius:'10px',

})
const HabitContSecGrid = styled(Grid)({
  width: '100%',
  gap: 6,
  display: 'flex',
  flexDirection: 'column'
})
const HabitDoneBtn = styled(Button)({
  width: '100%',
  color: '#fff',
  backgroundColor: '#B0E501',
  borderRadius:'20px',
})
const HabitDetailPage = () => {
  return (
    <>
      <BeforeBtn />
      <HabitDetailBox >
        <HabitDetailTitle>
          <h2>title</h2>
        </HabitDetailTitle>
        <HabitContainBox container spacing={2}>
          <Grid size={{ xs: 12, sm: 7 }} >
            <Box sx={{ width: '100%', height: '100%',minHeight:'150px', backgroundColor: '#fff' , borderRadius:'10px',}}></Box>
          </Grid>
          <HabitContSecGrid size={{ xs: 12, sm: 5 }} >
            <p >목표기간 : 2025년 6월 14일 ~ 2025년 7월 14일</p>
            <HabitDescBox>
              <p>아무 책이나 한권 씩 읽고 독후감 쓰기아무 책이나 한권 씩 읽고 독후감 쓰기아무 책이나 한권 씩 읽고 독후감 쓰기아무 책이나 한권 씩 읽고 독후감 쓰기</p>
            </HabitDescBox>
            <HabitDoneBtn >오늘의 (습관 이름) 완료</HabitDoneBtn>
          </HabitContSecGrid>
        </HabitContainBox>

      </HabitDetailBox>
    </>
  )
}

export default HabitDetailPage

