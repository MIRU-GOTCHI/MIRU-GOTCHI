import React from 'react'
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, styled } from "@mui/material"


const GoalFormBox = styled(Grid)({
  width: '100%',
  height: 'auto',
  borderRadius: '15px',
  backgroundColor: '#5B93D5',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 30
})
const TitleTextField = styled(TextField)({
  width: '100%',
  color: '#fff',
  backgroundColor: '#ffffff80',
  borderRadius: '10px',
  '&hover': {
    border: '#fff'
  },
  border: 'none',
  '& fieldset': { border: 'none', },
})
const CalenderIcon = styled('img')({
  height:'25px',
})
const DateSelectBox = styled(FormControl)({
  width: '100%',
  borderColor: '#fff',
  '& fieldset': {
    borderColor: '#fff',
  },
})

const GoalFormCpnt = () => {
  return (
    <GoalFormBox size={{ xs: 12, md: 6 }} >
      <TitleTextField
        placeholder="습관 이름을 입력하세요. "
        multiline
      />
      <DateSelectBox>
        <InputLabel>
         <CalenderIcon src="public/icon/interface-essential-calendar-appointment--Streamline-Pixel.svg" />
        </InputLabel>
        <Select
          // onChange={handle}
          label="기간"
          MenuProps={{ PaperProps: { sx: { maxHeight: 150, overflowY: 'auto', }, }, }}
        >
          {[...Array(8)].map((_, index) => { // 1부터 20까지의 MenuItem 생성
            const value = index + 1;
            return (
              <MenuItem key={value} value={value}>{value} 주</MenuItem>
            );
          })}
        </Select>
      </DateSelectBox>
      <TitleTextField
        placeholder="세부 설명을 입력하세요."
        multiline
        sx={{ flexGrow: 1 }}
      />
    </GoalFormBox>
  )
}

export default GoalFormCpnt

