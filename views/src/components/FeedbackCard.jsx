import React, { useEffect, useState } from "react";
import { Text, Button, Paper, Container, Stack } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import formatCreatedAt from "../Utility/DateFormatter";
import checkTimeLapse from "../Utility/DateCompare";
import { useDispatch } from "react-redux";
import {
  assignFeedbackRequest,
  markComplete,
} from "../features/Feedbacks/feedbackSlice";

const feedbackContainer = {
  zIndex: "1",
  marginLeft: "90px",
};

function FeedbackCard({
  showAddFeedback,
  showComplete,
  isAssign,
  pageTitle,
  showViewFeedback,
  data,
  isMentor,
  gotoDashboard,
  isLoading,
}) {
  const [assignedRequests, setAssignedRequests] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState({});
  const [items, setItems] = useState(data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleComplete = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    const filteredItems = updatedItems.filter((item) => !item.completed);

    setItems(filteredItems);
    dispatch(markComplete(id));
  };

  const assignRequest = (id) => {
    const request = items.find((item) => item.id === id);
    if (request) {
      setAssignedRequests([...assignedRequests, request]);
      dispatch(assignFeedbackRequest(id));
    }
  };

  const handleGoToDashboard = () => {
    const isMentor = true;
    if (isMentor) {
      navigate("/mentor/feedbackqueue");
    } else {
      navigate("/intern/myrequests");
    }
  };

  const handleNotifyMentor = (itemId, index) => {
    if (!notificationStatus[itemId]) {
      setNotificationStatus((prevStatus) => ({
        ...prevStatus,
        [itemId]: true,
      }));
    }
    // this would be the dispatch data
    let placeholderData = {
      topicOfLearningSession: items[index].topicOfLearningSession,
      codeLink: items[index].codeLink
    }
  };

  return (
    <Container fluid h={0} style={feedbackContainer}>
      <Text align="center" size="xl" style={{ marginBottom: "20px" }}>
        {pageTitle}
      </Text>
      {isLoading ? (
        <div>Loading...</div>
      ) : items && items.length > 0 ? (
        <Stack gap={10}>
          {items.map((item, index) => (
            <Paper
              shadow="xs"
              p="sm"
              withBorder
              key={item.id + index}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                {isMentor ? (
                  <Text>Intern Name: {item.studentName}</Text>
                ) : (
                  <Text>Reviewer Name: {item.whoisAssigned}</Text>
                )}
                <Text>
                  Topic Of Learning Session: {item.topicOfLearningSession}
                </Text>
                <Text>Completed: {item.status ? "Yes" : "No"}</Text>
                <Text>
                  Link to exercise: <a href={item.codeLink}>{item.codeLink}</a>
                </Text>
                <Text>{formatCreatedAt(item.createdAt)}</Text>
                {item.whoisAssigned ? (
                  <Text>Assigned to: {item.whoisAssigned}</Text>
                ) : null}
              </div>
              <Stack
                direction="horizontal"
                spacing="sm"
                style={{ justifyContent: "space-between", width: "160px" }}
              >
                {showAddFeedback && (
                  <Link to={`/feedback/${item.id}`}>
                    <Button
                      style={{ color: "black", width: "100%" }}
                      color="#F9EB02"
                    >
                      Add Feedback
                    </Button>
                  </Link>
                )}
                {showViewFeedback && (
                  <Link to={`/feedback/${item.id}`}>
                    <Button style={{ color: "black", width: "100%" }} color="#F9EB02">
                      View Feedback
                    </Button>
                  </Link>
                )}
                {/* notification button location.pathname for testing*/}
                {location.pathname === "/intern/myrequests" &&
                  checkTimeLapse(item.createdAt) && (
                    <Button
                      onClick={() => handleNotifyMentor(item.id, index)}
                      disabled={notificationStatus[item.id]}
                      leftSection={<IconBell size={14} />}
                      style={{ color: "black" }}
                      color="#F9EB02"
                    >
                      {notificationStatus[item.id]
                        ? "Mentor Notified"
                        : "Notify Mentor"}
                    </Button>
                  )}
                {showComplete && !item.completed && (
                  <Button
                    style={{ color: "black" }}
                    color="#F9EB02"
                    onClick={() => toggleComplete(item.id)}
                  >
                    Complete
                  </Button>
                )}
                {gotoDashboard && (
                  <Button
                    style={{ color: "black" }}
                    color="#F9EB02"
                    onClick={handleGoToDashboard}
                  >
                    Go to Dashboard
                  </Button>
                )}
                {isAssign && (
                  <Button
                    style={{ color: "black" }}
                    color="#F9EB02"
                    onClick={() => assignRequest(item.id)}
                  >
                    Assign
                  </Button>
                )}
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : (
        <div>No items to display.</div>
      )}
    </Container>
  );
}

export default FeedbackCard;
