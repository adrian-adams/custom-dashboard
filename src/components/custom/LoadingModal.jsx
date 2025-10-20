import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import LoadSpinner from "@/components/custom/LoadSpinner";

const LoadingModal = ({ open, status, message }) => {
  return (
    <>
      <Dialog open={open}>
        <DialogContent>
            <DialogHeader>
              <DialogDescription>
                {status === "loading" && <LoadSpinner />}
                <span>{message}</span>
              </DialogDescription>
            </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default LoadingModal 
