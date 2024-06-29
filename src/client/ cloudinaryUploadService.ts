// // cloudinaryUploadService.ts
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import { cloudinary } from '../config/config';

// class CloudinaryUploadService {
//   public upload: multer.Multer;

//   constructor() {
//     const storage = new CloudinaryStorage({
//       cloudinary: cloudinary,
//       params: {
//         folder: 'uploads',
//         allowedFormats: ['pdf', 'txt', 'docx'],
//         transformations: [{ width: 500, height: 500, crop: 'limit' }],
//       },
//     });

//     this.upload = multer({ storage });
//   }

//   public single(fieldName: string) {
//     return this.upload.single(fieldName);
//   }

//   public array(fieldName: string, maxCount: number) {
//     return this.upload.array(fieldName, maxCount);
//   }
// }

// export default CloudinaryUploadService;
