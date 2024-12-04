// components/PlayerResult.js
import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming ShadCN Button
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PlayerResult = ({ player }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleFollow = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/player/followOrganiser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user_jwt')}`,
        },
        credentials: 'include',
        body: JSON.stringify({ organiserId: player._id }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsFollowing(true);
        setMessage('You are now following this player.');
        toast({
          title: "Follow Successful",
          description: "You are now following this player.",
        });
      } else {
        setMessage(data.message || 'Error following player.');
        toast({
          title: "Follow Failed",
          description: data.message || 'Error following player.',
          variant: "destructive",
        });
      }
    } catch (error) {
      setMessage('Error following player.');
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while trying to follow the player.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="player-result p-4 border-2 border-gray-200 rounded-lg shadow-sm mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(player.username)}`} alt={`${player.username}'s avatar`} />
          <AvatarFallback>{player.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-bold">{player.username}</h3>
          <p><strong>Email:</strong> {player.email}</p>
          {player.team && <p><strong>Team:</strong> {player.team.name}</p>}
        </div>
      </div>

      <div className="flex flex-col items-end">
        {!isFollowing ? (
          <Button
            onClick={handleFollow}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Follow Player
          </Button>
        ) : (
          <p className="text-green-600">Following</p>
        )}
        {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
      </div>
    </div>
  );
};

export default PlayerResult;
