import Folder from "../../models/Folder";

const Query = {
  async getRootFolder(parent, args, { request }, info) {
    return await Folder.findOne({ isRoot: true }).lean();
  },
  async getFolders(parent, { parentFolderID }, { request }, info) {
    return await Folder.find({ parentFolderID }).lean();
  },
};

export default Query;
