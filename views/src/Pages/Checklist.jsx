import React, { useEffect, useState } from "react";
import {
  Table,
  Container,
  ScrollArea,
  Center,
  TableTr,
  TableTd,
} from "@mantine/core";
import { IconLoader } from "@tabler/icons-react";
import axios from "axios";

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
        setisLoading(false);
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
  const LoadingScreen = () => {
    return (
      <div>
        <IconLoader
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "120px",
            height: "120px",
            margin: "-60px 0 0 -60px",
            animation: "spin 4s linear infinite",
          }}
        />
      </div>
    );
  };
  const ChecklistTable = () => {
    <ScrollArea w="75vw" h="80vh">
      <Table></Table>
    </ScrollArea>;
  };
  return (
    <Container style={stylingTable}>
      {isLoading ? <LoadingScreen /> : <ChecklistTable />}
    </Container>
  );
};

export default Checklist;
