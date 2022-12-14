import { useState } from "react";
import {
  VStack,
  FormControl,
  FormErrorMessage,
  Box,
  Center,
  Input,
} from "@chakra-ui/react";
import { Word, BlankWord } from "./words";
const axios = require("axios");

type input = {
  target: {
    value: string;
  };
};

type error = any;

export function CustomWordle() {
  //creates custom wordle board
  const [input, setInput] = useState<string>("");
  const [validWord, setValidWord] = useState<string>("");
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  const handleInputChange = (e: input) => {
    //handles forum change
    setInput(e.target.value);
  };

  const makeCustomRequest = (word: string) => {
    axios("http://localhost:8000/guess/?word=" + word.toLowerCase())
      .then(function (response: any) {
        setCustomWords(response.data.guesses);
        setValidWord(word);
        setIsError(false);
        console.log(customWords);
      })
      .catch(function (error: error) {
        setIsError(true);
      });
  };

  const generateColors = (guess: string, target: string): string[] => {
    //generates color pattern depending on the guess and target words
    const colors: string[] = ["grey", "grey", "grey", "grey", "grey"];
    target = target.toLowerCase();

    for (let i = 0; i < 5; i++) {
      if (guess[i] == target[i]) {
        colors[i] = "green";
        let temp = target.slice(0, i);
        temp += " ";
        temp += target.slice(i + 1, target.length);
        target = temp;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (target.indexOf(guess[i]) != -1 && colors[i] != "green") {
        colors[i] = "yellow";
        target = target.replace(guess[i], " ");
      }
    }

    return colors;
  };

  const wordleBoard: JSX.Element[] = [];
  for (let i = 0; i < customWords.length; i++) {
    wordleBoard.push(
      <Word
        word={customWords[i]}
        colors={generateColors(customWords[i], validWord)}
        key={i.toString()}
      />
    );
  }

  for (let i = customWords.length; i < 6; i++) {
    wordleBoard.push(<BlankWord key={i.toString()} />);
  }

  return (
    <>
      <FormControl
        isInvalid={isError}
        onSubmit={(e) => {
          e.preventDefault();
          makeCustomRequest(input);
        }}
        pb={4}
      >
        <form>
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            w="100%"
            maxW="sm"
            placeholder="Input 5 Letter Word"
            textTransform="lowercase"
          />
        </form>
        <Box w="100%" maxW="sm">
          <FormErrorMessage>invalid input</FormErrorMessage>
        </Box>
      </FormControl>
      <Center>
        <VStack>{wordleBoard}</VStack>
      </Center>
    </>
  );
}
