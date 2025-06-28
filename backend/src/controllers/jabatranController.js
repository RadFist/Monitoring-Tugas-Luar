import {
  createJabatan,
  deleteJabatanById,
  getListJabatan,
  getListJabatanLimit,
  updateJabatanById,
} from "../model/jabatanModel.js";

export const allJabatan = async (req, res) => {
  try {
    const response = {
      message: "Data user retrieved successfully",
      data: await getListJabatan(),
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: " Internal Server Error, please try again later." });
  }
};
export const getJabatanLimited = async (req, res) => {
  try {
    const response = {
      message: "Data user retrieved successfully",
      data: await getListJabatanLimit(),
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: " Internal Server Error, please try again later." });
  }
};

export const addJabatan = async (req, res) => {
  const { jabatan } = req.body;

  // Validasi sederhana
  if (!jabatan || jabatan.trim() === "") {
    return res
      .status(400)
      .json({ message: "Nama jabatan tidak boleh kosong." });
  }

  try {
    await createJabatan(jabatan);
    res.status(200).json({ message: "adding jabatan success" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: " Internal Server Error, please try again later." });
  }
};

export const updateJabatan = async (req, res) => {
  const { id } = req.params;
  const { jabatan } = req.body;

  if (!jabatan || jabatan.trim() === "") {
    return res.status(400).json({
      message: "Nama jabatan tidak boleh kosong.",
    });
  }

  try {
    const result = await updateJabatanById(id, jabatan.trim());

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJjabatan = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteJabatanById(id);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    res.json({ message: result.message });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: " Internal Server Error, please try again later." });
  }
};
