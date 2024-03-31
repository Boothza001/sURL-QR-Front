import React, { useState, useEffect } from "react";
import { Input, Button, VStack, Text, HStack, Flex } from "@chakra-ui/react";
import CardMain from "./CardMain";

function InputURL() {
  const svaddr = "https://surl-qr-back-2.onrender.com";

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
    const interval = setInterval(() => {
      fetchData();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const validateURL = (validURL) => {
    const regex = /^(https?|ftp):\/\/(-\.)?([^\s/?\.#-]+\.?)+([^\s]*)$/i;
    return regex.test(validURL);
  };

  const formatURL = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      if (url.startsWith("www.")) {
        return "https://" + url;
      } else {
        return false;
      }
    } else {
      return url;
    }
  };

  const onSubmitGen = async () => {
    const formattedURL = formatURL(text);
    if (formattedURL) {
      console.log("Formatted URL is:", formattedURL);
      const response = await fetch(`${svaddr}/api/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: formattedURL }),
      });
      fetchData();
    } else {
      console.log("Invalid URL:", text);
    }
  };

  const handleDelete = (id) => {
    fetch(`${svaddr}/api/delete/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  return (
    <VStack spacing={4} align="stretch" justifyContent="center">
      <Text fontSize="3xl" fontWeight="bold">
        Storten URL
      </Text>

      <Flex
        flexDir={{ base: "column", md: "row" }}
        minW="400px"
        align="center"
        justifyContent="center"
        value={text}
      >
        <Input
          flex="1"
          maxW="400px"
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
          isDisabled={!text.trim()}
        >
          Generate
        </Button>
      </Flex>

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
  );
}

export default InputURL;
