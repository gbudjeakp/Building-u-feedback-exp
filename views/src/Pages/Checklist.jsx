import React, { useEffect, useState } from "react";
import {
  Table,
  Container,
  ScrollArea,
  Center,
  TableTr,
  TableTd,
  TableTh,
} from "@mantine/core";
import axios from "axios";
import Loader from "../components/Loader";
import { IconCheck, IconX } from "@tabler/icons-react";

const Checklist = () => {
  // States
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [topics, setTopics] = useState([]);
  const [groupedData, setGroupedData] = useState({});

  // Fetching and parsing data on page load
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/users/exerciseInfo",
        {
          withCredentials: true,
        }
      );
      // Store the fetched data
      const fetchedData = response.data.data;

      // Set the data state
      setData(fetchedData);

      // Create a unique list of topics
      const uniqueTopics = [...new Set(fetchedData.map((item) => item.topic))];
      setTopics(uniqueTopics);

      // Parse the data to create user-specific associations
      const grouped = fetchedData.reduce((acc, item) => {
        const { userId, internName, topic, isSubmitted, isCompleted } = item;
        if (!acc[userId]) {
          acc[userId] = { internName, topics: {} };
        }
        acc[userId].topics[topic] = { isSubmitted, isCompleted };
        return acc;
      }, {});

      setGroupedData(grouped);

      // Set loading state to false after data is fetched and processed
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //calls function on page load
    getData();
  }, []);
  //table styling
  const stylingTable = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };
  const ChecklistTable = () => (
    //creates scrollarea to deal with overflow
    <ScrollArea w="75vw" h="80vh">
      <Table
        withColumnBorders
        withRowBorders
        striped
        withTableBorder
        highlightOnHover
        stickyHeader
        style={{ textAlign: "center" }}
      >
        <Table.Thead>
          <TableTr>
            <TableTh rowSpan={2}>Intern Name</TableTh>
            {topics.map((topic) => (
              <TableTh key={topic} colSpan={2} style={{ textAlign: "center" }}>
                {topic}
              </TableTh>
            ))}
          </TableTr>
          <TableTr>
            {topics.map((topic) => (
              <React.Fragment key={topic}>
                <TableTh key={`${topic}-Submitted`}>Submitted</TableTh>
                <TableTh key={`${topic}-Completed`}>Completed</TableTh>
              </React.Fragment>
            ))}
          </TableTr>
        </Table.Thead>
        <Table.Tbody>
          {Object.values(groupedData).map((user, idx) => (
            <TableTr key={`user-${idx}`}>
              <TableTd>{user.internName}</TableTd>
              {topics.map((topic) => {
                const topicStatus = user.topics[topic] || {
                  isSubmitted: false,
                  isCompleted: false,
                };
                return (
                  <React.Fragment key={`topic-${topic}`}>
                    <TableTd>
                      {topicStatus.isSubmitted ? (
                        <IconCheck color="green" />
                      ) : (
                        <IconX color="#bb0c0c" />
                      )}
                    </TableTd>
                    <TableTd>
                      {topicStatus.isCompleted ? (
                        <IconCheck color="green" />
                      ) : (
                        <IconX color="#bb0c0c" />
                      )}
                    </TableTd>
                  </React.Fragment>
                );
              })}
            </TableTr>
          ))}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
  return (
    <Container style={stylingTable}>
      {isLoading ? <Loader /> : <ChecklistTable />}
    </Container>
  );
};

export default Checklist;
