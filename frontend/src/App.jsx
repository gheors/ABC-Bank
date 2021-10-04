import { Box, Flex, ChakraProvider } from "@chakra-ui/react"
import React, { useEffect, useState, useContext } from 'react';
import { getCandidates } from './API'
import AddCandidate from "./components/AddCandidate";
import CandidatesList from "./components/CandidatesList";
import Search from "./components/Search";
import { Context } from "./Context";
import './global.css'

function App() {

  const [candidates, setCandidates] = useState([]);
  const [editCandidate, setEditCandidate] = useState(undefined)
  const [booleanSearchName, setBooleanSearchName] = useState(false)
  const [booleanSearchRange, setBooleanSearchRange] = useState(false)

  const [originCandidates, setOriginCandidates] = useState([])

  useEffect(() => {
    getCandidates().then(res => {
      setCandidates(res.data)
      setOriginCandidates(res.data)
    })
  }, [])
  return (
    <Context.Provider
      value={{
        candidates,
        setCandidates,
        editCandidate,
        setEditCandidate,
        booleanSearchName,
        setBooleanSearchName,
        booleanSearchRange,
        setBooleanSearchRange
      }}
    >
      <ChakraProvider>
        <Flex position='absolute' left={0} top={0} right={0} bottom={0} flexDir='column'>
          <Box m={"auto"} fontSize='30px' pt={5} pb={10}> Bank ABC candidates manager</Box>
          <Flex>
            <AddCandidate />
            <Flex flexDir='column' flexGrow={1}>
              <Search originCandidates={originCandidates} />
              <CandidatesList />
            </Flex>
          </Flex>
        </Flex>
      </ChakraProvider >
    </Context.Provider>
  );
}

export default App;
