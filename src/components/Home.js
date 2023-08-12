import styled from "styled-components";
import React from "react";
import ImageSlider from "./ImageSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../Firebase";
import { selectUserName } from "../features/user/userSlice";
import { setMovies } from "../features/movies/movieSlice";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let originals = [];
  let newDisneys = [];
  let trendings = [];
  const fetchMovies = async () => {
    const querySnapshot = await getDocs(collection(db, "movies"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      // console.log(doc.data().recommend);
      // if (doc.data().type === "recommend") {
      //   console.log(doc);
      // }
      switch (doc.data().type) {
        case "recommend":
          recommends = [...recommends, { id: doc.id, ...doc.data() }];
          break;

        case "new":
          newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
          break;

        case "original":
          originals = [...originals, { id: doc.id, ...doc.data() }];
          break;

        case "trending":
          trendings = [...trendings, { id: doc.id, ...doc.data() }];
          break;
      }
    })
    dispatch(
      setMovies({
        recommend: recommends,
        original: originals,
        newDisney: newDisneys,
        trending: trendings,
      })
    );
  };
  useEffect(() => {
    fetchMovies();
  }, [userName]);

  return (
    <Container>
      <ImageSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/image/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
