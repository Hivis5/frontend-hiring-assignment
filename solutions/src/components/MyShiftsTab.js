import { groupShiftsByDate,formatDate } from '../utils/groupShiftsByDate';
import ShiftItem from './ShiftItem';

const MyShiftsTab = ({ shifts, onCancel }) => {
  const groupedShifts = groupShiftsByDate(shifts);
  const hasShifts = Object.keys(groupedShifts).length > 0;

  return (
    <div className="bg-white rounded shadow-lg border-greyslate-10 border-[1px]">
      {hasShifts ? (
        Object.keys(groupedShifts).map((date) => (
          <div key={date}>
            <div className="flex gap-4 text-md py-4 px-8 text-greyslate-30 border-b border-greyslate-10 bg-chalk">
              <h3 className="font-bold">{formatDate(date)}</h3>
              <span className="text-greyslate-20 text-sm mt-[2px]">
                {groupedShifts[date].shifts.length} shifts, {groupedShifts[date].totalTime.toFixed(1)} h
              </span>
            </div>
            <ul>
              {groupedShifts[date].shifts.map((shift) => (
                <ShiftItem key={shift.id} shift={shift} onCancel={onCancel} myShift={true} />
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className="text-center text-red-20 text-lg font-semibold">No shift booked</div>
      )}
    </div>
  );
};

export default MyShiftsTab;
