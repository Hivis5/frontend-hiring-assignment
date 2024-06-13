
export const filterShiftsByCity = (shifts, city) => {
    return shifts.filter(shift => shift.area === city);
};
  