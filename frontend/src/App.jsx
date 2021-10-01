import { Box, Flex, ChakraProvider } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react';
import { getCandidates } from './API'
import AddCandidate from "./components/AddCandidate";
import CandidatesList from "./components/CandidatesList";
import Search from "./components/Search";
import './global.css'

function App() {

  const [candidates, setCandidates] = useState([])
  const [originCandidates, setOriginCandidates] = useState([])

  const [editCandidate, setEditCandidate] = useState(undefined)
  const [booleanSearchName, setBooleanSearchName] = useState(false)
  const [booleanSearchRange, setBooleanSearchRange] = useState(false)


  useEffect(() => {
    getCandidates().then(res => {
      setCandidates(res.data)
      setOriginCandidates(res.data)
    })
  }, [])
  return (
    <ChakraProvider>

      <Flex position='absolute' left={0} top={0} right={0} bottom={0} flexDir='column'>
        <Box m={"auto"} fontSize='30px' pt={5} pb={10}> Bank ABC candidates manager</Box>
        <Flex>
          <AddCandidate candidates={candidates} setCandidates={setCandidates} editCandidate={editCandidate} setEditCandidate={setEditCandidate} />
          <Flex flexDir='column' flexGrow={1}>
            <Search setCandidates={setCandidates} originCandidates={originCandidates} setBooleanSearchName={setBooleanSearchName} setBooleanSearchRange={setBooleanSearchRange} />
            <CandidatesList booleanSearchName={booleanSearchName} booleanSearchRange={booleanSearchRange} candidates={candidates} setCandidates={setCandidates} setEditCandidate={setEditCandidate} />
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider >

  );
}

export default App;
