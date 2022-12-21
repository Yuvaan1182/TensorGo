import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Paper, TextField } from "@mui/material";

const Card = (props) => {
  const [data, setData] = useState(props.data);
  const [editable, setEditable] = useState(false);
  const [changed, setChanged] = useState(false);

  const editHandler = () => {};

  const setValue = (e) => {
    e.preventDefault();
    let tempData = { ...data };
    tempData[e.target.name] = e.target.value;
    setData(tempData);
    setChanged(true);
  };

  const updataHandler = () => {
    axios
      .post("http://localhost:5000/api/editData", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setEditable(false);
        } else {
          console.log("Unable to set Data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper
      key={props.idx}
      style={{
        width: "80%",
        padding: "20px",
        display: "flex",
      }}
    >
      <TextField
        type={"text"}
        name="name"
        value={data.name}
        disabled={!editable}
        onChange={(e) => setValue(e)}
        xs={3}
      />
      <TextField
        type={"email"}
        name="email"
        value={data.email}
        disabled={!editable}
        onChange={(e) => setValue(e)}
        xs={3}
      />
      <TextField
        type={"text"}
        name="gender"
        value={data.gender}
        disabled={!editable}
        onChange={(e) => setValue(e)}
        xs={3}
      />
      <Box xs={1}>Status: {data.status}</Box>
      {editable ? (
        <Button
          type="submit"
          disabled={!changed}
          onClick={updataHandler}
          variant="contained"
          style={{ width: "200px" }}
          xs={2}
        >
          Update
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={() => {
            setEditable(true);
          }}
          variant="outlined"
          xs={2}
        >
          Edit
        </Button>
      )}
    </Paper>
  );
};

export default Card;
