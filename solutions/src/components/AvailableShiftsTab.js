import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {filterShiftsByCity} from '../utils/filterShitsByCity';
import ShiftByDate from './ShiftByDate';

const AvailableShiftsTab = ({ shifts, onBook, onCancel }) => {
  const bookedShifts = useSelector((state) => state.shifts.booked);
  
  const [selectedCity, setSelectedCity] = useState('Helsinki');

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const filteredShifts = useMemo(() => filterShiftsByCity(shifts, selectedCity), [shifts, selectedCity]);

  const isOverlapping = (shift) => {
    return bookedShifts.some(bookedShift => (
      shift.startTime < bookedShift.endTime && shift.endTime > bookedShift.startTime
    ));
  };

  const overlappingShiftIds = useMemo(() => (
    filteredShifts.filter(isOverlapping).map(shift => shift.id)
  ), [filteredShifts, bookedShifts]);

  const shiftCounts = useMemo(() => {
    const counts = {};
    ['Helsinki', 'Tampere', 'Turku'].forEach(city => {
      counts[city] = filterShiftsByCity(shifts, city).length;
    });
    return counts;
  }, [shifts]);

  return (
    <div className="bg-white rounded shadow-lg border-greyslate-10 border-[1px]">
      <div className="flex justify-around p-4 border-b border-greyslate-10">
        {['Helsinki', 'Tampere', 'Turku'].map((city) => (
          <button
            key={city}
            className={`px-4 py-2 text-lg font-semibold ${selectedCity === city ? "text-sapphireblue"
              : "text-greyslate-20"}`}
            onClick={() => handleCityChange(city)}
          >
            {city} ({shiftCounts[city]})
          </button>
        ))}
      </div>
      <ShiftByDate
        shifts={filteredShifts}
        onBook={onBook}
        onCancel={onCancel}
        overlappingShifts={overlappingShiftIds}
      />
    </div>
  );
};

export default AvailableShiftsTab;
