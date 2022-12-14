import { Flex, Text, HStack } from "@chakra-ui/react";
const axios = require("axios");

interface WordProps {
  word: string;
  colors: string[];
}

interface LetterProps {
  letter: string;
  color: string;
}

interface ColorCycleWordProps {
  word: string;
  colors: number[];
  onClick: (index: number) => void;
}

interface ColorCycleLetterProps {
  letter: string;
  color: string;
  index: number;
  onClick: (index: number) => void;
}

export function Word(props: WordProps) {
  //creates color coded word depending on props
  const mapping: { [key: string]: string } = {
    green: "#538d4e",
    yellow: "#b59f3b",
    grey: "#3a3a3d",
  };

  let word: JSX.Element[] = [];

  for (let i = 0; i < 5; i++) {
    word.push(
      <Letter letter={props.word[i]} color={mapping[props.colors[i]]} key={i} />
    );
  }

  return <HStack>{word}</HStack>;
}

export function Letter(props: LetterProps) {
  //creates letter
  return (
    <Flex
      w="60px"
      h="60px"
      bg={props.color}
      justify="center"
      align="center"
      userSelect="none"
    >
      <Text textTransform="uppercase" fontSize="4xl" as="b">
        {props.letter}
      </Text>
    </Flex>
  );
}

export function ColorCycleWord(props: ColorCycleWordProps) {
  //creates word that cycles colors when clicked
  const lookup: { [key: number]: string } = {
    0: "#121213",
    1: "#538d4e",
    2: "#b59f3b",
    3: "#3a3a3d",
  };

  let word: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    word.push(
      <ColorCycleLetter
        letter={props.word[i]}
        index={i}
        color={lookup[props.colors[i]]}
        onClick={(i: number) => props.onClick(i)}
        key={i.toString()}
      />
    );
  }

  return <HStack>{word}</HStack>;
}

function ColorCycleLetter(props: ColorCycleLetterProps) {
  //creates letter that cycles when clicked
  return (
    <Flex
      w="60px"
      h="60px"
      bg={props.color}
      justify="center"
      align="center"
      border={props.color == "#121213" ? "2px" : "0px"}
      borderColor="#3a3a3d"
      userSelect="none"
      onClick={() => props.onClick(props.index)}
    >
      <Text textTransform="uppercase" fontSize="4xl" as="b">
        {props.letter}
      </Text>
    </Flex>
  );
}

export function BlankWord() {
  //creates blank word
  let word: JSX.Element[] = [];
  for (let i = 0; i < 5; i++) {
    word.push(<BlankLetter key={i.toString()} />);
  }

  return <HStack>{word}</HStack>;
}

function BlankLetter() {
  //creates blank letter
  return (
    <Flex
      w="60px"
      h="60px"
      bg="#121213"
      border="2px"
      borderColor="#3a3a3d"
      justify="center"
      align="center"
    />
  );
}
