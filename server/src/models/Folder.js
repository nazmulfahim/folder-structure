import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FolderSchema = new Schema({
  parentFolderID: {
    type: mongoose.Types.ObjectId,
    ref: "Folder",
    required: function () {
      return !this.isRoot;
    },
  },
  name: { type: String, required: true, trim: true, escape: true },
  isRoot: { type: Boolean },
});

module.exports = mongoose.model("Folder", FolderSchema);
