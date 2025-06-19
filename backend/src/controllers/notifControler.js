import { getNotifById } from "../model/notifModel.js";
import { formatDateIso } from "../utils/dateFormater.js";

export const getNotifIdUser = async (req, res) => {
  const idUser = req.params.id;

  if (!idUser) {
    return res.status(400).json({ message: "ID user tidak boleh kosong." });
  }

  try {
    const result = await getNotifById(idUser);

    if (!result || result.length === 0) {
      return res.status(200).json({ message: "Notification Epmty" });
    }

    const data = result.map((item) => ({
      ...item,
      created_at: formatDateIso(item.created_at), // atau "YYYY-MM-DD", sesuai kebutuhan
    }));
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
