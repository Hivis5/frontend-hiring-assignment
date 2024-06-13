export const groupShiftsByDate = (shifts) => {
  const grouped = shifts.reduce((acc, shift) => {
    const date = new Date(shift.startTime).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = { shifts: [], totalTime: 0 };
    }
    acc[date].shifts.push(shift);
    acc[date].totalTime += (new Date(shift.endTime) - new Date(shift.startTime)) / 3600000;
    return acc;
  }, {});
  Object.keys(grouped).forEach(date => {
    grouped[date].shifts.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  });

  return grouped;
};


export const formatDate = (dateStr) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const date = new Date(dateStr);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  }
};