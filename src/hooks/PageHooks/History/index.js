import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import databaseService from "../../../supabase/services/database";
import dayjs from 'dayjs';
import useAppselectors from "../../../store/selectors";



function useHistoryPage() {

    
    const { loggedInUserId } = useAppselectors();

    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
       if(!loggedInUserId || dates.length > 0) return
            async function getTrips () {
              const dates = await databaseService.getUserTrips(loggedInUserId);
              setDates(dates);
            }
      getTrips()
    },[loggedInUserId, dates.length])



  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleOk = () => {
    const selectedDateToNavigate = dayjs(selectedDate).format('YYYY-MM-DD');
    navigate(`/history/${selectedDateToNavigate}`);
  }

  const shouldDisableDate = (date) => {
    return!dates.includes(date.toISOString().split('T')[0]);
  };

  const memoizedDates = useMemo(() => dates, [dates])

  return {
    dates:memoizedDates,
    handleOk,
    handleDateChange,
    shouldDisableDate,
    selectedDate,
  }
}

export default useHistoryPage
