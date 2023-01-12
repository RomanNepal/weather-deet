import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import theme from "../components/theme";
import Footer from "../components/footer";
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      {" "}
      <Footer />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
