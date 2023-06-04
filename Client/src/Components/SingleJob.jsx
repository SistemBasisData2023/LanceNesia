import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Box, Grid, Card, CardActions, CardContent, Button, Typography, TextareaAutosize } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ParticlesBg from "particles-bg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SingleJob = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`/getprojectsone?project_id=${id}`);
        setJobData(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  useEffect(() => {
    if (jobData) {
      console.log("name project: ", jobData.project_name);
    }
  }, [jobData]);

  return (
    <>
      <Box sx={{ position: "relative" }} className="flex justify-center items-center">
        {loading && <div id="preloader">Loading...</div>}

        <Container maxWidth="md">
          <a href="/FindJobs" className="fixed top-4 left-4 bg-blue-500 py-2 px-4 rounded-md flex items-center space-x-1 hover:bg-yellow-400 hover:text-yellow-900">
            <ArrowBackIcon />
            <span>Back</span>
          </a>

          <Grid container spacing={4} style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
            <Grid item xs={12} md={6}>
              {jobData && (
                <Card className="h-full transform hover:-rotate-3 hover:scale-105 transition-transform duration-300 shadow">
                  <CardContent>
                    <img src={`https://source.unsplash.com/1600x900/?${jobData.project_name}`} alt="Project" className="h-80 w-full object-cover rounded-lg shadow-md" />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" color="primary" startIcon={<SendIcon />} fullWidth className="hover:bg-blue-600">
                      <a href="mailto:abdulfikihk@gmail.com">Apply Project</a>
                    </Button>
                  </CardActions>
                </Card>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {jobData && (
                <Card className="h-full transform hover:-rotate-3 hover:scale-105 transition-transform duration-300 shadow">
                  <CardContent>
                    <Typography variant="h6" className="font-poppins font-semibold mb-4">
                      Title: <span className="text-blue-700">{jobData.project_name}</span>
                    </Typography>
                    <hr className="my-2" />
                    <Typography variant="body2" className="font-poppins mt-2">
                      Date: {jobData.timeline}
                    </Typography>
                    <hr className="my-2" />
                    <Typography variant="body2" className="font-poppins">
                      Price: IDR {jobData.price}
                    </Typography>
                    <hr className="my-2" />
                    <Typography variant="body2" className="font-poppins">
                      Duration: {jobData.duration}
                    </Typography>
                    <hr className="my-2" />
                    <Typography variant="body2" className="font-poppins font-semibold">
                      Description:
                    </Typography>
                    <TextareaAutosize maxRows={8} aria-label="empty textarea" defaultValue={jobData.job_description} className="w-full border p-2 mt-2" readOnly={true} />
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ParticlesBg type="random" bg={true} params={{ color: "#FFF" }} />
    </>
  );
};

export default SingleJob;
