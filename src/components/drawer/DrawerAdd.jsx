import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddIcon from "../custom/AddIcon";
import { Button } from "@/components/ui/button";
import InputURL from "@/components/custom/InputURL";
import InputTitle from "@/components/custom/InputTitle";
import LoadingModal  from "@/components/custom/LoadingModal";
import { SaveIcon, Trash2 } from "lucide-react";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "/services/firebaseConfig";
import { createDrawer } from "/services/drawerService";

export const SaveBtn = () => (
  <Button className="cust_cardRes_Btn" type="submit">
    <span>Save</span>
    <SaveIcon />
  </Button>
);

export const DeleteBtn = () => (
  <Button className="cust_cardRes_Btn" type="button">
    <span>Delete</span>
    <Trash2 />
  </Button>
);

export const DrawerAdd = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null); // will hold a File
  const [tags, setTags] = useState([]);
  const [url, setUrl] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [loadingMsg, setLoadingMsg] = useState("");

  const resetForm = () => {
    setTitle("");
    setImg(null);
    setTags([]);
    setUrl("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        setLoadingModal(true);
        setLoadingStatus("loading");
        setLoadingMsg("Busy adding resource...");

        const drawerData = { title, url };
        console.log("Submitting:", drawerData); 
        await createDrawer(drawerData);
        
        setLoadingStatus("Success")
        setLoadingMsg("Resource added!");

        setTimeout(() => {
          setLoadingModal(false);
          resetForm();
          setOpen(false);},
          1500);
        
    } catch (err) {
      setLoadingStatus("error");
      setLoadingMsg("Something went wrong");
      setTimeout(() => {
        setLoadingModal(false);
      }, 2000);
      console.error("Error adding resource:", err);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} className="p-10 h-full">
          <DialogTrigger>
            <AddIcon />
          </DialogTrigger>
        <DialogContent className="bg-black">
          <DialogHeader>
            <DialogTitle>Add Resource</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <InputTitle value={title} onChange={(e) => setTitle(e.target.value)} />
            <InputURL value={url} title={title} onChange={(e) => setUrl(e.target.value)} />
            <div className="flex justify-between gap-4">
              <SaveBtn />
            </div>
            <LoadingModal open={loadingModal} status={loadingStatus} message={loadingMsg} />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DrawerAdd;
