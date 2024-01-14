import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Text, Container, Paper, Stack, Button } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TextEditor from "../components/TextEditor";
import formatCreatedAt from "../Utility/DateFormatter";
import { addFeedback } from "../features/Feedbacks/feedbackSlice";

const feedbackContainer = {
  zIndex: "20",
  // paddingBottom: "20rem",
  marginBottom: "20px",
};

function SingleFeedbackPage(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const feedbackScrollRef = useRef(null);
  const [submittedContent, setSubmittedContent] = useState([]);

  // This function fetches the feedback, used once on load and on every "Submit Feedback"
  const fetchFeedbackData = async () => {
    try {
      // Make the API call using axios
      const response = await axios.get(
        `http://localhost:5001/api/feedback/getMentorFeedback/${id}`,
        {
          withCredentials: true,
        }
      );
      setSubmittedContent(response.data.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };
  // scroll to the bottom after new feedback has been added
  useEffect(() => {
    if (feedbackScrollRef.current) {
      feedbackScrollRef.current.scrollTop =
        feedbackScrollRef.current.scrollHeight;
    }
  }, [submittedContent]);

  // this function "lifts" information from the child element (text editor) and does a POST to /addFeedBack/:id
  const handleSubmittedContent = (newContent) => {
    dispatch(addFeedback({ id: id, feedback: newContent })).then((action) => {
      // fetch data only after the POST is fulfilled to avoid an endless loop
      if (action.type === "feedback/add/fulfilled") {
        fetchFeedbackData();
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call using axios
        const response = await axios.get(
          `http://localhost:5001/api/feedback/getfeedbackid/${id}`,
          {
            withCredentials: true,
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchData();
    fetchFeedbackData();
  }, []);

  const handleGoToDashboard = () => {
    if (props.user?.mentor) {
      navigate("/mentor/feedbackqueue");
    } else {
      navigate("/intern/myrequests");
    }
  };

  return (
    <Container>
      <div style={feedbackContainer}>
        <Paper
          shadow="xs"
          p="sm"
          withBorder
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <Text>Intern Name: {data.studentName}</Text>
            <Text>
              Topic Of Learning Session: {data.topicOfLearningSession}
            </Text>
            <Text>Completed: {data.status ? "Yes" : "No"}</Text>
            <Text>
              Link to exercise: <a href={data.codeLink}>{data.codeLink}</a>
            </Text>
            {/* temporary fix for formatted time error, it attempted to format before data was available */}
            <Text>{data.id && formatCreatedAt(data.createdAt)}</Text>

            {data.whoisAssigned ? (
              <Text>Assigned to: {data.whoisAssigned}</Text>
            ) : null}
          </div>
          <Stack direction="horizontal" spacing="sm">
            <Button
              style={{ color: "black" }}
              color="#F9EB02"
              onClick={handleGoToDashboard}
            >
              Go to Dashboard
            </Button>
          </Stack>
        </Paper>
      </div>
      {submittedContent && (
        <div style={{ margin: "50px 0" }}>
          <Text size="xl" weight={700}>
            Submitted Feedback:
          </Text>
          <div
            ref={feedbackScrollRef}
            style={{
              margin: "10px 0",
              minHeight: "300px",
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            {submittedContent.length > 0 ? (
              submittedContent.map((submission, index) => {
                return (
                  <div key={index}>
                    <p>{props.user.fName}</p>
                    <li
                      style={{
                        listStyle: "none",
                        border: "1px solid #e1e1e1",
                        padding: "0 10px",
                        margin: "15px 0",
                      }}
                      key={index}
                      dangerouslySetInnerHTML={{ __html: submission.feedback }}
                    ></li>
                  </div>
                );
              })
            ) : (
              <p>No feedback</p>
            )}
          </div>
        </div>
      )}
      {props.user?.mentor && (
        <Paper shadow="xs" p="sm" withBorder>
          <TextEditor
            isMentor={true}
            submittedContent={handleSubmittedContent}
          />
        </Paper>
      )}
    </Container>
  );
}

export default SingleFeedbackPage;
