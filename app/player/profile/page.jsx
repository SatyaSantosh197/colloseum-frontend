import React from 'react';
import NavProfile from '../../../components/NavProfile'; // Adjust the path as needed
import PlayerDetails from '../../../components/PlayerDetails'; // Adjust the path as needed
import TournamentsWon from '@/components/TournamentsWon';
// import PlayerRanking from '@/components/PlayerRanking';
const ProfilePage = () => {
  return (
    <div>
      <NavProfile />
      <PlayerDetails />
      <TournamentsWon />
      {/* <PlayerRanking /> */}
    </div>
  );
};

export default ProfilePage;
