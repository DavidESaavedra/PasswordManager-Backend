import model from "../models/user.js";

// post

const handleEntries = async (req, res) => {
  const { ID, accessToken } = req.body;

  const rows = await model.getEntries(ID);

  res.status(200).json(rows);
};

// post

const handleAdd = async (req, res) => {
  const { title, username, password, ID } = req.body;

  const rows = await model.addEntry(ID, title, username, password);

  res
    .status(200)
    .json({ message: "new Entry was created", pKey: rows.insertId });
};

// put

const handleEdit = async (req, res) => {
  const { ID, pKey, title, username, password, accessToken } = req.body;

  const rows = await model.checkEntry(pKey);

  if (rows.length === 0) {
    res.status(500).json({ message: "Entry doesn't exist" });
    return;
  }

  await model.updateEntry(title, username, password, pKey);

  res.status(200).json({ message: "Entry was edited" });
};

// delete

const handleDelete = async (req, res) => {
  const { ID, pKey, accessToken } = req.body;
  const params = req.params.key;

  const rows = await model.checkEntry(params);

  if (rows.length === 0) {
    res.status(500).json({ message: "Entry doesn't exist" });
    return;
  }

  await model.deleteEntry(params);

  res.status(200).json({ message: "entry deleted" });
};

export default { handleEntries, handleAdd, handleEdit, handleDelete };
