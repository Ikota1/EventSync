import { useAppContext } from "../../../context/AppContext";

const Week = () => {
  const { screenSize } = useAppContext();
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="grid grid-cols-7 gap-1 font-poppins">
      {daysOfWeek.map((el, index) => {
        return (
          <div key={index} className="col-span-1">
            <p className={`mx-2 text-sm ${screenSize <= 992 ? "" : "hidden md:block"}`}>
              {screenSize <= 992 ? el.slice(0, 3) : el}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Week;
