import {
  ChakraProvider
} from "@chakra-ui/react"
import theme from "./theme/theme"
import { Home } from "./components/Home"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Home/>
  </ChakraProvider>
)
