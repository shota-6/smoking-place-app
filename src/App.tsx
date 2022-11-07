import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { Home } from "./components/Home";

import ReactGA from "react-ga4";
import { useEffect } from "react";

export const App = () => {

  useEffect(() => {
    ReactGA.initialize("G-78ENXXDB7V");
    ReactGA.send("pageview");
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  );
};
