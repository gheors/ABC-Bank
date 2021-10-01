import React, { useContext, useRef, useState } from "react";
import {
    Button, Flex, FormControl,
    Input, Text, Box, Image
} from "@chakra-ui/react";

export default function UploadImage({ setImage, image, editCandidate }) {

    const fileHandler = (e) => {
        setImage(e.target.files[0])
        console.log(e.target.files[0])

    }

    return (
        <Box mt={10}>
            <Image borderRadius='5px' src={image ? URL.createObjectURL(image) : null} alt={image ? image.name : null} mb={5} />
            {editCandidate && image === null && <Image borderRadius='5px' src={"data:image/png;base64," + editCandidate.image} alt={"error"} mb={5} mr={5} />}

            <Input type="file" onChange={fileHandler} pt={1} />
        </Box>
    )
}
