import React, { useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";

import styled from "styled-components";
import Project from "../components/Project";
const Projects = () => {
  const [index, setIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(44)).current;
  const thirdScale = useRef(new Animated.Value(0.8)).current;
  const thirdTranslateY = useRef(new Animated.Value(-50)).current;

  const nextIndex = (index) => {
    if (index >= projects.length - 1) {
      return 0;
    } else {
      return index + 1;
    }
  };
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: false,
        }).start();

        Animated.spring(thirdScale, {
          toValue: 0.9,
          useNativeDriver: false,
        }).start();
        Animated.spring(thirdTranslateY, {
          toValue: 44,
          useNativeDriver: false,
        }).start();
      },

      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        const positionY = pan.y;
        console.log(positionY > 200);
        if (positionY._value > 200) {
          Animated.timing(pan, {
            toValue: { x: 0, y: 1000 },
            useNativeDriver: false,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            scale.setValue(0.9);
            translateY.setValue(44);
            thirdScale.setValue(0.8);
            thirdTranslateY.setValue(-50);
            setIndex((index) => nextIndex(index));
          });
        } else {
          Animated.spring(pan, {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: false,
          }).start();

          // second card
          Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: false,
          }).start();
          Animated.spring(translateY, {
            toValue: 44,
            useNativeDriver: false,
          }).start();

          // Third Card
          Animated.spring(thirdScale, {
            toValue: 0.8,
            useNativeDriver: false,
          }).start();
          Animated.spring(thirdTranslateY, {
            toValue: -50,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;
  return (
    <Container style={{ marginTop: 30 }}>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Project
          title={projects[index].title}
          author={projects[index].author}
          image={projects[index].image}
          text={projects[index].text}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: scale }, { translateY: translateY }],
        }}
      >
        <Project
          title={projects[nextIndex(index)].title}
          author={projects[nextIndex(index)].author}
          image={projects[nextIndex(index)].image}
          text={projects[nextIndex(index)].text}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -3,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ scale: thirdScale }, { translateY: thirdTranslateY }],
        }}
      >
        <Project
          title={projects[nextIndex(index + 1)].title}
          author={projects[nextIndex(index + 1)].author}
          image={projects[nextIndex(index + 1)].image}
          text={projects[nextIndex(index + 1)].text}
        />
      </Animated.View>
    </Container>
  );
};
export default Projects;

const projects = [
  {
    title: "Price Tag",
    image: require("../assets/background5.jpg"),
    author: "Liu Yi",
    text:
      "Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China.",
  },
  {
    title: "The DM App - Ananoumous Chat",
    image: require("../assets/background6.jpg"),
    author: "Chad Goodman",
    text:
      "Design+Code was the first resource I used when breaking into software. I went from knowing nothing about design or code to building a production ready app from scratch. ",
  },
  {
    title: "Nikhiljay",
    image: require("../assets/background7.jpg"),
    author: "Nikhil D'Souza",
    text:
      "Recently finished the React course by @Mengto, and I 10/10 would recommend. I already rewrote my personal website in @reactjs and I'm very excited with it.",
  },
];
const Container = styled.View`
  flex: 1;
  background: #f0f3f5;
  justify-content: center;
  align-items: center;
`;