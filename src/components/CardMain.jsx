import React from "react";
import {
  Box,
  Button,
  Stack,
  Text,
  InputGroup,
  InputLeftAddon,
  Input,
  InputLeftElement,
  Flex,
  Center,
} from "@chakra-ui/react";
import { DeleteIcon, CopyIcon } from "@chakra-ui/icons";
import QRCode from "qrcode.react";

function CardMain({ url, shortUrl, count, onDelete }) {
  const svaddr = "https://surl-qr-back-2.onrender.com";
  // const svaddr = "http://localhost:3000";

  const handleShortUrlClick = async () => {
    try {
      const response = await fetch(`${svaddr}/${shortUrl}`);
      window.open(url, "_blank");
      if (response.ok) {
        const data = await response.json();
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
        <QRCode value={`${svaddr}/${shortUrl}`} alt="QR Code" size="250" />
      </Box>
      <Stack spacing={4} alignItems="center">
        <InputGroup>
          <InputLeftAddon children="URL" />
          <Input type="text" value={url} isReadOnly />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="sURL" />
          <Input
            type="text"
            value={`${svaddr}/${shortUrl}`}
            onClick={handleShortUrlClick}
            isReadOnly
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
        <Center w="40px" h="40px" bg="tomato" color="white">
          <Box as="span" fontWeight="bold" fontSize="lg">
            {count}
          </Box>
        </Center>
        <Button
          leftIcon={<CopyIcon />}
          colorScheme="blue"
          variant="solid"
          onClick={() => {
            navigator.clipboard.writeText(`${svaddr}/${shortUrl}`);
          }}
        >
          Copy
        </Button>
        <Button
          leftIcon={<DeleteIcon />}
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
