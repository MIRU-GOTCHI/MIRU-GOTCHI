import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, styled } from '@mui/material';

const GoalFormBox = styled(Grid)({
  width: '100%',
  height: 'auto',
  borderRadius: '15px',
  backgroundColor: '#5B93D5',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
});
const TitleTextField = styled(TextField)(() => ({
  width: '100%',
  color: '#fff',
  backgroundColor: '#ffffff80',
  borderRadius: '10px',
  '&hover': {
    border: '#fff',
  },
  border: 'none',
  '& fieldset': { border: 'none' },
}));
const CalenderIcon = styled('img')({
  height: '25px',
});
const DateSelectBox = styled(FormControl)({
  width: '100%',
  borderColor: '#fff',
  '& fieldset': {
    borderColor: '#fff',
  },
});

interface GoalFormCpntProps {
  title: string;
  period: string;
  description: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPeriodWeeksChange: (value: string) => void; // Select의 onChange는 value만 전달
  onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const GoalFormCpnt: React.FC<GoalFormCpntProps> = ({
  title,
  period,
  description,
  onTitleChange,
  onPeriodWeeksChange,
  onDescriptionChange,
}) => {
  return (
    <GoalFormBox size={{ xs: 12, md: 6 }}>
      <TitleTextField
        placeholder="습관 이름을 입력하세요. "
        multiline
        InputProps={{ disableUnderline: true }}
        name="title"
        value={title}
        onChange={onTitleChange}
      />
      <DateSelectBox>
        <InputLabel>
          <CalenderIcon src="public/icon/interface-essential-calendar-appointment--Streamline-Pixel.svg" />
        </InputLabel>
        <Select
          // onChange={handle}
          label="기간"
          MenuProps={{ PaperProps: { sx: { maxHeight: 150, overflowY: 'auto' } } }}
          value={period}
          onChange={(e) => onPeriodWeeksChange(e.target.value as string)}
        >
          {[...Array(8)].map((_, index) => {
            // 1부터 20까지의 MenuItem 생성
            const value = index + 1;
            return (
              <MenuItem key={value} value={value}>
                {value} 주
              </MenuItem>
            );
          })}
        </Select>
      </DateSelectBox>

      <TitleTextField
        placeholder="세부 설명을 입력하세요."
        multiline
        sx={{ flexGrow: 1 }}
        name="description"
        value={description}
        onChange={onDescriptionChange}
      />
    </GoalFormBox>
  );
};

export default GoalFormCpnt;
