import { useState } from "react";
import ShareButton from "./components/shareButton";
const initialState = [
  {
    id: 0,
    name: "Wade Cooper",
    email: "wade122.ooper@gmail.com",
    img: "src/images/wade.png",
    access: "No access",
    type: "person",
  },
  {
    id: 1,
    name: "Arlene Mccoy",
    email: "arlene12mccoy@gmail.com",
    img: "src/images/arlene.png",
    access: "No access",
    type: "person",
  },
  {
    id: 2,
    name: "Tom cook",
    email: "tom@oslash.com",
    img: "src/images/wade.png",
    access: "No access",
    type: "person",
  },
  {
    id: 3,
    name: "Product",
    type: "group",
    access: "No access",
  },
  {
    id: 4,
    name: "Engineering",
    type: "group",
    access: "No access",
  },
];

const App = () => {
  const [usersList, setUsersList] = useState(initialState);
  const [selectedData, setSelectedData] = useState(
    JSON.parse(localStorage.getItem("SelectedData")) || []
  );

  const onSelected = (items) => {
    const updatedItems = [...selectedData, ...items];
    setSelectedData(updatedItems);
    localStorage.setItem("SelectedData", JSON.stringify(updatedItems));
  };

  const onRemove = (item) => {
    const updatedItems = selectedData.filter((elem) => elem.id !== item.id);
    setSelectedData(updatedItems);
    localStorage.setItem("SelectedData", JSON.stringify(updatedItems));
  };

  return (
    <>
      <ShareButton
        data={initialState}
        selected={selectedData}
        onSelect={onSelected}
        onRemove={onRemove}
      ></ShareButton>
    </>
  );
};
export default App;
