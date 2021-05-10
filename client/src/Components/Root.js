import React from "react";

import Folder from "./Folder";

import gql from "../Utils/gql";
import fetchApi from "../Utils/fetchApi";

const Root = () => {
  const [rootFolder, setRootFolder] = React.useState(null);

  //Gets the root folder
  const fetchRootFolders = async () => {
    const query = {
      query: gql`
        query getRootFolderQuery {
          getRootFolder {
            name
            _id
          }
        }
      `,
    };
    const res = await fetchApi(query);
    if (res.data) {
      setRootFolder(res.data.getRootFolder);
    }
  };
  React.useEffect(() => {
    fetchRootFolders();
  }, []);
  return rootFolder && <Folder folder={rootFolder} openFolder={true} />;
};

export default Root;
