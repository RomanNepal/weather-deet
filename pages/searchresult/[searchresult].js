import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Suspense, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import Loading from "../component/loading";
const TodayForcast = dynamic(() => import("../component/today.forcast"), {
  ssr: false,
});
const TomorrowForcast = dynamic(() => import("../component/tomorrow.forcast"), {
  ssr: false,
});
const Weathercard = dynamic(() => import("../component/weather.card"));

const SearchResult = (recieved) => {
  const router = useRouter();
  const [data, setData] = useState();
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(recieved.data);
    setLoading(false);
  }, [recieved.data]);
  const handleChange = (e) => {
    setFormData(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/searchresult/${formData}`);
  };

  return (
    <>
      <Head>
        <title>Weather Deets</title>
        <meta
          name="description"
          content="World Weather - Current and Forcast"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/roundlogo.png" />
      </Head>
      <Box
        padding={"10"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDir={"column"}
        gap={"10"}
        bgColor={"#EDF2F7"}
      >
        <Link href={"/"}>
          {" "}
          <Image
            unoptimized={"true"}
            src={"/fulllogo.png"}
            height={"100"}
            width={"100"}
          ></Image>
        </Link>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type={"search"}
              isRequired
              width={"lg"}
              // border={"2px"}
              borderRadius={"full"}
              fontWeight={"normal"}
              onChange={handleChange}
              placeholder={"Search City For Current Weather and Predictions"}
              bgColor={"white"}
            ></Input>

            <InputRightAddon
              as={Button}
              onClick={handleSubmit}
              bgColor={"blue.700"}
              borderRadius={"full"}
            >
              <BiSearchAlt color="white" />
            </InputRightAddon>
          </InputGroup>
        </form>
        <br></br>

        <Text fontFamily={"Inter"} fontWeight={"bold"}>
          Current Weather of {data?.location?.name}, {data?.location?.country}
        </Text>

        {data ? (
          <>
            <Suspense
              fallback={"LOADING THERE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"}
            >
              <Weathercard
                country={data.location.country}
                cityName={data.location.name}
                imageSource={`http://${data?.current?.condition?.icon}`}
                time={data.location.localtime.substring(11)}
                degreesC={data.current.temp_c}
                degreesF={data.current.temp_f}
                wind={data.current.wind_mph}
                humidity={data.current.humidity}
              />
            </Suspense>
            <Suspense
              fallback={"LOADING THERE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"}
            >
              <TodayForcast data={data} />
            </Suspense>

            <Suspense
              fallback={"LOADING THERE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"}
            >
              <TomorrowForcast data={data} />
            </Suspense>
          </>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default SearchResult;
// export async function getStaticProps(context) {
//   console.log(context.params);
//   return {
//     props: {},
//   };
// }

export async function getServerSideProps(context) {
  let data = {};
  try {
    let result = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=a3996048254b4c36af2154129230801&q=${context.query.searchresult}&days=2&aqi=yes&alerts=yes`
    );
    data = JSON.parse(JSON.stringify(result.data));
  } catch (err) {
    console.log(err);
  }
  return {
    props: { data },
  };
}
