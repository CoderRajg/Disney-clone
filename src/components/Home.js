import styled from "styled-components";
import React, { useEffect } from "react";
import ImageSlider from "./ImageSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useDispatch, useSelector } from "react-redux";
import db from "../Firebase";
import {
  selectUserEmail,
} from "../features/user/userSlice";
import { setMovies } from "../features/movies/movieSlice";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "movies"));
        let recommends = [];
        let originals = [];
        let newDisneys = [];
        let trendings = [];

        querySnapshot.forEach((doc) => {
          switch (doc.data().type) {
            case "recommend":
              recommends.push({ id: doc.id, ...doc.data() });
              break;

            case "new":
              newDisneys.push({ id: doc.id, ...doc.data() });
              break;

            case "original":
              originals.push({ id: doc.id, ...doc.data() });
              break;

            case "trending":
              trendings.push({ id: doc.id, ...doc.data() });
              break;
            default :
              break;
          }
        });

        dispatch(
          setMovies({
            recommend: recommends,
            original: originals,
            newDisney: newDisneys,
            trending: trendings,
          })
        );
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch, userEmail]);

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


