import { UploadDialog } from '@/components/uploadDialog';

const DefaultChatScreen = () => {
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
      <div className='flex flex-col items-center justify-center gap-3'>
        <img src="/logo.png" height={100} width={100} alt="" />
        <p className="md:w-96 px-4 md:px-0 text-sm text-center">Upload a document or select uploaded documents to start querying </p>
        <UploadDialog />
      </div>
    </div>
  )
}

export default DefaultChatScreen
