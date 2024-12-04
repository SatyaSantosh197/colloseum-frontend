import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const ProfilePicture = () => {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prevUser => ({
          ...prevUser,
          image: {
            data: reader.result.split(',')[1],
            contentType: file.type
          }
        }));
      };
      reader.readAsDataURL(file);
    }
    setIsModalOpen(false);
  };

  const handleChangePicture = () => {
    fileInputRef.current.click();
  };

  const handleRemovePicture = () => {
    setUser(prevUser => ({
      ...prevUser,
      image: null
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-32 h-32">
        <Image
          src={user && user.image && user.image.data
            ? `data:${user.image.contentType};base64,${user.image.data}`
            : "/placeholder.svg?height=128&width=128"}
          alt="Profile Picture"
          width={128}
          height={128}
          className="rounded-full object-cover border-4 border-primary"
          priority
        />
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="secondary" 
              size="sm" 
              className="absolute bottom-0 right-0 rounded-full"
            >
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile Picture</DialogTitle>
              <DialogDescription>
                Choose an action for your profile picture
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4">
              <Button onClick={handleChangePicture}>Change Picture</Button>
              <Button variant="destructive" onClick={handleRemovePicture}>Remove Picture</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        accept="image/*"
      />
    </div>
  );
};

export default ProfilePicture;

