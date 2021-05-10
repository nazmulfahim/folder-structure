import Folder from "../../models/Folder";
import isEmpty from "../../utils/isEmpty";

// Creating Root Folder
// async function InsertDocuments() {
//   const res = await new Folder({
//     name: "Root",
//     isRoot: true,
//   }).save();
//   console.log(res);
// }
// InsertDocuments();

const Mutation = {
  //Admin Mutations
  async createFolder(parent, { data }, { request }, info) {
    if (isEmpty(data.name)) throw new Error("NameCan't be empty");
    if (isEmpty(data.parentFolderID))
      throw new Error("Techincal Issue! Please Inform Admin");
    return await new Folder(data).save();
  },
  async updateFolder(parent, { data }, { request }, info) {
    if (isEmpty(data.name)) throw new Error("Name Cannot Be Empty");
    await Folder.findByIdAndUpdate(
      data._id,
      {
        name: data.name,
      },
      { new: true }
    );
    return true;
  },
  async deleteFolder(parent, { id }, { request }, info) {
    const folder = await Folder.findById(id);
    if (folder.isRoot) throw new Error("Root Folder Cannot be Deleted");
    await folder.remove();
    return true;
  },
};

export default Mutation;
