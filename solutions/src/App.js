import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShifts, bookShift, cancelShift } from './features/shifts/shiftsSlice';
import AvailableShifts from './components/AvailableShiftsTab';
import MyShifts from './components/MyShiftsTab';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('myShifts');
  const dispatch = useDispatch();
  const availableShifts = useSelector((state) => state.shifts.available);
  const bookedShifts = useSelector((state) => state.shifts.booked);

  useEffect(() => {
    dispatch(fetchShifts());
  }, [dispatch]);

  const handleBook = (shiftId) => {
    dispatch(bookShift(shiftId));
    window.location.reload();
  };

  const handleCancel = (shiftId) => {
    dispatch(cancelShift(shiftId));
    window.location.reload();
  };

  const memoizedShifts = useMemo(() => {
    return {
      bookedShifts,
      availableShifts,
    };
  }, [bookedShifts, availableShifts]);

  return (
    <div className="container mx-auto p-16 bg-chalk flex justify-center min-h-screen">
      <div>  
        <nav className="flex mb-4">
          <button
            className={`px-4 py-2 text-lg font-semibold ${
              selectedTab === 'myShifts' ? 'text-sapphireblue' : 'text-greyslate-20'
            }`}
            onClick={() => setSelectedTab('myShifts')}
          >
            My Shifts
          </button>
          <button
            className={`px-4 py-2 text-lg font-semibold ${
              selectedTab === 'availableShifts' ? 'text-sapphireblue' : 'text-greyslate-20'
            }`}
            onClick={() => setSelectedTab('availableShifts')}
          >
            Available Shifts
          </button>
        </nav>
        <div className='min-w-[700px]'>
          {selectedTab === 'myShifts' && (
            <MyShifts shifts={memoizedShifts.bookedShifts} onCancel={handleCancel} />
          )}
          {selectedTab === 'availableShifts' && (
            <AvailableShifts shifts={memoizedShifts.availableShifts} onBook={handleBook} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
