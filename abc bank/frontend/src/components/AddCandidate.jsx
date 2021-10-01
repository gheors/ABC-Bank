import {
    Button, Flex, FormControl,
    Input, Text, Box, useToast
} from "@chakra-ui/react";
import React, { useState, useEffect, } from 'react';
import { IoMdRemoveCircle } from 'react-icons/io';
import { createCandidate, updateCandidate } from "../API";
import UploadImage from "./UploadImage";


export default function AddCandidate({ candidates, setCandidates, editCandidate, setEditCandidate }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [phoneNumbers, setPhoneNumbers] = useState([]);

    const [image, setImage] = useState(null);
    const toast = useToast();

    useEffect(() => {
        if (editCandidate) {
            setFirstName(editCandidate.firstName)
            setLastName(editCandidate.lastName)
            setAddress(editCandidate.address)
            setBirthDate(editCandidate.birthDate)
            setPhoneNumbers([...editCandidate.phoneNumbers])
        }
    }, [editCandidate])


    function modifyCandidate() {
        if (firstName !== '' && lastName !== '' && address !== '' && birthDate !== '' && phoneNumbers[0] !== '') {
            const candidate = {
                firstName,
                lastName,
                address,
                birthDate,
                phoneNumbers,
                id: editCandidate.id
            }
            updateCandidate(editCandidate.id, candidate).then(toast({
                title: 'Candidate created',
                description: 'Candidate Addeded succesfully!',
                status: "success",
                position: "top-right",
                duration: 1800,
                isClosable: true,
            }),

                setCandidates(candidates.map(el => {
                    if (el.id === editCandidate.id)
                        return candidate
                    else return el
                })),

            )
            setFirstName('')
            setLastName('')
            setAddress('')
            setBirthDate('')
            setPhoneNumbers([])
            setEditCandidate(undefined)

        }
    }

    function addCandidate() {


        if (firstName !== '' && lastName !== '' && address !== '' && birthDate !== '' && phoneNumbers[0] !== '') {
            const candidate = {
                firstName,
                lastName,
                address,
                birthDate,
                phoneNumbers
            }
            const data = new FormData();
            if (image !== null) {
                data.set('file', image)
                data.set('candidate', JSON.stringify(candidate))
            }
            createCandidate(data).then(res => {
                setCandidates([...candidates, res.data])
                setFirstName('')
                setLastName('')
                setAddress('')
                setBirthDate('')
                setImage(null)
                setPhoneNumbers([])

                toast({
                    title: 'Candidate created',
                    description: 'Candidate Addeded succesfully!',
                    status: "success",
                    position: "top-right",
                    duration: 1800,
                    isClosable: true,
                })
            })

        } else {
            toast({
                title: 'Empty field',
                description: 'All fields must be filled',
                status: "error",
                position: "top-right",
                duration: 1800,
                isClosable: true,
            });
        }
    }

    return (
        <Flex flexDir={'column'} w={'350px'}>
            <Box pl={5} fontSize='20px'>
                Add Candidate
            </Box>
            <FormControl pl={5} pr={5}>
                <Input
                    id={"firstName"}
                    type={"text"}
                    variant="flushed"
                    placeholder={'First name'}
                    fontSize={"16px"}
                    value={firstName}
                    mr={10}
                    mb={5}
                    onChange={(event) => setFirstName(event.target.value)}
                />
                <Input
                    id={"lastName"}
                    type={"text"}
                    variant="flushed"
                    placeholder={'Last name'}

                    fontSize={"16px"}
                    value={lastName}
                    mr={10}
                    mb={5}
                    onChange={(event) => setLastName(event.target.value)}
                />
                <Input
                    id={"address"}
                    type={"text"}
                    variant="flushed"
                    placeholder={'Address'}

                    fontSize={"16px"}
                    value={address}
                    mr={10}
                    mb={5}
                    onChange={(event) => setAddress(event.target.value)}
                />

                <Input
                    id={"birthDate"}
                    type={"date"}
                    variant="flushed"
                    placeholder={'Date of birth'}
                    fontSize={"16px"}
                    value={birthDate}
                    mr={10}
                    mb={5}
                    color={"white"}
                    onChange={(event) => setBirthDate(event.target.value)}
                />
                {phoneNumbers.map((num, index) => {
                    return <Flex justifyContent='center' key={`${num + index}`}>
                        <Input
                            id={`phoneNumber${index + 1}`}
                            type={"number"}
                            variant="flushed"
                            placeholder={'Phone number'}
                            fontSize={"16px"}
                            defaultValue={phoneNumbers[index]}
                            mr={10}
                            mb={5}
                            onChange={(event) => { }}
                            onBlur={(event) => {
                                let arr = phoneNumbers
                                arr[index] = event.target.value
                                setPhoneNumbers([...arr])
                            }}

                        />
                        <Button fontSize="25px" p={0} onClick={
                            () => {
                                const arr = phoneNumbers
                                const el = arr.indexOf(index);
                                arr.splice(el, 1);
                                setPhoneNumbers([...arr])
                            }
                        }>
                            <IoMdRemoveCircle />
                        </Button>
                    </Flex>
                })}
                <Button onClick={
                    () => setPhoneNumbers([...phoneNumbers, ''])
                }>
                    Add phone number
                </Button>

                <UploadImage setImage={setImage} image={image} editCandidate={editCandidate} />

                {!editCandidate && <Button w={'100%'} mt={5} onClick={
                    () => addCandidate()
                }>
                    Confirm candidate registration
                </Button>}

                {editCandidate && <Button w={'100%'} mt={5} onClick={
                    () => modifyCandidate()
                }>
                    Update candidate credentials
                </Button>}

            </FormControl>
        </Flex>

    );
}

