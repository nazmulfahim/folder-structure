import React from "react";
import style from "./styles/common.module.css";

import addIcon from "../Assets/add.png";
import removeIcon from "../Assets/remove.png";
import editIcon from "../Assets/editFolder.png";
import folderOpen from "../Assets/folderOpen.png";
import folderClose from "../Assets/folderClose.png";
import gql from "../Utils/gql";
import fetchApi from "../Utils/fetchApi";

import Modal from "./Modal";

//openFolder props is given to fetch Sub folders of Root folder when load
const Folder = ({ folder, openFolder }) => {
  //This variable decides if the folder is open or Not
  const [open, setOpen] = React.useState(openFolder);
  const [folderName, setFolderName] = React.useState(folder.name);
  //Every Folder inside this folder
  const [subFolders, setSubFolders] = React.useState([]);

  const onAdd = async () => {
    const query = {
      query: gql`
        mutation createFolderMutation(
          $name: String!
          $parentFolderID: String!
        ) {
          createFolder(data: { name: $name, parentFolderID: $parentFolderID }) {
            name
            _id
            parentFolderID
          }
        }
      `,
      variables: {
        name: folderName,
        parentFolderID: folder._id,
      },
    };
    const res = await fetchApi(query);
    if (res.data) {
      setSubFolders((s) => [...s, res.data.createFolder]);
    }
    return res;
  };

  const onRemove = async () => {
    const query = {
      query: gql`
        mutation deleteFolderMutation($id: String!) {
          deleteFolder(id: $id)
        }
      `,
      variables: {
        id: folder._id,
      },
    };
    await fetchApi(query);
    window.location.reload();
  };
  const onUpdate = async () => {
    const query = {
      query: gql`
        mutation updateFolderMutation($name: String!, $_id: String!) {
          updateFolder(data: { name: $name, _id: $_id })
        }
      `,
      variables: {
        name: folderName,
        _id: folder._id,
      },
    };
    const res = await fetchApi(query);
    if (res.data) {
      window.location.reload();
    }
    return res;
  };

  const DeleteFolder = (
    <>
      <p>Are You Sure You Want to delete {folder.name}</p>
    </>
  );
  const AddFolder = (
    <div>
      <label className={style.margin10}>Folder Name:</label>
      <input
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        className={`${style.margin10} ${style.input}`}
      ></input>
    </div>
  );
  //This will fetch All sub Folders
  const fetchSubFolders = async () => {
    const query = {
      query: gql`
        query getFoldersQuery($parentFolderID: String!) {
          getFolders(parentFolderID: $parentFolderID) {
            name
            _id
            parentFolderID
          }
        }
      `,
      variables: {
        parentFolderID: folder._id,
      },
    };
    const res = await fetchApi(query);
    if (res.data) {
      setSubFolders(res.data.getFolders);
    }
  };
  //Using that open variable we could only call the api when user wants to open the folder
  React.useEffect(() => {
    if (!open) {
      setSubFolders([]);
      return;
    }
    fetchSubFolders();
    // eslint-disable-next-line
  }, [open]);

  //Due to short time I couldn't provide enough comment
  return (
    <>
      <div className={style.flex}>
        <div
          className={`${style.flex} ${style.justifySpaceAround} ${style.folderSection}`}
        >
          <div onClick={() => setOpen((s) => !s)}>
            <img src={open ? folderOpen : folderClose} alt="Folder Icon" />
          </div>
          <div>{folder.name}</div>
          <Modal
            folder={folder}
            img={editIcon}
            alt="Folder Update Icon"
            ModalContent={AddFolder}
            action={onUpdate}
            actionName="Update"
          />
          <Modal
            folder={folder}
            img={removeIcon}
            alt="Folder Delete Icon"
            ModalContent={DeleteFolder}
            action={onRemove}
            actionName="Yes"
          />
          <Modal
            folder={folder}
            img={addIcon}
            alt="Folder Add Icon"
            action={onAdd}
            ModalContent={AddFolder}
            actionName="Create"
          />
        </div>
      </div>
      <div className={style.subFolders}>
        {subFolders.map((subFolder) => (
          <Folder folder={subFolder} openFolder={false} />
        ))}
      </div>
    </>
  );
};

export default Folder;
