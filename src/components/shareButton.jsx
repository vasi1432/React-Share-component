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
  position: absolute;
  top: 25%;
  left: 30%;
  border-radius: 8px;
  box-shadow: 6px 9px 18px -11px;
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
const Flex = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;
const P = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: "#6b7280";
  margin: 0px;
`;
const ShareButtonWrapper = styled.div`
  background-color: black;
  width: 5%;
  border-radius: 4px;
  position: absolute;
  top: 20%;
  left: 30%;
`;

const ShareButton = ({ data, selected, onSelect, onRemove }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  // const [selectedData, setSelectedData] = useState([]);

  const unselectedData = useMemo(() => {
    console.log({ data, selected });

    const results = data.reduce((acc, current) => {
      const { id, type } = current;

      const hasPresentInSelected = selected.some((item) => item.id === id);
      console.log({ hasPresentInSelected });
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
    console.log({ results });
    return results;
  }, [selected, data]);

  console.log({ unselectedData });
  // const handleAddNewItems = (items) => {
  //   console.log({ selectedData, items });
  //   const updatedItems = [...selectedData, ...items];
  //   console.log({ updatedItems });
  //   setSelectedData(updatedItems);
  //   localStorage.setItem("SelectedData", JSON.stringify(updatedItems));
  // };

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

    // let access = e.target.value;
    // if (access === "Remove") {
    //   const filteredData = selectedData.filter((elem) => {
    //     return item.id !== elem.id;
    //   });
    //   setSelectedData(filteredData);
    //   const localTask = JSON.parse(localStorage.getItem("SelectedData"));
    //   const filteredLocalTask = localTask.filter((elem) => {
    //     return item.id !== elem.id;
    //   });
    //   console.log("filteredLocalTask", filteredLocalTask);
    //   localStorage.setItem("SelectedData", JSON.stringify(filteredLocalTask));
    // }
  };
  return (
    <>
      <ShareButtonWrapper>
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "4px",
          }}
          onClick={handleShowPopUp}
        >
          Share
        </button>
        <img src="src\images\Vectorshare.png" alt="" />
      </ShareButtonWrapper>

      {showPopUp ? (
        <MainBox>
          <FlexSpaceAround className="part1">
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
          </FlexSpaceAround>

          <Container className="part2">
            <InputGroup className="part2-top">
              <Input
                placeholder="People, emails, groups"
                onClick={handleShowSearchBox}
              />
              <InputGroupText>Invite</InputGroupText>
            </InputGroup>
            <FlexSpaceAround
              style={{ flexDirection: "column" }}
              className=" part2-bottom"
            >
              <FlexSpaceAround>
                <Flex>
                  <span
                    style={{
                      background: "#111827",
                      borderRadius: "4px",
                      height: "35px",
                    }}
                  >
                    <img
                      src="src\images\Oslash.png"
                      alt=""
                      style={{ width: "35px" }}
                    />
                  </span>
                  <div style={{ marginTop: "10px" }}>
                    <h6>Everyone at OSlash</h6>
                    <P>25 workspace members</P>
                  </div>
                </Flex>
                <select
                  style={{
                    fontSize: "12px",
                    border: "none",
                    height: "25px",
                    marginTop: "10px",
                  }}
                >
                  <option>Full access</option>
                  <option>Can edit</option>
                  <option>Can view</option>
                  <option style={{ color: "red" }}>No access</option>
                </select>
              </FlexSpaceAround>
              {selected.map((item) => {
                return (
                  <FlexSpaceAround style={{ margin: "8px" }} key={item.id}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div style={{ marginTop: "5px" }}>
                        <img src={item.img} alt="" />
                      </div>
                      <div>
                        <h6 style={{ margin: "0px" }}>{item.name}</h6>
                        <P>{item.email}</P>
                      </div>
                    </div>
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
            </FlexSpaceAround>
          </Container>

          <FlexSpaceAround
            className="part3"
            style={{
              fontSize: "6px",
              backgroundColor: " #f9fafb",
              borderTop: "1px solid #e5e7eb",
              borderRadius: " 0px 0px 8px 8px",
              padding: "10px",
            }}
          >
            <Flex>
              <P>?</P>
              <P>learn about sharing</P>
            </Flex>
            <P>Copy link</P>
          </FlexSpaceAround>
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
