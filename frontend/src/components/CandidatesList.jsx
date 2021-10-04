import React, { useContext } from 'react'
import Candidate from './Candidate'
import { Box, Flex } from "@chakra-ui/react"
import { Context } from '../Context'

export default function CandidatesList({ }) {
    const { candidates, setCandidates, setEditCandidate, booleanSearchName, booleanSearchRange } = useContext(Context)
    return (
        <Box ml={5}>
            {booleanSearchName && <Box fontSize='20px' mb={5}>
                Candidates list from name search
            </Box>}
            {booleanSearchRange && <Box fontSize='20px' mb={5}>
                Candidates list from range search
            </Box>}

            {!booleanSearchName && !booleanSearchRange && <Box fontSize='20px' mb={5}>
                Candidates list
            </Box>}

            <Flex flexGrow='1' flexWrap={'wrap'} justifyContent='flex-start' overflowY='auto' h={'70vh'} position='relative'>
                {candidates.map(el => {
                    return <Candidate key={`Candidate-${Math.random()}`} candidate={el} setEditCandidate={setEditCandidate} />
                })}
                {candidates.length === 0 && <Box fontSize='40px' top={'50%'} left='50%' position='absolute' transform='translate(-50%,-50%)'>
                    No candidates yet.
                </Box>
                }
            </Flex>
        </Box >

    )
}
