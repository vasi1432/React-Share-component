import { useState } from "react";
import { Container, Input, InputGroup } from "reactstrap";
import { Button, InputGroupText } from "reactstrap";
import "../css/ShareButton.css";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

const MainBox = styled.div`
  width: 512px;
  border: 1px solid silver;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 6px 9px 18px -11px;
`;
const Top = styled.div`
  //   height: 58px;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 8px 8px 0px 0px;
  position: relative;
`;
const Bottom = styled.div`
//   height: 36px;
  background-color: #f3f4f6;
  border-top: 1px solid #e5e7eb;
  border-radius:0px 0px 8px 8px;
  display: flex;
  padding: 8px 12px;
}
`;
const Contain = styled.div`
  padding: 16px 28px;
`;
const P = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: grey;
  margin: 0px;
`;
const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
`;
const Heading = styled.div`
  font-weight: 400;
  font-size: 16px;
  height: 24px;
  line-height: 24px;
`;
const Person = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin: 12px;
`;
const Group = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin: 12px 0;
  display: flex;
  gap: 5px;
`;
const Absolute = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-radius: 4px;
  left: 10px;
  top: 14px;
`;
const GroupIconWrapper = styled.div`
  background-color: #6b7280;
  color: white;
  border-radius: 4px;
  padding: 0px 4px;
`;
const Name = styled.div`
  background-color: #e5e7eb;
  border-radius: 4px;
  padding: 8px 5px;
  font-size: 14px;
  display: flex;
  gap: 6px;
`;
const Data = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60%;
`;
const InviteButton = styled.div`
  background-color: #fff;
  padding: 3px 6px;
  border: 1px solid silver;
  border-radius: 6px;
  font-size: 13px;
`;
const SearchComp = (props) => {
  const [selectedData, setSelecteddata] = useState([]);

  const handleSearch = (e) => {
    const filteredPerson = copyData.person.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUserData({ ...userData, person: filteredPerson });
  };

  const handleSelectedData = (elem) => {
    for (let i = 0; i < selectedData.length; i++) {
      if (selectedData[i].id === elem.id) {
        return;
      }
    }
    setSelecteddata([...selectedData, elem]);
  };

  const handleSelectedDataDelete = (id) => {
    const filteredData = selectedData.filter((item) => {
      return item.id !== id;
    });
    setSelecteddata(filteredData);
  };

  const handleInviteData = (e) => {
    for (let i = 0; i < selectedData.length; i++) {
      selectedData[i].access = e.target.value;
    }
  };

  const handleInviteSent = () => {
    props.onSaveData(selectedData);
    props.setShowPopUp(true);
    props.setShowSearchBox(false);
  };

  const renderSearchList = () => {
    const types = Object.keys(props.data);
    const finalList = [];
    for (let i = 0; i < types.length; i++) {
      const element = types[i];

      const message = `Select a ${element}`;
      const elementList = props.data[element].map((item) => {
        return (
          <Group
            onClick={() => {
              handleSelectedData(item);
            }}
            key={item.id}
          >
            {item.img ? (
              <img src={item.img} alt="" />
            ) : (
              <GroupIconWrapper>
                {item.name.charAt(0).toUpperCase()}
              </GroupIconWrapper>
            )}
            <div>{item.name}</div>
          </Group>
        );
      });

      finalList.push(message);
      finalList.push(elementList);
    }

    return finalList;
  };

  return (
    <>
      <MainBox>
        <Top>
          <FlexCenter>
            <Data>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {selectedData.map((elem) => {
                  return (
                    <Name key={elem.id}>
                      {elem.name}
                      <span
                        onClick={() => {
                          handleSelectedDataDelete(elem.id);
                        }}
                      >
                        <img src="src\images\cross.png" alt="" />
                      </span>
                    </Name>
                  );
                })}
              </div>

              <input
                type="text"
                placeholder={
                  selectedData.length === 0
                    ? "Search emails, names or groups"
                    : ""
                }
                onChange={(e) => {
                  handleSearch(e);
                }}
                style={
                  selectedData.length === 0
                    ? {
                        width: "100%",
                        backgroundColor: "#F3F4F6",
                        border: "none",
                        outline: "none",
                      }
                    : {
                        width: "50%",
                        backgroundColor: "#F3F4F6",
                        border: "none",
                        outline: "none",
                      }
                }
              />
            </Data>

            <div style={{ display: "flex", gap: "16px" }}>
              <select
                onChange={(e) => {
                  handleInviteData(e);
                }}
                style={{
                  fontSize: "12px",
                  border: "none",
                  outline: "none",
                  backgroundColor: "#f3f4f6",
                  color: " #6B7280",
                }}
              >
                <option>Full access</option>
                <option>Can edit</option>
                <option>Can view</option>
                <option style={{ color: "red" }}>No access</option>
              </select>

              <InviteButton onClick={handleInviteSent}>Invite</InviteButton>
            </div>
          </FlexCenter>
        </Top>

        <Contain>{renderSearchList()}</Contain>
        <Bottom>
          <P>
            <span>?</span> learn about sharing
          </P>
        </Bottom>
      </MainBox>
    </>
  );
};
export default SearchComp;
