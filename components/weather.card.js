import { Box, Text } from "@chakra-ui/react";

import Image from "next/image";
import React from "react";
import { BiWind } from "react-icons/bi";
import { GiDroplets, GiThermometerScale } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";

const Weathercard = (datas) => {
  return (
    <Box
      width={{ base: "100%", md: "600px" }}
      p={{ base: "5", md: "10" }}
      borderRadius={"2xl"}
      bgImage={"/gradient1.png"}
      bgSize={"cover"}
      bgPos={"center"}
      bgRepeat={"no-repeat"}
      display={"flex"}
      justifyContent={"space-around"}
      textColor={"gray.700"}
      // gap={"5"}
      alignItems={"center"}
      boxShadow={"rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"}
  
    >
      <Box>
        <Text
          fontSize={"sm"}
          // fontWeight={"semibold"}
          fontFamily={"Inter"}
          textAlign={"left"}
        >
          {datas.country}
        </Text>
        <Text
          fontSize={{ base: "md", md: "150%" }}
          fontWeight={"semibold"}
          fontFamily={"Poppins"}
          textAlign={"left"}
        >
          {datas.cityName}
        </Text>

        <Image
          src={datas.imageSource}
          height={"60"}
          width={"60"}
          alt="imagesource"
          unoptimized={"true"}
        ></Image>
      </Box>

      <Box>
        <Box>
          <Box display={"flex"} alignItems={"center"}>
            <IoMdTime size={"30"} />
            <Text fontSize={"sm"} fontWeight={"semibold"} fontFamily={"Inter"}>
              {datas.time}
            </Text>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <GiThermometerScale size={"30"} />
            <Text fontSize={"sm"} fontWeight={"semibold"} fontFamily={"Inter"}>
              {datas?.degreesC}
              <sup>o</sup>C/{datas.degreesF}
              <sup>o</sup>F
            </Text>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <BiWind size={"30"} />
            <Text fontSize={"sm"} fontWeight={"semibold"} fontFamily={"Inter"}>
              {datas.wind}m/h
            </Text>
          </Box>

          <Box display={"flex"} alignItems={"center"}>
            <GiDroplets size={"30"} />
            <Text fontSize={"sm"} fontWeight={"semibold"} fontFamily={"Inter"}>
              {datas.humidity} humidity
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Weathercard;
