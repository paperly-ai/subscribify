import { documentUpload } from "@/api/fileUpload";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader, PlusCircle } from "lucide-react"
import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";

export function UploadDialog() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file.');
        return;
      }
      if (file.size > 1048576) {
        toast.error('File size exceeds the limit of 1 MB.');
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
    }
  };


  const handleUpload = async () => {
    if (selectedFile) {
      setLoading(true);
      try {
        const result = await documentUpload(selectedFile);
        if (!result) {
          setSelectedFile(null);
        }
        else {
          dialogClose();
        }
      } catch (error: any) {
        setError(error.message);

      } finally {
        setLoading(false);
        setSelectedFile(null);
        setFileName('');
      }
    }
  };


  const dialogClose = () => {
    setFileName("");
    setSelectedFile(null);
    setError(null);
    document.getElementById('closeDialog')?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full   border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
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

          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
              </div>
              <input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
            </label>
            <p className="text-sm">{fileName.length != 0 && fileName}</p>
            <p className="text-red-600 text-sm">{error && error}</p>
          </div>

        </div>
        <DialogFooter>
          <div className="flex w-full items-center gap-3 justify-between">
            <Button
              className="w-full"
              variant={"destructive"}
              onClick={dialogClose}
            >
              Cancel
            </Button>
            <DialogClose asChild>
              <button className="opacity-0" id="closeDialog"></button>
            </DialogClose>
            <Button className="w-full" onClick={handleUpload} disabled={!selectedFile}>{loading ? <Loader className='animate-spin' /> : 'Upload'} </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
