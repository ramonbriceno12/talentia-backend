const multer = require('multer');
const { Upload } = require('@aws-sdk/lib-storage');
const { DeleteObjectCommand } = require("@aws-sdk/client-s3"); // ✅ Import here
const s3 = require('../config/s3');

const bucketName = 'talentiafilesprod';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 80 * 1024 * 1024 }, // 80 MB limit
});

const uploadToS3 = async (file, folder) => {
    const uploadParams = {
        Bucket: bucketName,
        Key: `${folder}/${Date.now().toString()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read',
    };

    const parallelUploads3 = new Upload({
        client: s3,
        params: uploadParams,
    });

    try {
        const result = await parallelUploads3.done();
        return result.Location;
    } catch (error) {
        console.error('S3 Upload Error:', error);
        throw new Error('Failed to upload to S3. Check bucket permissions, file size, and region.');
    }
};

const deleteFromS3 = async (fileUrl, folder = "avatars") => {
    if (!fileUrl) return;

    // Extract file name from URL
    const fileName = fileUrl.split("/").pop();
    const params = {
        Bucket: bucketName,
        Key: `${folder}/${fileName}`,
    };

    try {
        await s3.send(new DeleteObjectCommand(params));
        console.log(`✅ Deleted old file from S3: ${fileName}`);
    } catch (err) {
        console.error("❌ Error deleting old file from S3:", err);
        throw new Error("Failed to delete file from S3.");
    }
};

module.exports = { upload, uploadToS3, deleteFromS3 };
