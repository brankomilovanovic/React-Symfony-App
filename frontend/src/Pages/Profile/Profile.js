import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoleName } from "../../Constants/Role";
import { getUserTypeName } from "../../Constants/UserType";
import FileUpload from "../../Components/FileUpload";
import { ImageFormats, toBase64 } from "../../Util/ImageUtil";
import { getCurrentUser, getUser, updateUser } from "../../Services/UserService";
import strings from "../../localization";
import { useParams } from "react-router-dom";
import LoaderContext from "../../Context/LoaderContext";
import { Avatar } from "@mui/material";
import { setUser } from "../../Actions/AuthActions";

const Profile = () => {

  const {setLoading} = useContext(LoaderContext)
  const dispatch = useDispatch();

  const param = useParams();

  const [files, setFiles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
      fetchUser();
  }, [param]);

  const fetchUser = () => {
    setLoading(true);
    
    if(param?.id) {
      getUser({id: param?.id, extend: true}).then(response => {
        setCurrentUser(response?.data);
      }).finally(() => setLoading(false));
      return;
    }

    getCurrentUser({extend: true}).then(response => {
      setCurrentUser(response?.data);
    }).finally(() => setLoading(false));
  }

  const uploadProfileImage = async (files) => {
    const image = await toBase64(files[0]);
    if(image) {
      setLoading(true)
      setErrorMessage("");
      updateUser({id: currentUser?.id, profileImage: image}).then((response) => {
        if(response.status !== 200) {
          return setErrorMessage(response?.data?.message);
        }
        if(!param?.id) {
          dispatch(setUser(response?.data));
        }
        setCurrentUser(response?.data)
        setFiles([])
      }).finally(() => setLoading(false));
    }
  }

  return (
    <div className="profile-container">
      { currentUser?.id && <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <Avatar src={currentUser?.profileImage} className="profile-image"/>
        <div>{strings.base.profile.name} : {currentUser?.name}</div>
        <div>{strings.base.profile.surname} : {currentUser?.surname}</div>
        <div>{strings.base.profile.username} : {currentUser?.username}</div>
        <div>{strings.base.profile.email} : {currentUser?.email}</div>
        <div>{strings.base.profile.role} : {getRoleName(currentUser?.role)}</div>
        <div>{strings.base.profile.userType} : {getUserTypeName(currentUser?.userType)}</div>
        <FileUpload upload={ uploadProfileImage } formats={ImageFormats} files = {files} setFiles = {setFiles} />
      </div> }
      { errorMessage && <p className="error" style={{textAlign: 'center'}}>{errorMessage}</p> }
    </div>
  );
};

export default Profile;