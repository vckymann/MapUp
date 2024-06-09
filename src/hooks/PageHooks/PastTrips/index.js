import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import databaseService from "../../../supabase/services/database"
import useAppselectors from "../../../store/selectors"

function usePastTripsPage() {

    
    const [trips, setTrips] = useState([])
    const { date } = useParams();
    
    const { loggedInUserId } = useAppselectors();

    function generateColor(index) {
        const colors = ["red", "blue", "green", "orange", "purple", "yellow"];
        return colors[index % colors.length];
    }

    useEffect(() => {
        async function getpastTrips() {
            const trips = await databaseService.getTripsByDateAndUserId(date, loggedInUserId)
            if (trips) {
                setTrips(trips)
            } else {
                setTrips([])
            }
        }
        getpastTrips()
    },[date,loggedInUserId])

  return {
    trips,
    generateColor
  }
}

export default usePastTripsPage
