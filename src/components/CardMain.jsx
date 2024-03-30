import React from "react";
import {
  Box,
  Button,
  Stack,
  Text,
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import QRCode from "qrcode.react";

function CardMain({ url, shortUrl, count, onDelete }) {
  const svaddr = "http://localhost:3000";

  const handleShortUrlClick = async () => {
    try {
      const response = await fetch(`${svaddr}/api/redirect/${shortUrl}`);
      if (response.ok) {
        window.open(url, "_blank");
      } else {
        console.error("Error redirecting:", response.statusText);
      }
    } catch (error) {
      console.error("Error redirecting:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="400px"
      borderWidth="2px"
      borderColor="gray.300"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      boxShadow="xl"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: "2xl" }}
      margin="0 8px 18px 0"
    >
      <Box
        width="250px"
        height="250px"
        mb="4"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <QRCode value={url} alt="QR Code" size="250" />
      </Box>
      <Stack spacing={4} alignItems="center">
        <InputGroup>
          <InputLeftAddon children="URL" />
          <Input type="text" value={url} isReadOnly placeholder="Enter URL" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Short URL" />
          <Input
            type="text"
            value={`${svaddr}/${shortUrl}`}
            isReadOnly
            placeholder="Enter Short URL"
          />
        </InputGroup>
      </Stack>
      <Stack
        direction="row"
        spacing={4}
        alignItems="center"
        mt="4"
        justifyContent="space-between"
      >
        <Button colorScheme="teal" variant="solid" cursor="default">
          {count}
        </Button>
        <Button
          rightIcon={<DeleteIcon />}
          colorScheme="red"
          variant="solid"
          onClick={onDelete}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
}

export default CardMain;
