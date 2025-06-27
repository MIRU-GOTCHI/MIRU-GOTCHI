import { useGoalsFirestore } from "@hooks/useGoalsMutation"
import { Button, Dialog, Grid, styled } from "@mui/material"
import CharacterFormCont from "@pages/formPage/component/CharacterFormCont"
import GoalFormCpnt from "@pages/formPage/component/GoalFormCpnt"
import { useEffect, useState } from "react"

import type { CreateGoalData, Goal } from "@models/goal"

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '85vh',
  minHeight: '60vh',
  borderRadius: '5px',

})
const FormBox = styled(Grid)({
  display: 'flex',
  width: '100%',
  minHeight: '60vh',
  flexGrow: 1,
  borderRadius: '5px',

})
const FormFooter = styled(Grid)({
  width: '100%',
  height: '6vh',
  display: 'flex',
})
const FormButton = styled(Button)({
  marginLeft: 'auto',
  padding: '0 10vh',
  height: '5vh',
  marginTop: 'auto'
})
interface EditGoalFormDialogProps {
  open: boolean;
  onClose: () => void;
  goal: Goal;
}
const EditHabitDetailModal: React.FC<EditGoalFormDialogProps>
  = ({ open, onClose, goal }) => {
    const { updateGoal } = useGoalsFirestore(); // 업데이트 뮤테이션 훅

    // 폼 데이터 상태 관리 (EditGoalFormDialog에서 관리)
    const [formData, setFormData] = useState({
      title: goal.title,
      description: goal.description,
      period: String(goal.totalDays / 7),
      characterId: goal.characterId,
      characterStatus: goal.characterStatus,
    });

    // goal prop이 변경될 때 (모달이 다시 열리거나 goal 데이터가 변경될 경우) 폼 데이터 재설정
    useEffect(() => {
      if (goal) {
        setFormData({
          title: goal.title,
          description: goal.description,
          period: String(goal.totalDays / 7),
          characterId: goal.characterId,
          characterStatus: goal.characterStatus,
        });
      }
    }, [goal]);

    // 폼 필드 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePeriodChange = (value: string) => {
      setFormData(prev => ({ ...prev, period: value }));
    };

    const handleCharacterChange = (newCharacterId: string) => {
      setFormData(prev => ({
        ...prev,
        characterId: newCharacterId,
      }));
    };

    // 폼 제출 핸들러 (EditGoalFormDialog에서 관리)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // 유효성 검사
      if (!formData.title.trim() || !formData.period || !formData.characterId.trim()) {
        alert('습관 이름, 기간, 캐릭터를 모두 선택해주세요.');
        return;
      }

      const periodInWeeks = parseInt(formData.period);
      if (isNaN(periodInWeeks) || periodInWeeks <= 0) {
        alert('유효한 기간을 선택해주세요.');
        return;
      }

      const startDate = goal.startDate;
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + (periodInWeeks * 7));

      const updatedGoalData: Partial<CreateGoalData> = {
        title: formData.title,
        description: formData.description,
        startDate: startDate,
        endDate: endDate,
        characterId: formData.characterId,
      };

      try {
        await updateGoal.mutateAsync({
          docId: goal.id,
          data: updatedGoalData,
        });
        alert('습관이 성공적으로 수정되었습니다!');
        onClose(); // 성공 시 모달 닫기
      } catch (error: any) {
        alert('습관 수정 실패: ' + error.message);
        console.error('습관 수정 에러:', error);
      }
    };

    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="edit-goal-dialog-title"
        fullWidth
        maxWidth="sm"
        sx={{ '& .MuiDialog-paper': { borderRadius: '15px', padding: '20px', minWidth: '80vw' } }} // 모달 테두리 둥글게, 내부 패딩
      >
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
            <FormButton type="submit" onClick={onClose}>
              {updateGoal.isPending ? '등록 중...' : '수정 완료'}
            </FormButton>
          </FormFooter>
        </Form>
      </Dialog>

    )
  }

export default EditHabitDetailModal

