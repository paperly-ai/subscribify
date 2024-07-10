import { ChangeEvent, useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { MdOutlineFileUpload } from "react-icons/md";
import { documentUpload } from '@/api/fileUpload';

export function UploadDialogV2() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const result = await documentUpload(selectedFile);
      if (!result) {
        setSelectedFile(null);
      }
      DialogClose;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} >
          <MdOutlineFileUpload className="mr-2 w-4 h-4" />
          Upload Here
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Upload a document up to 1 MB in size in PDF format.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
            </label>

          </div>
          <p className='text-sm text-center'><span className='font-semibold'>File Name:</span> {selectedFile?.name}</p>
        </div>
        <DialogFooter>
          <div className="flex w-full items-center gap-3 justify-between">
            <Button className="w-full" variant={'destructive'}>Cancel</Button>
            <Button className="w-full" onClick={handleUpload} disabled={!selectedFile}>Upload</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
