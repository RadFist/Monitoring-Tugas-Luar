import "../../style/schedule.css";
import { formatTanggalIndo } from "../../utils/formatedTime";
import ButtonComp from "../ButtonComp";
import ScheduleBodyPart from "./scheduleBodyPart";
const cardSchedule = ({ time = "Time", data = [], handlerClick }) => {
  const date = formatTanggalIndo(Date());

  const tugasMap = new Map();

  data.forEach((item) => {
    const key = item.id_tugas_luar; // gunakan id_tugas_luar yang benar
    if (!tugasMap.has(key)) {
      tugasMap.set(key, {
        judul_tugas: item.judul_tugas,
        pegawai: new Set([item.nama]),
      });
    } else {
      tugasMap.get(key).pegawai.add(item.nama);
    }
  });

  const activity = [];
  const employer = [];

  for (const { judul_tugas, pegawai } of tugasMap.values()) {
    activity.push(judul_tugas);
    employer.push([...pegawai]);
  }

  return (
    <>
      <div className="schedule-card-container flex-column">
        <span className="title-card-schedule">
          {time} {date == time && <div className="labelCard">hari ini</div>}
        </span>

        <div className="border-bottom flex-column"></div>
        <div
          className="border-bottom"
          style={{ padding: "3px 0", marginBottom: "5px" }}
        >
          <ScheduleBodyPart title={"Kegiatan"} data={activity} />
        </div>
        <ScheduleBodyPart title={"Pegawai"} data={employer} />
        <div className="button-wrapper">
          <ButtonComp
            text="detail"
            className="btn-schedule"
            onClick={handlerClick}
          />
        </div>
      </div>
    </>
  );
};
export default cardSchedule;
