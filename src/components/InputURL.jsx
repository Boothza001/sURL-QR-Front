import React, { useState, useEffect } from "react";
import { Input, Button, VStack, Text, HStack, Flex } from "@chakra-ui/react";
import CardMain from "./CardMain";

function InputURL() {
  // const svaddr = "https://surl-qr-back-2.onrender.com";
  const svaddr = "http://localhost:3000";

  const [text, setText] = useState("");
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${svaddr}/api/show`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const onSubmitGen = async () => {
    try {
      const response = await fetch(`${svaddr}/api/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: text }),
      });
      if (response.ok) {
        fetchData();
      } else {
        console.error("Failed to create short URL");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${svaddr}/api/delete/${id}`, {
        method: "DELETE",
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="3xl" fontWeight="bold">
        Storten URL
      </Text>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        minW="600px"
        align="center"
        value={text}
        onChange={handleChange}
      >
        <Input
          flex="1"
          placeholder="Enter URL"
          size={["lg", "lg"]}
          onChange={handleChange}
        />
        <Button
          colorScheme="teal"
          variant="outline"
          size="lg"
          ml={{ base: "0", md: "4" }}
          mt={{ base: "4", md: "0" }}
          onClick={onSubmitGen}
        >
          Generate
        </Button>
      </Flex>
      <HStack spacing={4} align="start" justify="center" w="100%" wrap="wrap">
        {data.map((item) => (
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
  );
}

export default InputURL;
