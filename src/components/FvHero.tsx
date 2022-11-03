import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import { useScroll } from "../hooks/useScroll";

export default function FvHero() {
  const [apiData, setApiData] = useState<string[]>([]);
  const [getData, setGetData] = useState<boolean>(false);

  const [ref, moveTo] = useScroll();

  const FindStore = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setApiData(res.data);
        setGetData(true);
        moveTo();
      })
      .catch((err) => {
        console.log(err);
      });

      setTimeout(() => {
        moveTo();
      }, 500);
  };

  return (
    <Box>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex
          p={8}
          flex={1}
          align={"center"}
          justify={"center"}
          backgroundImage={{
            base: `url(${process.env.PUBLIC_URL}/fv.jpg)`,
            md: "",
          }}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        >
          <Stack spacing={6} w={"full"} maxW={"lg"} zIndex={2}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                color={{ base: "white", md: "inherit" }}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                喫煙可能店
              </Text>
              <br />{" "}
              <Text color={"red.400"} as={"span"}>
                を見つける
              </Text>{" "}
            </Heading>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color={{ base: "white", md: "gray.800" }}
            >
              現在の位置情報から、近くの喫煙可能店を見つけます。
              「現在地から検索する」から喫煙可能店を探しましょう。
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                rounded={"full"}
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.300",
                }}
                onClick={FindStore}
              >
                現在地から検索する
              </Button>
            </Stack>
          </Stack>

          <Box
            backgroundColor={"rgba(0, 0, 0, 0.5)"}
            backgroundSize="cover"
            w="full"
            height="100vh"
            pos="absolute"
            zIndex={0}
            display={{ base: "inherit", md: "none" }}
          ></Box>
        </Flex>
        <Flex flex={1} display={{ base: "none", md: "inherit" }}>
          <Image
            alt={"fv Image"}
            objectFit={"cover"}
            src={`${process.env.PUBLIC_URL}/fv.jpg`}
          />
        </Flex>
      </Stack>

      {getData ? (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={{ base: 6, md: 9 }}
          px={{ base: 4, md: 8 }}
          py={{ base: 20, md: 20 }}
          ref={ref}
        >
          <GridItem colSpan={2} textAlign="center" mb={5}>
            <Heading fontSize={{ base: "2xl", md: "3xl" }}>検索結果</Heading>
          </GridItem>
          {apiData.map((data) => (
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <Box w={"full"} bg="white" boxShadow={"2xl"} rounded={"md"} p={6}>
                <Stack>
                  <Heading
                    fontSize={{ base: "md", md: "lg", lg: "xl" }}
                    fontFamily={"body"}
                    mb={4}
                  >
                    店名
                  </Heading>
                  <Text>住所</Text>
                  <Text>電話番号</Text>
                </Stack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      ) : null }
    </Box>
  );
}
