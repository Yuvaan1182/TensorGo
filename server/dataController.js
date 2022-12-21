const Data = require("./model/data");
const csv = require("csv-express");
const CsvParser = require("json2csv").Parser;

//fetch data
exports.getData = async (req, res) => {
  console.log("Reached Backend");
  try {
    const data = await Data.find();
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).send({ message: err.message || "Internal Server Error!" });
  }
};

//edit data
exports.editData = async (req, res) => {
  console.log("Reached Backend");
  let body = {
    name: req.body.name,
    email: req.body.email,
    status: req.body.status,
    gender: req.body.gender,
  };
  try {
    await Data.findByIdAndUpdate(req.body._id, {
      ...body,
    });

    res.status(200).json({ message: "Data updated!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message || "Internal Server Error!" });
  }
};

//get csv
exports.getCSV = async (req, res) => {
  console.log("Reached Backend");
  try {
    const data = await Data.find();
    const csvFields = [
      "Name",
      "Email",
      "Gender",
      "Status",
      "CreatedAt",
      "UpdatedAt",
    ];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=data.csv");

    res.status(200).end(csvData);
    // res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).send({ message: err.message || "Internal Server Error!" });
  }
};
