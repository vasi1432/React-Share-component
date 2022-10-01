import { useEffect, useMemo, useState } from "react";
import { Container, Input, InputGroup } from "reactstrap";
import { InputGroupText } from "reactstrap";
import "../css/ShareButton.css";
import styled from "styled-components";
import SearchComp from "./SearchComp";
import "../css/radio.css";

const MainBox = styled.div`
  width: 512px;
  border: 1px solid silver;
  border-radius: 8px;
  box-shadow: 6px 9px 10px -11px;
  margin: 0px 10px;
`;
const Top = styled.div`
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  padding: 16px 12px 16px 20px;
  justify-content: space-between;
  align-items: center;
  // margin: 5px 12px;
`;
const Contain = styled.div`
  padding: 16px 12px;
  justify-content: space-between;
  align-items: center;
`;
const ContainBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;
const DefaultAccess = styled.div`
  display: flex;
  gap: 165px;
  justify-content: space-between;
  align-items: center;
`;
const Bottom = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 6px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  border-radius: 0px 0px 8px 8px;
  padding: 10px;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: red;
`;
const FlexSpaceAround = styled.div`
  display: flex;
  justify-content: space-between;
  aligh-items: center;
  padding: 2px 12px;
`;
const Select = styled.select`
  color: #6b7280;
  outline: none;
  font-size: 12px;
  border: none;
  height: 25px;
  line-height: 16px;
`;
const Flex = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

const P = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #6b7280;
  margin: 0px;
`;
const ShareButtonWrapper = styled.div`
  background-color: black;
  border-radius: 4px;
  margin: 10px;
  display: flex;
  align-items: center;
  width: 80px;
  justify-content: center;
`;
const GroupIconWrapper = styled.div`
  background-color: #6b7280;
  color: white;
  border-radius: 4px;
  padding: 0px 4px;
`;
const SelectedCardWrapper = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;
const CopyLink = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ShareButton = ({ data, selected, onSelect, onRemove }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const unselectedData = useMemo(() => {
    const results = data.reduce((acc, current) => {
      const { id, type } = current;

      const hasPresentInSelected = selected.some((item) => item.id === id);

      if (hasPresentInSelected) {
        return acc;
      }
      if (!acc.hasOwnProperty(type)) {
        acc[type] = [current];
      } else {
        acc[type].push(current);
      }
      return acc;
    }, {});

    return results;
  }, [selected, data]);

  const handleShowPopUp = () => {
    if (showPopUp === false) {
      setShowPopUp(true);
      setShowSearchBox(false);
    } else {
      setShowPopUp(false);
    }
  };
  const handleShowSearchBox = () => {
    setShowPopUp(false);
    setShowSearchBox(true);
  };

  const handleRemoveSelectedData = (e, item) => {
    const { value } = e.target;
    if (value !== "Remove") {
      return;
    }
    onRemove(item);
  };
  return (
    <>
      <ShareButtonWrapper>
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "4px",
            border: "none",
          }}
          onClick={handleShowPopUp}
        >
          Share
        </button>
        <img src="src\images\Vectorshare.png" alt="" />
      </ShareButtonWrapper>

      {showPopUp ? (
        <MainBox>
          <Top className="part-1">
            <Flex className="part1-left">
              <span>
                <img src="src\images\Iconglobe.png" alt="" />
              </span>
              <div style={{ marginTop: "12px" }}>
                <h6>Share to web</h6>
                <P>Publish and share link with anyone</P>
              </div>
            </Flex>
            <div className="part1-right">
              <input type="checkbox" name="radio" className="cm-toggle" />
            </div>
          </Top>

          <Contain className="part2">
            <InputGroup className="part2-top">
              <Input
                placeholder="People, emails, groups"
                onClick={handleShowSearchBox}
              />
              <InputGroupText color={"#F9FAFB"}>Invite</InputGroupText>
            </InputGroup>
            <ContainBottom>
              <DefaultAccess>
                <Flex style={{ marginTop: "12px" }}>
                  <span>
                    <img
                      src="src\images\Oslash.png"
                      alt=""
                      style={{ width: "35px" }}
                    />
                  </span>
                  <div>
                    <h6>Everyone at OSlash</h6>
                    <P>25 workspace members</P>
                  </div>
                </Flex>

                <Select>
                  <option>Full access</option>
                  <option>Can edit</option>
                  <option>Can view</option>
                  <option style={{ color: "red" }}>No access</option>
                </Select>
              </DefaultAccess>

              {selected.map((item) => {
                return (
                  <FlexSpaceAround style={{ margin: "8px" }} key={item.id}>
                    <SelectedCardWrapper>
                      <div style={{ marginTop: "5px" }}>
                        {item.img ? (
                          <img src={item.img} alt="" />
                        ) : (
                          <GroupIconWrapper>
                            {item.name.charAt(0).toUpperCase()}
                          </GroupIconWrapper>
                        )}
                      </div>
                      <div>
                        <h6 style={{ margin: "0px" }}>{item.name}</h6>
                        <P>{item.email}</P>
                      </div>
                    </SelectedCardWrapper>
                    <div>
                      <select
                        onClick={(e) => {
                          handleRemoveSelectedData(e, item);
                        }}
                        style={{
                          fontSize: "12px",
                          border: "none",
                          height: "25px",
                        }}
                      >
                        <option>{item.access}</option>
                        <option>Can edit</option>
                        <option>Can view</option>
                        <option style={{ color: "red" }}>No access</option>
                        <option style={{ color: "red" }}>Remove</option>
                      </select>
                    </div>
                  </FlexSpaceAround>
                );
              })}
            </ContainBottom>
          </Contain>

          <Bottom>
            <Flex>
              <P
                style={{
                  border: "3px solid silver",
                  padding: "0px 6px",
                  borderRadius: "50%",
                }}
              >
                ?
              </P>
              <P>learn about sharing</P>
            </Flex>
            <CopyLink>
              <img src="src\images\link.png" alt="" />
              <P style={{ color: "black", fontWeight: "500" }}>Copy link</P>
            </CopyLink>
          </Bottom>
        </MainBox>
      ) : (
        <div></div>
      )}

      {showSearchBox ? (
        <SearchComp
          setShowPopUp={setShowPopUp}
          setShowSearchBox={setShowSearchBox}
          onSaveData={onSelect}
          data={unselectedData}
        ></SearchComp>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default ShareButton;
