import axiosInstance from "@/lib/api/axiosInstance";
import { useEffect, useState } from "react";


export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axiosInstance.get<User[]>("/api/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return users;
};