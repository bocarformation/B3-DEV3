import { Container, Flex } from "@chakra-ui/react";
import type React from "react";
// import { Header } from "./header/Header";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
    return (
        <>
            {/* <Header /> */}
            <Flex minH={"100vh"} align={"center"} justify={"center"}>
                <Container maxW={"container.xl"}>
                    <Outlet />
                </Container>
            </Flex>
        </>
    )
};