import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedbackForms } from "../features/FeedbackForms/feedbackrequestSlice";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Container,
  Box,
} from "@mui/material";

function Mentordashboard() {
  const dispatch = useDispatch();
  const feedbackForms = useSelector((state) => state.feedbackRequests.forms);

  useEffect(() => {
    dispatch(fetchFeedbackForms());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Mentor Dashboard
      </Typography>
      {feedbackForms.data ? (
        <List>
          {feedbackForms.data.map((form, index) => (
            <ListItem key={index} divider>
              <ListItemText>
                <Typography variant="h6">Student Name: {form.studentName}</Typography>
                <Typography variant="subtitle1">
                  Topic of Learning Session: {form.topicOfLearningSession}
                </Typography>
                <Typography variant="subtitle1">Code Link: {form.codeLink}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default Mentordashboard;
