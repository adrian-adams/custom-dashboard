import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CardTags from "@/components/cards/CardTags";
import InputImg from "@/components/custom/InputImg";
import InputURL from "@/components/custom/InputURL";
import InputTitle from "@/components/custom/InputTitle";
import LoadingModal from "@/components/custom/LoadingModal";
import { SaveIcon, Trash2, Pencil } from "lucide-react";

import { updateCard, deleteCard, uploadAndGetUrl } from "/services/cardService";

export const EditBtn = () => (
  <Button className="cust_cardRes_Btn" type="button">
    <span>Edit</span>
    <Pencil />
  </Button>
);

export const SaveBtn = () => (
  <Button className="cust_cardRes_Btn" type="submit">
    <span>Save</span>
    <SaveIcon />
  </Button>
);

export const DeleteBtn = ({ onClick }) => (
  <>
    <Button className="cust_cardRes_Btn" type="button" onClick={onClick}> 
      <span>Delete</span>
      <Trash2 />
    </Button>
  </>
);

export const CardEdit = ({card}) => {
  const [title, setTitle] = useState(card.title);
  const [img, setImg] = useState(null);
  const [imageUrl, setImageUrl] = useState(card.imageUrl || "");
  const [tags, setTags] = useState(card.tags || []);
  const [url, setUrl] = useState(card.url);
  const [open, setOpen] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [loadingMsg, setLoadingMsg] = useState("");
 
  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setLoadingModal(true);
      setLoadingStatus("loading");
      setLoadingMsg("Busy updating resource...");

      let finalImageUrl = imageUrl;

      if (img instanceof File) {
        finalImageUrl = await uploadAndGetUrl(img);
      }

      console.log("Updating card:", card.id, {
        title,
        url,
        tags,
        imageUrl: finalImageUrl,
      });

      await updateCard(card.id, {
        title,
        url,
        tags,
        imageUrl: finalImageUrl,
      });

      setLoadingStatus("Success")
      setLoadingMsg("Resource updated!");

      setTimeout(() => {
        setLoadingModal(false);
        setOpen(false);},
        1500);

    } catch (err) {
      setLoadingStatus("error");
      setLoadingMsg("Something went wrong");
      setTimeout(() => {
        setLoadingModal(false);
      }, 2000);
      console.error("Error updating resource:", err);
    }
  }

  const handleDelete = async () => {
    try {
      setTimeout(() => {
        setLoadingModal(true);
        setLoadingStatus("loading");
        setLoadingMsg("Busy deleting resource...");},
        1500);

      await deleteCard(card.id);
      
    } catch (err) {
        setLoadingStatus("error");
        setLoadingMsg("Something went wrong");
        setTimeout(() => {
          setLoadingModal(false);
        }, 2000);
        console.error("Error deleting resource:", err);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} className="flex flex-col items-center justify-center gap-2 rounded-3xl p-4 border-4 border-gray-500 border-dashed overflow-hidden h-full">
        <DialogTrigger>
          <EditBtn />
        </DialogTrigger>
        <DialogContent className="bg-black">

          <DialogHeader>
            <DialogTitle>
              <h2 className="text-xl font-bold mb-4">Edit Card</h2>
            </DialogTitle>
          </DialogHeader>

            <form onSubmit={handleUpdate} className="flex flex-col gap-6">
              <InputTitle value={title} onChange={(e) => setTitle(e.target.value)} />
              <InputImg 
                value={imageUrl} 
                onChange={(file) => {
                  if (file instanceof File) {
                    setImg(file);
                    setImageUrl(URL.createObjectURL(file));
                  } else {
                    // setImg(null);
                    setImageUrl(file);
                  }}
                } 
              />
              <CardTags selectedTags={tags} onChange={setTags} />
              <InputURL value={url} title={title} onChange={(e) => setUrl(e.target.value)} />
              <div className="flex justify-between gap-4">
                <SaveBtn />
                <DeleteBtn onClick={handleDelete} modalMsg={handleDelete} />
              </div>
              <LoadingModal open={loadingModal} status={loadingStatus} message={loadingMsg} />
            </form>

          </DialogContent>
      </Dialog>
    </>
  );
}

export default CardEdit;
