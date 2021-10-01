import React from 'react'
import { Box, Flex, Image } from "@chakra-ui/react"
import { getCandidates } from '../API'
import { FaPen } from 'react-icons/fa';
import { IoMdRemoveCircle } from 'react-icons/io';
import { deleteCandidate } from "../API";

export default function Candidate({ candidate, candidates, setCandidates, setEditCandidate }) {
    console.log(candidate.image)


    return (
        <Flex flexDir='column'
            w='350px' p={4} m={2}
            boxShadow={`0 0 3px 0 #555`}
            h={'250px'}
            _hover={{ boxShadow: '0 1px 2px 2px lightblue' }}
            borderRadius='5px'
            transition='0.3s'
        >

            <Flex fontSize='20px' alignItems='center' mb={2} position='relative'>
                <Image borderRadius='50%' w={'100px'} h='90px' src={"data:image/png;base64," + candidate.image} alt={"error"} mb={5} mr={5} />
                <Box mr={1}>{candidate.firstName}</Box> <Box flexGrow='1'>{candidate.lastName}</Box>

                <Box fontSize='16px' mr={1}
                    color={'lightgreen'}
                    _hover={{ color: 'limegreen' }}
                    borderRadius={'3px'}
                    onClick={() => { setEditCandidate(candidate) }}
                    position='absolute'
                    right={8}
                    top={0}
                >
                    <FaPen />
                </Box>
                <Box color={'tomato'}
                    position='absolute'
                    right={0}
                    top={0}
                    _hover={{ color: 'red' }}
                    borderRadius={'50%'}
                    onClick={() => {
                        deleteCandidate(candidate.id).then(
                            setCandidates(candidates.filter(el => el.id != candidate.id))
                        )
                    }}>
                    <IoMdRemoveCircle />
                </Box>
            </Flex>

            <Flex mb={1}>
                <Box flexGrow='1'>Address:</Box> <Box>{candidate.address}</Box>
            </Flex>
            <Flex mb={1}>
                <Box flexGrow='1'> Date of birth:</Box> <Box>{candidate.birthDate.split('T')[0]}</Box>
            </Flex>
            <Flex mb={1}>
                <Box flexGrow='1'>Phone Numbers:</Box> <Box>{candidate.phoneNumbers.map(num => {
                    return <Box key={num}>
                        {num}
                    </Box>
                })}
                </Box>
            </Flex>
        </Flex >
    )
}
