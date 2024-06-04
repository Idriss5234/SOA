/*import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const CalendarRoot = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const pickerStaticWrapper = css`
  box-shadow: 3px 2px 10px 5px #888888 !important;
`;

const dialogActions = css`
  display: none !important;
`;

const toolbarPenIconButton = css`
  display: none !important;
`;

const toolbar = css`
  padding: 0 !important;
`;

const toolbarContent = css`
  justify-content: center !important;
  background-color: orange;
  padding: 1rem;
`;

const badge = css`
  color: green;
`;

const Calendar = () => {
  const [value, setValue] = useState(new Date());
  const [highlightedDays] = useState([1, 2, 13]);

  const shouldDisableDate = (date) => {
    const today = new Date();
    return date < today;
  };

  return (
    <CalendarRoot>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          orientation='portrait'
          value={value}
          onChange={(newValue) => setValue(newValue)}
          disablePast
          shouldDisableDate={shouldDisableDate}
          renderInput={(params) => <TextField {...params} />}
          renderDay={(day, _value, DayComponentProps) => {
            const isSelected =
              !DayComponentProps.outsideCurrentMonth &&
              highlightedDays.indexOf(day.getDate()) >= 0;

            return (
              <Badge
                key={day.toString()}
                overlap='circular'
                badgeContent={isSelected ? null : undefined}
                css={badge}
              >
                <PickersDay {...DayComponentProps} />
              </Badge>
            );
          }}
          componentsProps={{
            actionBar: {
              className: dialogActions,
            },
            toolbar: {
              className: toolbar,
            },
            toolbarPenIconButton: {
              className: toolbarPenIconButton,
            },
            staticWrapper: {
              className: pickerStaticWrapper,
            },
            toolbarContent: {
              className: toolbarContent,
            },
          }}
        />
      </LocalizationProvider>
    </CalendarRoot>
  );
};

export default Calendar;
*/
