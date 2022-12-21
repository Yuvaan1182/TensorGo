import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/Card";
import { Box, Button } from "@mui/material";
import { saveAs } from "file-saver";

function App() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    console.log("UseEffect");
    if (data === undefined)
      axios
        .get("http://localhost:5000/api/getData")
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
  }, [data]);

  const getCSVHandler = () => {
    return axios({
      method: "GET",
      url: "http://localhost:5000/api/getCSV",
      responseType: "arraybuffer",
      headers: {
        Accept: "text/csv",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200 && response) {
          return response.data;
        }
      })
      .catch((error) => console.log(error));
  };

  const onHandleDownload = () => {
    getCSVHandler().then((data) => {
      const blob = new Blob([data], {
        type: "text.csv",
      });
      saveAs(blob, "csv_name.csv");
    });
  };

  return (
    <Box
      className="App"
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      py={2}
    >
      {data &&
        data.map((val, idx) => {
          return <Card key={idx} data={val} />;
        })}
      <Button variant="contained" onClick={onHandleDownload}>
        Export CSV
      </Button>
    </Box>
  );
}

export default App;
