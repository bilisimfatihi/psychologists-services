import { login, logout, register } from "../firebase/auth";
import { useAuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const { user, loading } = useAuthContext();

    return { user, loading, login, logout, register };
}