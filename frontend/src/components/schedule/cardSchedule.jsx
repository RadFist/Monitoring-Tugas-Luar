import "../../style/schedule.css";
import ButtonComp from "../ButtonComp";
import ScheduleBodyPart from "./scheduleBodyPart";
const cardSchedule = ({
  time = "Time",
  listActivity = ["Activity"],
  listEmployee = ["Employeer"],
}) => {
  return (
    <>
      <div className="schedule-card-container flex-column">
        <span className="title-card-schedule">{time}</span>
        <div className="border-bottom flex-column"></div>
        <div
          className="border-bottom"
          style={{ padding: "3px 0", marginBottom: "5px" }}
        >
          <ScheduleBodyPart title={"Kegiatan"} data={listActivity} />
        </div>
        <ScheduleBodyPart title={"Pegawai"} data={listEmployee} />
        <div className="button-wrapper">
          <ButtonComp text="detail" className="btn-schedule" />
        </div>
      </div>
    </>
  );
};
export default cardSchedule;
