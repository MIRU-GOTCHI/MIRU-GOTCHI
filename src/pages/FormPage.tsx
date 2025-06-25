import { Box, Button, Grid, styled } from "@mui/material"
import GoalFormCpnt from "./formPage/component/GoalFormCpnt"
import CharacterFormCont from "./formPage/CharacterFormCont"
import { useState } from "react"

const FormPageBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '96vw',
  maxWidth: '100vw',
  maxHeight: '100vh',
  padding: '2vw',

})
const FormTitle = styled(Box)({
  width: '100%',
  height: '40px',
})
const FormBox = styled(Grid)({
  display: 'flex',
  width: '100%',
  height: '80vh',
  borderRadius: '5px',

})

const FormFooter = styled(Box)({
  width: '100%',
  height: 'auto',
  display: 'flex',
})
const FormButton = styled(Button)({
  marginLeft: 'auto'
})
//////////////////////////////////////
const FormPage = () => {

  const [formData, setFormData] = useState({
    habitName: '',
    period: '',
    description: '',
    characterName: '',
  });

  // // 입력 필드 변경 핸들러
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // // Select 컴포넌트의 변경 핸들러
  // const handleSelectChange = (name, value) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // // 폼 제출 핸들러
  // const handleSubmit = (event) => {
  //   event.preventDefault(); // 기본 폼 제출 동작 방지
  //   console.log('폼 제출됨! 모든 데이터:', formData);
  //   // 여기에 폼 데이터 처리 로직 (예: API 호출)
  //   alert('폼이 제출되었습니다. 콘솔을 확인하세요!');
  // };

  return (
    <FormPageBox>
      <FormTitle>습관 등록</FormTitle>
      <form
        // onSubmit={handleSubmit}
      >
      <FormBox container spacing={2}>
        
          <GoalFormCpnt
          //props 추가
          // habitName={formData.habitName}
          // period={formData.period}
          // description={formData.description}
          // onHabitNameChange={handleChange}
          // onPeriodChange={(value) => handleSelectChange('period', value)}
          // onDescriptionChange={handleChange}
          />
          <CharacterFormCont
            //props 추가
            // characterName={formData.characterName}
            // onCharacterNameChange={handleChange}
          />
      </FormBox>
      </form>
      <FormFooter>
        <FormButton type="submit" > 등록 하기</FormButton>
      </FormFooter>
    </FormPageBox>
  )
}

export default FormPage

