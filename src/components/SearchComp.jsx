import { useState } from "react";
import { Container, Input, InputGroup } from "reactstrap";
import { Button, InputGroupText } from "reactstrap";
import "../css/ShareButton.css";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

const MainBox = styled.div`
  height: 366px;
  width: 512px;
  border: 1px solid silver;
  position: absolute;
  top: 25%;
  left: 30%;
  border-radius: 8px;
  box-shadow: 6px 9px 18px -11px;
`;
const Top = styled.div`
  height: 58px;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 8px 8px 0px 0px;
  position: relative;
`;
const Bottom = styled.div`
  height: 36px;
  background-color: #f3f4f6;
  border-top: 1px solid #e5e7eb;
  border-radius:0px 0px 8px 8px;
  display: flex;
  padding: 8px 12px;
}
`;
const Contain = styled.div`
  height: 272px;
  padding: 16px;
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
  justify-content: space-around;
  padding: 12px 16px;
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
  margin: 12px;
  display: flex;
  gap: 5px;
`;
const Absolute = styled.div`
  position: absolute;
  display: flex;
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

const SearchComp = (props) => {
  const [userData, setUserData] = useState({
    person: [
      {
        id: 0,
        name: "Wade Cooper",
        email: "wade122.ooper@gmail.com",
        img: "src/images/wade.png",
        access: "No access",
      },
      {
        id: 1,
        name: "Arlene Mccoy",
        email: "arlene12mccoy@gmail.com",
        img: "src/images/arlene.png",
        access: "No access",
      },
      {
        id: 2,
        name: "Tom cook",
        email: "tom@oslash.com",
        img: "src/images/wade.png",
        access: "No access",
      },
    ],

    group: [
      {
        id: 0,
        name: "Product",
        img: "P",
      },
      {
        id: 1,
        name: "Engineering",
        img: "E",
      },
    ],
  });

  const copyData = {
    person: [
      {
        id: 0,
        name: "Wade Cooper",
        email: "wade122.ooper@gmail.com",
        img: "src/images/wade.png",
        access: "No access",
      },
      {
        id: 1,
        name: "Arlene Mccoy",
        email: "arlene12mccoy@gmail.com",
        img: "src/images/arlene.png",
        access: "No access",
      },
      {
        id: 2,
        name: "Tom cook",
        email: "tom@oslash.com",
        img: "src/images/wade.png",
        access: "No access",
      },
    ],

    group: [
      {
        id: 0,
        name: "Product",
        img: "P",
      },
      {
        id: 1,
        name: "Engineering",
        img: "E",
      },
    ],
  };

  const [selectedData, setSelecteddata] = useState([]);

  const handleSearch = (e) => {
    const filteredPerson = copyData.person.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUserData({ ...userData, person: filteredPerson });

    // const filteredGroup = copyData.group.filter((item) =>
    //   item.name.toLowerCase().includes(e.target.value.toLowerCase())
    // );
    // setUserData({ ...userData, group: filteredGroup });
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
    props.setSelectedData(selectedData);
    props.setShowPopUp(true);
    props.setShowSearchBox(false);

    localStorage.setItem("SelectedData", JSON.stringify(selectedData));
  };

  return (
    <>
      <MainBox>
        <Top>
          <FlexCenter>
            <Absolute>
              {selectedData.map((elem) => {
                return (
                  <>
                    <div
                      style={{
                        backgroundColor: " #e5e7eb",
                        borderRadius: "4px",
                        padding: "8px 5px",
                        fontSize: "14px",
                        display: "flex",
                        gap: "6px",
                      }}
                    >
                      {elem.name}
                      <span
                        onClick={() => {
                          handleSelectedDataDelete(elem.id);
                        }}
                      >
                        <img src="src\images\cross.png" alt="" />
                      </span>
                    </div>
                  </>
                );
              })}
            </Absolute>

            <input
              type="text"
              placeholder="Search emails, names or groups"
              onChange={(e) => {
                handleSearch(e);
              }}
              style={{
                width: "80%",
                backgroundColor: "#F3F4F6",
                border: "none",
              }}
            />
            <div style={{ display: "flex" }}>
              <select
                onChange={(e) => {
                  handleInviteData(e);
                }}
                style={{
                  fontSize: "12px",
                  border: "none",
                  backgroundColor: "#f3f4f6",
                }}
              >
                <option>Full access</option>
                <option>Can edit</option>
                <option>Can view</option>
                <option style={{ color: "red" }}>No access</option>
              </select>

              <button
                onClick={handleInviteSent}
                style={{
                  backgroundColor: "white",
                  border: "none",
                  padding: "5px 8px",
                }}
              >
                Invite
              </button>
            </div>
          </FlexCenter>
        </Top>
        <Contain>
          <Heading>Select a person</Heading>
          {userData.person.map((item) => {
            return (
              <>
                <Person
                  onClick={() => {
                    handleSelectedData(item);
                  }}
                  key={item.id}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <img src={item.img} alt="" />
                    <div>{item.name}</div>
                  </div>
                </Person>
              </>
            );
          })}
          <Heading>Select a group</Heading>
          {userData.group.map((item) => {
            return (
              <>
                <Group
                  onClick={() => {
                    handleSelectedData(item);
                  }}
                  key={item.id}
                >
                  <GroupIconWrapper>{item.img}</GroupIconWrapper>
                  <div>{item.name}</div>
                </Group>
              </>
            );
          })}
        </Contain>
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
