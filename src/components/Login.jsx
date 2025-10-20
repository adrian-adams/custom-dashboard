import React, {useState} from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import { Button } from "@/components/ui/button";

import LoadingModal from "@/components/custom/LoadingModal";
import { getUser } from "/services/loginService";

export const Login = ({ onLogin }) => {
    const [selectedUser, setSelectedUser] = useState("Guest");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [loadingMsg, setLoadingMsg] = useState("");
    
    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const userData = await getUser(selectedUser);

            if (selectedUser === "Admin" && userData.password !== password) {
                setError("Incorrect password.");
                return;
            }

            onLogin(userData.role);
        } catch (error) {
            console.error("Login error:", error);
            setError("Login failed. Please try again.");
        }
    }

  return (
    <>
        <div className='w-full h-screen flex justify-center items-center'>
            <form onSubmit={handleLogin} className='flex flex-col gap-6 bg-black border-4 border-green-700 w-full max-w-100 p-4 m-4 rounded-md'>
                <div>
                    <h1 className='font-bold text-center uppercase'>
                        DASHBOARD LOGIN
                    </h1>
                </div>
                <div>
                    <Select className='w-100' 
                            value={selectedUser}
                            onValueChange={setSelectedUser} >
                        <Label className='mb-2 ps-1'>Username</Label>
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Select User" />
                        </SelectTrigger>
                        <span className='text-sm ps-1'>If you are a "Guest", you do not need a password.</span>
                        <SelectContent>
                            <SelectItem value="Guest">Guest</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                    </Select> 
                </div>
                <div>
                    <Label className='mb-2 ps-1'>Password</Label>
                    <div>
                        <Input 
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={selectedUser === "Admin"}
                            disabled={selectedUser === "Guest"}
                        />   
                    </div>
                </div>
                <div>
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                </div>
                <div>
                    <Button type="submit" className='w-full bg-green-700 hover:bg-green-800 cursor-pointer'>Login</Button>
                </div>
            </form>
        </div>
    </>
  )
}

export default Login