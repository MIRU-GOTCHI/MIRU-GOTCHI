import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, styled } from '@mui/material';

const GoalFormBox = styled(Grid)({
  width: '100%',
  height: 'auto',
  borderRadius: '15px',
  backgroundColor: '#5B93D595',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  '@media (min-width: 1001px)': { padding: '30px 20px', },
  '@media (max-width: 600px)': { gap: 10, fontSize: '12px', padding: '15px 15px', },
});
const TitleTextField = styled(TextField)(() => ({
  width: '100%',
  color: '#fff',
  backgroundColor: '#ffffff80',
  borderRadius: '5px',
  '&hover': {
    border: '#fff',
  },
  border: 'none',
  '& fieldset': { border: 'none' },
  '& .MuiInputBase-input': {
    '&::placeholder': { fontFamily: 'Galmuri14', },
    fontFamily: 'Galmuri14',
    '@media (max-width: 600px)': { fontSize: '12px',maxHeight:'18vh',overflowY:'auto'},
    '@media (max-height: 780px)': { fontSize: '12px',maxHeight:'13vh',overflowY:'auto'},
    '@media (max-height: 700px)': { fontSize: '12px',maxHeight:'6vh',overflowY:'auto'},
  }
}));
const CalenderIcon = styled('img')({
  height: '25px',
  filter: 'invert(100%)',
})
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
  onPeriodChange: (value: string) => void; // Select의 onChange는 value만 전달
  onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const GoalFormCpnt: React.FC<GoalFormCpntProps> = ({
  title,
  period,
  description,
  onTitleChange,
  onPeriodChange,
  onDescriptionChange,
}) => {
  return (
    <GoalFormBox size={{ xs: 12, md: 6 }} container>
      <TitleTextField
        placeholder="습관 이름을 입력하세요. (최대 30자)"
        multiline
        InputProps={{ disableUnderline: true }}
        inputProps={{maxLength:30}}
        name="title"
        value={title}
        onChange={onTitleChange}
      />
      <DateSelectBox>
        <InputLabel>
          <CalenderIcon src="/icon/interface-essential-calendar-appointment--Streamline-Pixel.svg" />
        </InputLabel>
        <Select
          // onChange={handle}
          label="기간"
          MenuProps={{ PaperProps: { sx: { maxHeight: 150, overflowY: 'auto' } } }}
          value={period}
          onChange={(e) => onPeriodChange(e.target.value as string)}
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
