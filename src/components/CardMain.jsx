import React, { useState } from "react";
import { Box, Button, Stack, Input } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import QRCode from "qrcode.react";

function CardMain({ url, shortUrl, count, onDelete }) {
  const svaddr = "https://surl-qr-back-2.onrender.com";
  const [clicked, setClicked] = useState(false);
  const handleShortUrlClick = async () => {
    try {
      const response = await fetch(`${svaddr}/api/redirect/${shortUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("add count succ");
        setClicked(false);
        setClicked(true);
        // ไม่ต้องเปิด URL ปลายทาง โดยตรงแล้ว เนื่องจาก endpoint ใหม่จะทำการ redirect ไปยัง URL ปลายทางแล้ว
      } else {
        throw new Error("err count");
      }
    } catch (error) {
      console.error("err count:", error);
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
      <Input defaultValue={url} isReadOnly cursor="default" mb="2" />
      <Input
        defaultValue={`${svaddr}/${shortUrl}`}
        cursor="pointer"
        onClick={handleShortUrlClick}
      />

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
