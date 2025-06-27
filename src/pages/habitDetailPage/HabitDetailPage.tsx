import BeforeBtn from '@common/components/BeforeBtn';
import { useAuthContext } from '@hooks/auth/useAuthContext';
import { useGetGoalDetail } from '@hooks/useGetGoalDetail';
import { useGoalsFirestore } from '@hooks/useGoalsMutation';
import { Box, Button, Grid, LinearProgress, styled } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import EditHabitDetailModal from './component/EditHabitDetailModal';

const FlexBox = styled(Box)({
  display: 'flex',
  gap: 10,
});
const HabitDetailBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1000px',
  maxHeight: '100%',
  flexGrow: 1,
  backgroundColor: '#FF101020',
  borderRadius: '10px',
  padding: '10px 20px',
  margin: '0 auto',
});
const HabitDetailTitle = styled(Grid)({
  width: '100%',
  height: '6vh',
  display: 'flex',
});
const EditBtn = styled('button')({
  background: 'none',
  fontFamily: 'fontGalmuri',
  fontSize: '13px',
  color: 'rgba(17, 17, 17, 0.68)',
  padding: '3px 10px',
  '& selected': {
    color: '',
  },
});
const HabitContainBox = styled(Grid)({
  width: '100%',
  flexGrow: 1,
  display: 'flex',
  gap: 10,
});
const CharacterGrid = styled(Grid)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});
const HabitProgress = styled(LinearProgress)({
  height: 15,
  borderRadius: 15,
  flexGrow: 1,
  marginTop: '3px',
});
const HabitDescBox = styled(Box)({
  width: '100%',
  backgroundColor: '#ffffff60',
  flexGrow: 1,
  borderRadius: '10px',
  padding: '20px',
});
const HabitContSecGrid = styled(Grid)({
  width: '100%',
  gap: 10,
  display: 'flex',
  flexDirection: 'column',
});
const InformHeadBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  color: 'rgba(17, 17, 17, 0.68)',
});
const HabitDoneBtn = styled(Button)({
  width: '100%',
  borderRadius: '20px',
});

const HabitDetailPage = () => {
  const { id } = useParams();
  const { userId } = useAuthContext();
  const navigate = useNavigate();

  const { deleteGoal } = useGoalsFirestore();
  const { data, isLoading } = useGetGoalDetail(userId, id);
  // 모달
  const [openEditModal, setOpenEditModal] = useState(false);

  if (!id) {
    return <div>오류: 파라미터값이 발견되지 않았습니다.</div>;
  }
  if (!userId) {
    return <div>로그인이 필요합니다.</div>;
  }
  if (!data) {
    return <div>⚠️오류: 존재하지않는 습관입니다.</div>;
  }
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // console.log('data', data)

  // 진행률
  const totalDays = data?.totalDays ?? 0;
  const successCount = data?.successCount ?? 0;
  const progressValue = (successCount / totalDays) * 100;

  const now = new Date();

  // 삭제 핸들러
  const handleDeleteGoal = async () => {
    if (!data.id) {
      alert('삭제할 목표 ID를 찾을 수 없습니다.');
      return;
    }
    if (window.confirm(`정말로 "${data.title}" 습관을 삭제하시겠습니까?`)) {
      try {
        await deleteGoal.mutateAsync(data.id);
        alert('습관이 성공적으로 삭제되었습니다.');
        navigate('/habit');
      } catch (err: any) {
        alert('습관 삭제 실패: ' + err.message);
        console.error('습관 삭제 에러:', err);
      }
    }
  };

  // 수정 모달 열기/닫기 핸들러
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  // 수정 버튼 조건
  const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
  const isEditable = Math.abs(data.startDate.getTime() - now.getTime()) < ONE_DAY_IN_MS;
  return (
    <>
      <BeforeBtn />
      <HabitDetailBox>
        <HabitDetailTitle>
          <h2>{data?.title}</h2>

          {!isEditable ? (
            ''
          ) : (
            <Box sx={{ marginLeft: 'auto' }}>
              {data.failCount > 2 ? '' : <EditBtn onClick={handleOpenEditModal}>수정</EditBtn>} |
              <EditBtn onClick={handleDeleteGoal}>삭제</EditBtn>
            </Box>
          )}
        </HabitDetailTitle>

        <HabitContainBox container spacing={2}>
          <CharacterGrid size={{ xs: 12, sm: 7 }}>
            <Box
              sx={{
                width: '100%',
                height: '90%',
                minHeight: '150px',
                backgroundColor: '#fff',
                borderRadius: '10px',
              }}
            ></Box>
            <FlexBox>
              <div className="fontBitBit">Lv.{data.characterStatus.level} </div>
              <HabitProgress value={progressValue} variant="determinate" color="secondary" />
            </FlexBox>
          </CharacterGrid>

          <HabitContSecGrid size={{ xs: 12, sm: 5 }}>
            <InformHeadBox>
              <p>
                목표기간 : {data?.startDate.toLocaleDateString()}~
                {data?.endDate.toLocaleDateString()}
              </p>
            </InformHeadBox>
            <HabitDescBox>
              <p>{data?.description}</p>
            </HabitDescBox>
            <HabitDoneBtn variant="contained" color="secondary">
              오늘의 ({data?.title.slice(0, 10)}) 완료하기
            </HabitDoneBtn>
          </HabitContSecGrid>
        </HabitContainBox>
      </HabitDetailBox>

      {/* 수정 폼 모달 */}
      {data && (
        <EditHabitDetailModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          goal={data} // 현재 목표 데이터를 prop으로 전달
        />
      )}
    </>
  );
};

export default HabitDetailPage;
