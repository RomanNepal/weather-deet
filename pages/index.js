import Head from "next/head";

import "../next.config";
import { Inter, Quicksand } from "@next/font/google";
import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputRightAddon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import Weathercard from "../components/weather.card";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
const quicksand = Quicksand({ subsets: ["latin"], style: ["normal"] });

export default function Home(data) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    router.push(`/searchresult/${input}`);
  };
  return (
    <div>
      <Head>
        <title>Weather Deet</title>
        <meta
          name="description"
          content="World Weather - Current and Forcast"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/roundlogo.png" />
      </Head>

      <Box
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        // bgImage={"/weather.jpg"}
        bgPos={"center"}
        bgRepeat={"no-repeat"}
        bgSize={"cover"}
      >
        <Box fontFamily={"Inter"} width={{ base: "90%", md: "50%" }}>
          {/* <Image src={"/fulllogo.png"} height={"100"} width={"100"}></Image> */}
          <br></br>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            {/* <Image src={"/fulllogo.png"} height={"100"} width={"100"}></Image> */}
            <Text
              fontFamily={"Poppins"}
              fontSize={{ base: "3xl", md: "7xl" }}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              World Weather
            </Text>
          </Box>
          <Text
            fontFamily={"Inter"}
            fontSize={{ base: "lg", md: "lg" }}
            textAlign={"center"}
          >
            Get current weather info, predictions and lot more info
          </Text>

          <br></br>
          <br></br>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                type={"search"}
                isRequired
                width={"100%"}
                // border={"2px"}
                borderRadius={"full"}
                fontWeight={"normal"}
                onChange={handleChange}
                placeholder={"Search City For Current Weather"}
                bgColor={"white"}
              ></Input>
              <InputRightAddon
                as={Button}
                onClick={handleSubmit}
                bgColor={"blue.700"}
                borderRadius={"full"}
              >
                {loading ? (
                  <Spinner color="white"></Spinner>
                ) : (
                  <BiSearchAlt color="white" />
                )}
              </InputRightAddon>
            </InputGroup>
          </form>
          {/* {loading ? (
            <Center>
              {" "}
              <Spinner></Spinner>
            </Center>
          ) : (
            ""
          )} */}
        </Box>
        <br></br>
        <br></br>
        <Box>
          {/* <Text
            fontFamily={"Poppins"}
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            World Weather
          </Text> */}
          <br></br>
          <Box
            display={"flex"}
            gap={"10"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            padding={{ base: "5", md: "0" }}
            mb={"10"}
          >
            {/* weather box1 */}
            <Weathercard
              country={data.data1.location.country}
              cityName={data.data1.location.name}
              imageSource={`http://${data?.data1?.current?.condition?.icon}`}
              time={data.data1.location.localtime.substring(11)}
              degreesC={data.data1.current.temp_c}
              degreesF={data.data1.current.temp_f}
              wind={data.data1.current.wind_mph}
              humidity={data.data1.current.humidity}
            />
            <Weathercard
              country={data.data2.location.country}
              cityName={data.data2.location.name}
              imageSource={`http://${data?.data2?.current?.condition?.icon}`}
              time={data.data2.location.localtime.substring(11)}
              degreesC={data.data2.current.temp_c}
              degreesF={data.data2.current.temp_f}
              wind={data.data2.current.wind_mph}
              humidity={data.data2.current.humidity}
            />
            <Weathercard
              country={data.data3.location.country}
              cityName={data.data3.location.name}
              imageSource={`http://${data?.data3?.current?.condition?.icon}`}
              time={data.data3.location.localtime.substring(11)}
              degreesC={data.data3.current.temp_c}
              degreesF={data.data3.current.temp_f}
              wind={data.data3.current.wind_mph}
              humidity={data.data3.current.humidity}
            />
            <Weathercard
              country={data.data4.location.country}
              cityName={data.data4.location.name}
              imageSource={`http://${data?.data4?.current?.condition?.icon}`}
              time={data.data4.location.localtime.substring(11)}
              degreesC={data.data4.current.temp_c}
              degreesF={data.data4.current.temp_f}
              wind={data.data4.current.wind_mph}
              humidity={data.data4.current.humidity}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export async function getStaticProps(context) {
  let response1 = await axios.get(
    // `${urls.base_url}/${urls.current_weather}?key=a3996048254b4c36af2154129230801&q=Paris`
    `https://api.weatherapi.com/v1/current.json?key=a3996048254b4c36af2154129230801&q=Kathmandu`
  );

  let response2 = await axios.get(
    // `${urls.base_url}/${urls.current_weather}?key=a3996048254b4c36af2154129230801&q=Paris`
    `https://api.weatherapi.com/v1/current.json?key=a3996048254b4c36af2154129230801&q=London`
  );

  let response3 = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=a3996048254b4c36af2154129230801&q=New York`
  );

  let response4 = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=a3996048254b4c36af2154129230801&q=New Delhi`
  );

  let data1 = response1.data;
  let data2 = response2.data;
  let data3 = response3.data;
  let data4 = response4.data;
  return {
    props: { data1, data2, data3, data4 },
  };
}
