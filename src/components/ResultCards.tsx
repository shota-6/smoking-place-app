import { FC } from "react";

import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useScroll } from "../hooks/useScroll";

type resultProps = {
  getData: boolean;
  storeData: any[];
};

export const ResultCards: FC<resultProps> = (props) => {
  const { getData, storeData } = props;
  const [ref, moveTo] = useScroll();

  setTimeout(() => {
    moveTo();
  }, 500);

  const nonSmokeStore = storeData.filter((data) => {
    return data.non_smoking === "禁煙席なし";
  });

  if (getData) {
    return (
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={{ base: 12, md: 9 }}
        px={{ base: 4, md: 8 }}
        py={{ base: 20, md: 20 }}
        ref={ref}
      >
        <GridItem colSpan={2} textAlign="center" mb={5}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>検索結果</Heading>
        </GridItem>
        {nonSmokeStore.map((data) => (
          <GridItem colSpan={{ base: 2, md: 1 }} key={data.id}>
            <Box w={"full"} bg="white" boxShadow={"2xl"} rounded={"md"}>
              <Stack>
                <Image
                  src={data.photo.pc.l}
                  alt={data.name}
                  roundedTop="lg"
                  height="250px"
                  objectFit="cover"
                />
                <Box p={6}>
                  <Heading fontSize="xl" fontFamily={"body"} mb={4}>
                    {data.name}
                  </Heading>
                  <Stack spacing={5} mt={8}>
                    <Link
                      color="teal.500"
                      href={`https://www.google.co.jp/maps?q=${data.lat},${data.lng}`}
                      target="_blank"
                    >
                      <Text color="gray.800" display="inline-block">
                        住所:　
                      </Text>
                      {data.address}
                    </Link>
                    <Text>
                      喫煙席:　
                      <span style={{ fontWeight: "bold", color: "#E53E3E" }}>
                        {data.non_smoking}
                      </span>
                    </Text>
                    <Text>最寄駅:　{data.station_name}</Text>
                    <Text>駐車場:　{data.parking}</Text>
                  </Stack>

                  <Button
                    rounded={"full"}
                    bg={"red.400"}
                    color={"white"}
                    marginTop="1.5em!important"
                    as="a"
                    href={data.urls.pc}
                    target="_blank"
                    w={"full"}
                    _hover={{
                      bg: "red.300",
                    }}
                  >
                    詳細を見る
                  </Button>

                  <Button
                    rounded={"full"}
                    bg={"white"}
                    border="2px"
                    borderColor="red.400"
                    color={"red.400"}
                    marginTop="1.5em!important"
                    as="a"
                    href={`https://www.google.co.jp/maps?q=${data.lat},${data.lng}`}
                    target="_blank"
                    w={"full"}
                    _hover={{
                      bg: "red.400",
                      color: "white",
                    }}
                  >
                    Google Mapで開く
                  </Button>
                </Box>
              </Stack>
            </Box>
          </GridItem>
        ))}
      </Grid>
    );
  } else {
    return null;
  }
};
