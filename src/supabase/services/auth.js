import { supabase } from "../supabaseInit";

const authService = {
  async createAccount({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating account:", error.message);
      return error.message;
    }
  },

  async login({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error logging in:", error.message);
      return error.message;
    }
  },

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Error logging out:", error.message);
      return error.message;
    }
  }
};

export default authService;
