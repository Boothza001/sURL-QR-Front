import React, { useState, useEffect } from "react";
import { Input, Button, VStack, Text, HStack, Flex } from "@chakra-ui/react";
import CardMain from "./CardMain";

export default function InputURL() {
  const svaddr =
    "https://s-url-qr-front-6y076vngp-boothza001s-projects.vercel.app";

  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [inputFilled, setInputFilled] = useState(false);
  const urlRegex = /^https:\/\//i;

  useEffect(() => {
    fetchData();
  });

  useEffect(() => {
    setIsValidUrl(text.trim() === "" || urlRegex.test(text.trim()));
    setInputFilled(text.trim() !== "");
  }, [text]);

  const handleChange = (e) => setText(e.target.value);

  const onSubmitGen = async () => {
    if (isValidUrl && inputFilled) {
      try {
        const response = await fetch(text);
        if (response.ok) {
          const qrResponse = await fetch(`${svaddr}/api/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: text }),
          });
          fetchData();
          setText("");
        } else {
          setText("");
          alert("URL นี้ไม่มีอยู่จริงครับ เพราะ Fetch แล้วไม่เจอ !!!");
        }
      } catch (error) {
        setText("");
        alert("URL นี้ไม่มีอยู่จริงครับ เพราะ Fetch แล้วไม่เจอ !!!");
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${svaddr}/api/show`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
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
          onClick={onSubmitGen}
          name="url"
          isDisabled={!isValidUrl || !inputFilled}
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
