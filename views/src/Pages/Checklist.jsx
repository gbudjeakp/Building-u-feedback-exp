import React, { useEffect, useState } from "react";
import {
  Table,
  Container,
  ScrollArea,
  Center,
  TableTr,
  TableTd,
} from "@mantine/core";
import axios from "axios";
import Loader from "../components/Loader";

// const getData = async () => {
//   const response = await axios.get(
//     "http://localhost:5001/api/users/exerciseInfo",
//     {
//       withCredentials: true,
//     }
//   );
//   return response;
// };
const Checklist = () => {
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/users/exerciseInfo",
          {
            withCredentials: true,
          }
        );
        console.log(response.data.data);
        setData(response.data.data);
        setTimeout(() => {
          setisLoading(false);
        }, 100000);
      } catch {
        (error) => {
          setisLoading(false);
          console.log(error);
        };
      }
    };
    const getUsers = async () => {
      try {
        const responseUsers = await axios.get(
          "http://localhost:5001/api/users/users",
          {
            withCredentials: true,
          }
        );
        console.log(responseUsers);
        setUsers(responseUsers);
      } catch {
        (error) => {
          console.log(error);
        };
      }
    };
    getData();
    getUsers();
  }, []);
  const dataUnpackager = (data) => {
    for (element in data) {
    }
  };

  const stylingTable = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };
  const ChecklistTable = () => {
    <ScrollArea w="75vw" h="80vh">
      <Table></Table>
    </ScrollArea>;
  };
  return (
    <Container style={stylingTable}>
      {isLoading ? <Loader /> : <ChecklistTable />}
    </Container>
  );
};

export default Checklist;
