import {create} from "zustand";

export const useUserStore = create((set) => ({
    users:[],
    setUsers: (users) => set({users}),
    createUser: async (newUser) => {
        if( !newUser.name || !newUser.email || !newUser.phoneNumber || !newUser.jobTitle || !newUser.profilePicture){
            return {success: false, message: "Please fill in all fields"};
        }
        const res = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });
        const data = await res.json();
        set((state) => ({users: [...state.users, data]}));
        return {success: true, message: "User created successfully"};
    },
    fetchUsers: async () => {
        const res = await fetch("/api/users");
        const data = await res.json();
        set({users: data});
    },
    deleteUser: async (id) => {
        try {
          const res = await fetch(`/api/users/${id}`, {
            method: "DELETE",
          });
          if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || "Failed to delete user" };
          }
          set((state) => ({
            users: state.users.filter((user) => user.id !== id),
          }));
          return { success: true, message: "User deleted successfully" };
        } catch (error) {
          return { success: false, message: error.message || "An error occurred" };
        }
    },
    updateUser: async (id, updatedUser) => {
        try {
          const res = await fetch(`/api/users/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          });
          if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || "Failed to update user" };
          }
          set((state) => ({
            users: state.users.map((user) => (user.id === id ? updatedUser : user)),
          }));
          return { success: true, message: "User updated successfully" };
        } catch (error) {
          return { success: false, message: error.message || "An error occurred" };
        }
    },

}));