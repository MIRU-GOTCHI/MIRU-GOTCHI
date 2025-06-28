// import BeforeBtn from "@common/components/BeforeBtn"
// import Loading from "@common/components/Loading"
// import SectionTitle from "@common/components/SectionTitle"
// import ContentTitle from "@layout/common/ContentTitle"
// import { Button, Checkbox, Tab, Tabs } from "@mui/material"
// import { useState } from "react"

// const StyleGuidePage = () => {
//   const [value, setValue] = useState<string>('one');
//   const [value2, setValue2] = useState<string>('one2');

//   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//     setValue(newValue);
//   };

//   const handleChange2 = (event: React.SyntheticEvent, newValue: string) => {
//     setValue2(newValue);
//   };

//   return (
//     <div>
//       <ContentTitle>
//         <BeforeBtn />
//         <h2>스타일 가이드</h2>
//       </ContentTitle>

//       <SectionTitle>
//         <h2>폰트</h2>
//         <p className="subTitle">
//           Paperlogy, Galmuri14, DNFBitBitv2
//         </p>
//       </SectionTitle>
//       <p>기본 : Paperlogy</p>
//       <p className="fontGalmuri">갈무리 : className="fontGalmuri"</p>
//       <p className="fontBitBit">비트비트 : className="fontBitBit"</p>

//       <SectionTitle>
//         <h2>기본버튼</h2>
//       </SectionTitle>
//       <Button>default</Button>

//       <SectionTitle>
//         <h2>secondary, error 버튼</h2>
//         <p className="subTitle">
//           variant="contained" color="secondary"<br/>
//           variant="contained" color="error"
//         </p>
//       </SectionTitle>
//       <Button variant="contained" color="secondary">secondary</Button>
//       <Button variant="contained" color="error">error</Button>

//       <SectionTitle>
//         <h2>탭</h2>
//       </SectionTitle>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         aria-label="tabs example"
//       >
//         <Tab value="one" label="Item One" />
//         <Tab value="two" label="Item Two" />
//         <Tab value="three" label="Item Three" />
//       </Tabs>

//       <Tabs
//         value={value2}
//         onChange={handleChange2}
//         aria-label="tabs example"
//         variant="fullWidth"
//       >
//         <Tab value="one2" label="Item One2" />
//         <Tab value="two2" label="Item Two2" />
//         <Tab value="three2" label="Item Three2" />
//       </Tabs>

//       <SectionTitle>
//         <h2>로딩</h2>
//       </SectionTitle>
//       <Loading />

//       <SectionTitle>
//         <h2>체크박스</h2>
//       </SectionTitle>
//       <Checkbox
//       />
//       <Checkbox
//         disabled
//       />
//       <Checkbox
//         checked
//       />
//       <Checkbox
//         disabled
//         checked
//       />
//     </div>
//   )
// }

// export default StyleGuidePage
