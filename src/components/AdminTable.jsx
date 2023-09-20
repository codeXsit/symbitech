import React, { useEffect, useState } from 'react';
import axios from 'axios';

function formatPlaytime(timestamp) {
  const playtime = new Date(timestamp);

  // Subtract 15 minutes (900,000 milliseconds)
  playtime.setTime(playtime.getTime() - 900000);

  const hours = playtime.getHours().toString().padStart(2, '0');
  const minutes = playtime.getMinutes().toString().padStart(2, '0');

  // Format as "hh:mm" (24-hour format)
  return `${hours}:${minutes}`;
}

function AdminTable() {

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const container = document.getElementById('container');
    if (container) {
      container.style.alignItems = 'flex-start';
    }
    
    async function fetchData() {
      const response = await axios.get('/api/v1/allTeams');
      const adjustedTeams = response.data.allTeams.map((team) => ({
        ...team,
        arrivalTime: formatPlaytime(new Date(team.timestamp)),
      }));
      setTeams(adjustedTeams);
    }
    
    fetchData();

    return () => {
      if (container) {
        container.style.justifyContent = 'center'; 
      }
    };
  }, []);

  async function handleReschedule(teamId) {
    try {
      const response = await axios.get('/api/v1/latestTime');
      const latestTimestamp = response.data.latestTimestamp;
      
      if (latestTimestamp) {
        const newTimestamp = new Date(latestTimestamp);
        newTimestamp.setTime(newTimestamp.getTime() + 1500000);
        await axios.put(`/api/v1/reschedule/${teamId}`, { newTimestamp })
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return(
    <table>
      <tr>
        <th>Sr. No.</th>
        <th>Team Name</th>
        <th>Team Email</th>
        <th>Playtime</th>
        <th>Reschedule</th>
      </tr>
      {teams.map((team, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{team.teamName}</td>
          <td>{team.userEmail}</td>
          <td>{team.arrivalTime}</td>
          <td>
            <button onClick={() => handleReschedule(team._id)}>Reschedule</button>
          </td>
        </tr>
      ))}
    </table>
  );
}

export default AdminTable;
