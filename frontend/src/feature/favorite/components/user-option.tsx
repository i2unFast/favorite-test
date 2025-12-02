import React, { useState } from "react";
import { User } from "../hook/use-user-store";
import { MenuItem, SelectChangeEvent } from "@mui/material";
import { FormControl, InputLabel, Select } from "@mui/material";

const UserOption: React.FC<{
  users: User[];
  onSelectUser: (userId: number) => void;
}> = ({ onSelectUser, users }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | "">("");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedUserId(value === "" ? "" : Number(value));
    onSelectUser(value === "" ? 0 : Number(value));
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedUserId === "" ? "" : String(selectedUserId)}
          label="User"
          onChange={handleChange}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default UserOption;
