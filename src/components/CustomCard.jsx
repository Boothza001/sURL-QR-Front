import React from "react";
import { Box, Button, Text, Flex, Image } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function CustomCard({ url, shortUrl, qrUrl, count, onDelete }) {
  console.log("QR URL:", qrUrl); // Log qrUrl ที่รับเข้ามา
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      maxW="full"
      w="full"
      boxShadow="lg"
      transition="opacity 0.3s"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" w="15%">
          <Box mr="2">
            <Image src={qrUrl} alt="QR Code" boxSize="50px" />
          </Box>
          <Box>
            <Text>{url}</Text>
          </Box>
        </Flex>
        <Text w="35%">{shortUrl}</Text>
        <Text w="25%">{count}</Text>
        <Flex w="25%" justifyContent="flex-end">
          <Button onClick={onDelete} colorScheme="red" mr="2">
            Delete <DeleteIcon />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CustomCard;
