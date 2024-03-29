import React, { useState } from "react";
import { Box, Button, Stack, Input } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import QRCode from "qrcode.react";

function CardMain({ url, shortUrl, count, onDelete }) {
  const [clicked, setClicked] = useState(false);
  const handleShortUrlClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/update/${shortUrl}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ surl: shortUrl }), // ส่ง shortUrl ไปใน body ของ request
        }
      );
      if (response.ok) {
        console.log("เพิ่มค่า count สำเร็จ");
        // ลบค่า clicked ที่ตั้งไว้ก่อนหน้านี้
        setClicked(false);
        // ตั้งค่า clicked เมื่อคลิก
        setClicked(true);
        // เปิดหน้าต่างใหม่
        window.open(`${url}`, "_blank");
      } else {
        throw new Error("ไม่สามารถเพิ่มค่า count ได้");
      }
    } catch (error) {
      console.error("มีข้อผิดพลาดในการเพิ่มค่า count:", error);
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
        defaultValue={`https://www.shortUrl.com/${shortUrl}`}
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
