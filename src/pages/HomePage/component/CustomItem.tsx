import { useGetTodayLog } from '@hooks/useGetTodayLog';
import { Checkbox } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LogoImage from '../../../assets/images/logo.png';

import type { CharacterStatus } from '@models/character';
import type { Goal } from '@models/goal';

interface CustomItemProps {
  id: string;
  userId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  characterId: string;
  characterStatus: CharacterStatus;
  successCount: number;
  failCount: number;
  totalDays: number;
  createdAt: Date;
  updatedAt: Date;
}

const Item = styled("div") ({
  position: "relative",
  borderRadius: "4px",
  backgroundColor: "rgba(91,147,213,0.5)",
  "& .itemCheckbox": {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
  },
  "&.done": {
    backgroundColor: "rgba(176,229,1,0.5)",
  },
  "&.fail": {
    backgroundColor: "rgba(219,219,219,1)",
  }

})

const ItemLick = styled(Link) ({
  display: "flex",
  padding: "10px",
});

const ImgField = styled("div") ({
  flexShrink: 0,
  overflow: "hidden",
  width: "50px",
  height: "50px",
  backgroundColor: "#fff",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center center",
  }
})

const TxtField = styled("div") ({
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  paddingLeft: "15px",
  color: "#050505",
})

const CustomItem = ({items}:CustomItemProps) => {
  const {data} = useGetTodayLog(items.id);
  
  console.log(items)
  console.log(data)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkbox = event.target;
    if(checkbox.checked) {
      console.log(event.target.name)
      // console.log(userId)
    }
  };


  return (
    <>  
        <Item className=""> {/* fail done */}
          <ItemLick to={`habit/${items.id}`}>
            <ImgField>
              <img src={LogoImage} alt="" />
            </ImgField>
            <TxtField>
              <p>{items.title}</p>
            </TxtField>
          </ItemLick>
          <Checkbox
            className="itemCheckbox"
            name={items.id}
            onChange={handleChange}
          />
        </Item>
    </>
  )
}

export default CustomItem