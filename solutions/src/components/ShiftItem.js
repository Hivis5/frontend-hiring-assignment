import { useState, memo } from 'react';
import loadingIcon from '../assets/spinner_green.svg';
import cancelIcon from '../assets/spinner_red.svg';

const ShiftItem = ({ shift, onBook, onCancel, isOverlapping, myShift }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  const isBooked = shift.booked;
  const isStarted = new Date(shift.startTime) < new Date();
  const isDisabled = isBooked || isStarted || isOverlapping;

  const handleBookClick = async () => {
    setIsLoading(true);
    await onBook(shift.id);
    setIsLoading(false);
  };

  const handleCancelClick = async () => {
    setIsCanceling(true);
    await onCancel(shift.id);
    setIsCanceling(false);
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const buttonClass = isBooked 
    ? `${isStarted ? 'text-red-10 border-red-10' : 'text-red-30 border-red-30'}`
    : `${isDisabled ? 'text-green-10 border-green-10' : 'text-green-30 border-green-30'}`;

    const buttonText = isLoading
    ? <img src={loadingIcon} alt="Loading..." />
    : isCanceling
    ? <img src={cancelIcon} alt="Canceling..." />
    : isBooked
    ? 'Cancel'
    : 'Book';
  const handleClick = isBooked ? handleCancelClick : handleBookClick;
  const isButtonDisabled = isBooked ? (isStarted || isLoading) : (isDisabled || isLoading);

  return (
    <li className="flex justify-between items-center py-4 px-8 border-b border-greyslate-10 text-greyslate-30">
      <div>
        <p>{formatTime(shift.startTime)} - {formatTime(shift.endTime)}</p>
        {myShift && <p className="text-greyslate-20">{shift.area}</p>}
      </div>

      <div className="flex gap-8">
        {!myShift && (
          <div className="font-semibold">
            {isBooked ? (
              <p>Booked</p>
            ) : isOverlapping ? (
              <p className="text-red-30">Overlapping</p>
            ) : (
              <p></p>
            )}
          </div>
        )}
        <button
          className={`px-6 py-[4px] min-w-[64px] rounded-full font-base text-xs shadow-md border-[1px] ${buttonClass}`}
          onClick={handleClick}
          disabled={isButtonDisabled}
        >
          {buttonText}
        </button>
      </div>
    </li>
  );
};

export default memo(ShiftItem);

