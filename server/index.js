const express = require("express");
const cors = require("cors");
const db = require("./db_config");
const axios = require("axios");
const Data = require("./model/data");
const app = express();
const dataController = require("./dataController.js");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//routes and controller

app.get("/api/getData", dataController.getData);
app.get("/api/getCSV", dataController.getCSV);
app.post("/api/editData", dataController.editData);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

// const data_get = async () => {
//   try {
//     return await axios
//       .get("https://gorest.co.in/public-api/users", {
//         headers: { "Accept-Encoding": "gzip,deflate,compress" },
//       })
//       .then((res) => {
//         console.log(res.data);
//         res.data.data.forEach(async (ele) => {
//           const data = new Data({
//             id: ele.id,
//             name: ele.name,
//             email: ele.email,
//             gender: ele.gender,
//             status: ele.status,
//           });
//           await data.save();
//         });
//       });
//   } catch (error) {
//     console.error(error);
//   }
// };
// console.log(data_get());
