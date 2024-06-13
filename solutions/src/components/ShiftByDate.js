import ShiftItem from './ShiftItem';
import { formatDate } from '../utils/groupShiftsByDate';

const ShiftsByDate = ({ shifts, onBook, onCancel, overlappingShifts }) => {
  const formatDateString = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const shiftsByDate = shifts.reduce((acc, shift) => {
    const date = formatDateString(shift.startTime);
    if (!acc[date]) acc[date] = [];
    acc[date].push(shift);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(shiftsByDate).map(date => (
        <div key={date}>
          <h3 className="text-md font-bold py-4 px-8 text-greyslate-30 border-b border-greyslate-10 bg-chalk">{formatDate(date)}</h3>
          <ul>
            {shiftsByDate[date].map(shift => (
              <ShiftItem
                key={shift.id}
                shift={shift}
                onBook={onBook}
                onCancel={onCancel}
                isOverlapping={overlappingShifts.includes(shift.id)}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShiftsByDate;
