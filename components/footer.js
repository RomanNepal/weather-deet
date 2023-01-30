import { Box, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsFacebook, BsGithub, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <Box
        display={"flex"}
        pt={"2"}
        pb={"2"}
        pr={"5"}
        alignItems={"center"}
        justifyContent={{ base: "center", md: "end" }}
        gap={"5"}
        background={"linear-gradient(to right, #eecda3, #ef629f)"}
        textColor={"white"}
        fontFamily={"Inter"}
      >
        <Link href={"https://www.facebook.com/roman.nepal.1"}>
          <BsFacebook />
        </Link>
        <Link href={"https://www.instagram.com/roman.nepal.1"}>
          <BsInstagram />
        </Link>
        <Link href={"https://github.com/RomanNepal"}>
          <BsGithub />
        </Link>
      </Box>
    </>
  );
};

export default Footer;
