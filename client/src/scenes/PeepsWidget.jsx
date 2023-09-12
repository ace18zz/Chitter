import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPeeps } from "state";
import PeepWidget from "./PeepWidget";

const PeepsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const peeps = useSelector((state) => state.peeps);
  const token = useSelector((state) => state.token);

  const getPeeps = async () => {
    const response = await fetch("http://localhost:3001/peeps", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    let data = await response.json();
    data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    dispatch(setPeeps({ peeps: data }));
  };

  const getUserPeeps = async () => {
    const response = await fetch(
      `http://localhost:3001/peeps/${userId}/peeps`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    let data = await response.json();
    data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    dispatch(setPeeps({ peeps: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPeeps();
    } else {
      getPeeps();
    }
  }, []); 

  return (
    <>
      {peeps.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PeepWidget
            key={_id}
            peepId={_id}
            peepUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PeepsWidget;