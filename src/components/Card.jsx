import { Box, Button, Stack, Input, Image } from "@chakra-ui/react";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";

function CardMain({ url, shortUrl, qrUrl, count, onDelete }) {
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
        <Image
          src={shortUrl}
          alt="QR Code"
          width="100px"
          height="100px"
          objectFit="contain"
        />
      </Box>
      <Input defaultValue={url} isReadOnly cursor="default" mb="2" />
      <Input defaultValue={shortUrl} cursor="pointer" />

      <Stack direction="row" spacing={4} alignItems="center" mt="4">
        <Button colorScheme="teal" variant="solid" cursor="default">
          {count}
        </Button>
        <Button leftIcon={<CopyIcon />} colorScheme="pink" variant="outline">
          Ctrl+C
        </Button>
        <Button
          ml="auto"
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
