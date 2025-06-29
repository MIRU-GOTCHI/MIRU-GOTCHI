import BeforeBtn from "@common/components/BeforeBtn"
import { useGoalsFirestore } from "@hooks/useGoalsMutation"
import { Box, Button, Grid, styled } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router"

import CharacterFormCont from "./component/CharacterFormCont"
import GoalFormCpnt from "./component/GoalFormCpnt"

import type { CharacterStatus } from "@models/character"
import type { GrowthStage } from "@models/common"
import type { CreateGoalData } from "@models/goal"
import ContentTitle from "@layout/common/ContentTitle"

const FormPageBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  // maxWidth: '1200px',
  flexGrow: 1,
  fontFamily: 'Galmuri14',
  margin: '0 auto',
  // '@media (max-width: 1490px)': {maxWidth: '1000px',}
})
// const FormTitle = styled(Box)({
//   // height: '7vh',
//   display: 'flex',
//   alignItems: 'center',
//   fontSize: '20px',
// })
// const FlagIcon = styled('img')({
//   // height: '3.5vh',
//   margin: '0 15px'
// })
const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  // minHeight: '60vh',
  flexGrow: 1,
  borderRadius: '5px',
  // padding: "30px 0",

})
const FormBox = styled(Grid)({
  display: 'flex',
  width: '100%',
  // minHeight: '60vh',
  flexGrow: 1,
  borderRadius: '5px',

})
const FormFooter = styled(Grid)({
  width: '100%',
  // height: '6vh',
  // display: 'flex',
  textAlign: "center",
  marginTop: "30px",
})
const FormButton = styled(Button)({
  marginLeft: 'auto',
  width: "50%",
  minWidth: "200px",
  minHeight: "40px",
  '@media (max-width: 600px)': { width: "100%" },
  // padding: '0 10vh',
  // height: '5vh',
  // marginTop: 'auto'
})
//-----------------------------------------//
const FormPage = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    period: '',
    description: '',
    characterId: '',
    characterStatus: { growthStage: 'egg' as GrowthStage, level: 0, gone: false } as CharacterStatus
  });

  const { addGoal } = useGoalsFirestore();

  // // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 기간(Select) 컴포넌트 변경 핸들러
  const handlePeriodChange = (value: string) => {
    setFormData(prev => ({ ...prev, period: value }));
  };
  // CharacterFormCont에서 호출될 핸들러
  const handleCharacterChange = (newCharacterId: string) => {
    setFormData(prev => ({
      ...prev,
      characterId: newCharacterId, // <-- characterId 상태 업데이트
      // characterStatus는 고정값이므로 여기서 변경하지 않습니다.
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    // 폼 유효성 검사 (간단한 예시)
    if (!formData.title.trim() || !formData.period || !formData.characterId.trim()) {
      alert('습관 이름, 기간, 캐릭터를 모두 선택해주세요.');
      return;
    }

    // period를 startDate와 endDate로 변환
    const periodInWeeks = parseInt(formData.period);
    if (isNaN(periodInWeeks) || periodInWeeks <= 0) {
      alert('유효한 기간을 선택해주세요.');
      return;
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + (periodInWeeks * 7));

    // CreateGoalData 객체 생성
    const newGoalData: CreateGoalData = {
      title: formData.title,
      description: formData.description,
      startDate: startDate,
      endDate: endDate,
      characterId: formData.characterId,
      characterStatus: formData.characterStatus,
      successCount: 0,
      failCount: 0,
    };

    try {
      // addGoal 뮤테이션 실행
      await addGoal.mutateAsync(newGoalData);
      alert('습관이 성공적으로 등록되었습니다!');
      nav('/habit');
      setFormData({
        title: '',
        description: '',
        period: '',
        characterId: '',
        characterStatus: { growthStage: 'egg' as GrowthStage, level: 0, gone: false } as CharacterStatus,
      });
    } catch (error: any) {
      alert('습관 등록 실패: ' + error.message);
      console.error('습관 등록 에러:', error);
    }
  };


  return (
    <FormPageBox>
      <ContentTitle>
        <BeforeBtn />
        <h2>습관 등록</h2>
      </ContentTitle>

      {/* <FormTitle>
        <BeforeBtn />
        <FlagIcon src="public\icon\social-rewards-flag--Streamline-Pixel.svg" alt="" />
        습관 등록
      </FormTitle> */}
      <Form
        onSubmit={handleSubmit}
      >
        <FormBox container spacing={2}>

          <GoalFormCpnt
            // props 추가
            title={formData.title}
            period={formData.period}
            description={formData.description}
            onTitleChange={handleChange}
            onPeriodChange={handlePeriodChange}
            onDescriptionChange={handleChange}
          />
          <CharacterFormCont
            //props 추가
            characterId={formData.characterId}
            onCharacterChange={handleCharacterChange}
          />
        </FormBox>
        <FormFooter>
          <FormButton type="submit" disabled={addGoal.isPending}>
            {addGoal.isPending ? '등록 중...' : '등록 하기'}
          </FormButton>
        </FormFooter>
      </Form>
    </FormPageBox>
  )
}

export default FormPage

