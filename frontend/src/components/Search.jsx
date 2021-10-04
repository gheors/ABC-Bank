import { Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from 'react';
import { getByNameOrLastName, getByRange } from "../API";
import { Context } from "../Context";

export default function Search({ originCandidates, }) {
    const { setCandidates, setBooleanSearchRange, setBooleanSearchName } = useContext(Context)


    const [current, setCurrent] = useState('');

    const [minRange, setMinRange] = useState('');
    const [maxRange, setMaxRange] = useState('');

    const toast = useToast();

    useEffect(() => {
        searchByRange()
        if (minRange !== '' || maxRange !== '') {

            setBooleanSearchRange(true)
            setBooleanSearchName(false)
        }
    }, [minRange, maxRange])

    useEffect(() => {
        if (current !== '') {
            setBooleanSearchRange(false)
            setBooleanSearchName(true)
        }
    }, [current])

    function searchByQueryName(currentSearch) {
        if (currentSearch === '') {
            setCandidates(originCandidates)
        } else getByNameOrLastName(currentSearch).then(res => setCandidates(res.data))
    }


    function searchByRange() {
        if (minRange !== '' && maxRange !== '' && minRange > 0 && maxRange > 0 && maxRange > minRange) {
            getByRange(minRange, maxRange).then(res => setCandidates(res.data))
        }
        if (minRange !== '' && maxRange !== '' && (minRange < 0 || maxRange < 0)) {
            toast({
                title: 'Negative Age',
                description: 'Age can\'t be negative',
                status: "error",
                position: "top-right",
                duration: 1800,
                isClosable: true,
            });
        }
        if (minRange !== '' && maxRange !== '' && minRange > maxRange && minRange.toString().length <= maxRange.toString().length) {
            toast({
                title: 'Min bigger that Max',
                description: 'The minimum age can\'t be bigger than the maximum age',
                status: "error",
                position: "top-right",
                duration: 1800,
                isClosable: true,
            });
            console.log(maxRange)
        }
    }

    function reset() {
        setCurrent('')
        setMinRange('')
        setMaxRange('')
        setBooleanSearchRange(false)
        setBooleanSearchName(false)
        setCandidates(originCandidates)
    }

    return (
        <Flex flexGrow={1} flexDir='column' ml={5}>
            <Box fontSize='20px' mb={5}>
                Search candidate
            </Box>
            <Flex flexGrow={1} alignItems='center'>
                <Box flexGrow={1} mr={20}>
                    <Box>Search by name</Box>
                    <Input
                        id={"currentSearch"}
                        type={"text"}
                        variant="flushed"
                        placeholder={"First name or/and last name"}
                        fontSize={"16px"}
                        value={current}
                        mb={5}
                        onChange={(event) => {
                            setCurrent(event.target.value)
                            searchByQueryName(event.target.value)
                        }}
                    />
                </Box>


                <Box flexGrow={1} mr={20}>
                    <Box> Age range search</Box>
                    <Flex >
                        <Input
                            id={"currentSearch"}
                            type={"number"}
                            variant="flushed"
                            placeholder={"Minimum Age"}
                            fontSize={"16px"}
                            value={minRange}
                            mr={10}
                            mb={5}
                            onChange={(event) => {
                                setMinRange(event.target.value)
                            }}
                        />
                        <Input
                            id={"currentSearch"}
                            type={"number"}
                            variant="flushed"
                            placeholder={"Maximum Age"}
                            fontSize={"16px"}
                            value={maxRange}
                            mb={5}
                            onChange={(event) => {
                                setMaxRange(event.target.value)

                            }}
                        />
                    </Flex>
                </Box>
                <Button mr={10} onClick={() => reset()}>
                    Reset
                </Button>
            </Flex>


        </Flex >
    )
}
