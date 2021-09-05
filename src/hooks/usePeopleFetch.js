import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers]             = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [isLoading, setIsLoading]     = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers(filterObject = {results: 25, page: 1}) {
    setIsLoading(true);
    
    const params   = new URLSearchParams(filterObject);
    const response = await axios.get(`https://randomuser.me/api/?${params.toString()}`);
    
    setIsLoading(false);
    setUsers(response.data.results);
    setcurrentPage(filterObject.page);
  }

  return { users, isLoading, fetchUsers };
};


