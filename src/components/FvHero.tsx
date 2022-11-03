import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import { FC } from "react";

type onClickProps = {
  FindStore: () => void;
  isLoading: boolean;
};

export const FvHero: FC<onClickProps> = (props) => {
  const { FindStore, isLoading } = props;

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
              現在地から、近くの喫煙可能店を見つけましょう。
              「現在地から検索する」から喫煙可能店を探せます。
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
                isLoading={isLoading}
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
    </Box>
  );
};
