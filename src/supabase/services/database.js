import { supabase } from "../supabaseInit";

const databaseService = {
    async createUser({ email, name }) {
        const { error } = await supabase.from("users").insert({ email, name });
        if (error) throw new Error(error.message);
    },

    async getUser(email) {
        const { data } = await supabase.from("users").select("id").eq('email', email).single();
        return data;
    },

    async storeTrip(tripData, userId) {
        const { error } = await supabase.from("trips").insert({
            trip_date: tripData.tripdate,
            start_time: tripData.startTime,
            end_time: tripData.endTime,
            coordinates: tripData.coordinates,
            distance_travelled: tripData.distanceTravelled,
            user_id: userId
        });
        if (error) throw new Error(error.message);
    },

    async getUserTrips(userId) {
        const { data, error } = await supabase.from("trips").select("trip_date").eq('user_id', userId);
        if (error) throw new Error(error.message);
        return [...new Set(data.map((trip) => trip.trip_date))];
    },

    async getTripsByDateAndUserId(date, userId) {
        const { data, error } = await supabase.from("trips").select("*").eq('trip_date', date).eq('user_id', userId);
        if (error) throw new Error(error.message);
        return data;
    }
};

export default databaseService;
