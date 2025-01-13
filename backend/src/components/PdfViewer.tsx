
type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
      className="w-full lg:h-full h-[85vh]"
      loading="lazy"
    ></iframe>
  );
};

export default PDFViewer;
