import "./App.css";
import InputURL from "./components/InputURL";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <>
      <ChakraProvider>
        <InputURL />
      </ChakraProvider>
    </>
  );
}

export default App;
