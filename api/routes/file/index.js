import { upload } from "#file";
import { prisma } from "#prisma";
import { verifyAuth } from "#verifyAuth";

export const post = [
  verifyAuth(["owner", "manager"]),
  upload(),
  async (req, res) => {
    const file = req.dbfile;
    console.log(file);
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({
      message: "File uploaded successfully",
      url: file.location,
      id: file.id,
      originalName: file.originalname,
      size: parseSize(file.size),
    });
  },
];

const parseSize = (size) => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let unit = 0;

  while (size >= 1024) {
    size /= 1024;
    unit++;
  }

  return `${size.toFixed(2)} ${units[unit]}`;
};
