import { getNotifById } from "../model/notifModel.js";

export const getNotifIdUser = async (req, res) => {
  const idUser = req.params.id;

  if (!idUser) {
    return res.status(400).json({ message: "ID user tidak boleh kosong." });
  }

  try {
    const data = await getNotifById(idUser);

    if (!data || data.length === 0) {
      return res.status(200).json({ message: "Notification Epmty" });
    }

    res.status(200).json({
      success: true,
      message: "Data notifikasi berhasil diambil.",
      data: data,
    });
  } catch (error) {
    console.error("Gagal mengambil notifikasi:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil notifikasi.",
    });
  }
};
