import React, { useState, useEffect } from "react";
import { Input, Button, VStack, Text, HStack, Flex } from "@chakra-ui/react";
import axios from "axios";
import CardMain from "./CardMain";

export default function InputURL() {
  const svaddr = "https://surl-qr-back-2.onrender.com";
  // const svaddr = "http://localhost:3000";

  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  });

  const handleChange = (e) => setText(e.target.value);

  const onSubmitGenerateQRCode = async () => {
    try {
      const response = await axios.get(text, { crossOrigin: true });
      if (response.status === 200) {
        const qrResponse = await axios.post(`${svaddr}/api/create`, {
          url: text,
        });
        fetchData();
        setText("");
      } else {
        alert("URL does not exist!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${svaddr}/api/show`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${svaddr}/api/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="3xl" as="b">
        Storten URL
      </Text>
      <Flex flexDir={{ base: "column", md: "row" }} minW="600px" align="center">
        <Input
          flex="1"
          placeholder="url : "
          size={["lg", "lg"]}
          onChange={handleChange}
        />
        <Button
          colorScheme="teal"
          variant="outline"
          size="lg"
          ml={{ base: "0", md: "4" }}
          mt={{ base: "4", md: "0" }}
          onClick={onSubmitGenerateQRCode}
          name="url"
        >
          Button
        </Button>
      </Flex>

      <VStack spacing={4} align="stretch" w="100%" mt={8} justify="center">
        <HStack spacing={4} align="start" justify="center" w="100%" wrap="wrap">
          {data
            .slice()
            .reverse()
            .map((item) => (
              <CardMain
                key={item._id}
                url={item.url}
                shortUrl={item.surl}
                qrUrl={item.qrurl}
                count={item.count}
                onDelete={() => handleDelete(item._id)}
              />
            ))}
        </HStack>
      </VStack>
    </VStack>
  );
}
