import React, { Fragment, useContext, useEffect, useState } from "react";
import strings from "../../localization";
import CustomTable from "../../Components/CustomTable";
import { deleteUser, getAllUsers, getUser, registration, updateUser } from "../../Services/UserService";
import LoaderContext from "../../Context/LoaderContext"
import { useForm } from "react-hook-form";
import ValidationPatters from "../../Base/ValidationPatters";
import YesNoDialog, { YesNoDialogResult } from "../../Components/YesNoDialog";
import { useNavigate } from "react-router-dom";
import { getRoleName } from "../../Constants/Role";
import { getUserTypeName } from "../../Constants/UserType";
import { FilterDefaults } from "../../Util/FilterUtil";
import FullScreenModal from "../../Components/FullScreenModal";
import EditUserForm from "../../Components/Forms/User/EditUserForm";
import AddUserForm from "../../Components/Forms/User/AddUserForm";

const formRules = {
  'name': { required: true },
  'surname': { required: true },
  'email': {required: { value: true, message: strings.forms.common.thisFieldIsRequired},
        pattern: { value: ValidationPatters.EMAIL, message: strings.forms.common.emailFormatError }},
  'username': { required: true },
  'password': { required: true }
}

const tableDescription = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: strings.base.profile.name, width: 130 },
  { field: 'surname', headerName: strings.base.profile.surname, width: 130 },
  { field: 'username', headerName: strings.base.profile.username, width: 130 },
  { field: 'email', headerName: strings.base.profile.email, width: 130 },
  {
    field: 'role',
    headerName: strings.base.profile.role,
    width: 160,
    valueGetter: (params) => getRoleName(params.row.role)
  },
  {
    field: 'userType',
    headerName: strings.base.profile.userType,
    width: 160,
    valueGetter: (params) => getUserTypeName(params.row.userType)
  },
]

const BoardAdmin = () => {

  const {setLoading} = useContext(LoaderContext)
  const navigate = useNavigate()

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [total, setTotal] = useState(0);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState(FilterDefaults);

  const form = useForm();
  const { data, handleSubmit, getValues, setValue, setError, formState: { errors } } = form;

  useEffect(() => {
    fetchAllUsers();
}, [filter]);

  const fetchAllUsers = () => {
      setLoading(true);
      getAllUsers({...filter}).then(response => {
          setUsers(response?.data?.items)
          setTotal(response?.data?.total)
      }).finally(() => setLoading(false));
  }

  const handleEditUser = (user) => {
    getUser({id: user?.id}).then(response => {
      if(response && response?.data) {
        Object.keys(response.data).forEach(key => {
          setValue(key, response.data[key]);
        });
        setShowEditModal(true);
      }
    });
  }

  const onAddSubmit = (data) => {
    setLoading(true);
    registration(data).then(response => {
      if(response.status !== 200) {
        setLoading(false);
        return setErrorMessage(response?.data?.message)
      }
      handleCloseAddEditUserModal()
      fetchAllUsers()
    });
  }

  const onEditSubmit = (data) => {
    setLoading(true);
    updateUser(data).then(response => {
      if(response.status !== 200) {
        setLoading(false);
        return setErrorMessage(response?.data?.message)
      }
      handleCloseAddEditUserModal()
      fetchAllUsers()
    });
  }

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  }

  const handleDeleteDialogResult = (result) => {

    if (result === YesNoDialogResult.NO || result === YesNoDialogResult.CANCEL) {
        handleCloseDeleteUserDialog();
        return;
    }

    setLoading(true);

    deleteUser(selectedUser?.id).then(() => {
      handleCloseDeleteUserDialog();
      fetchAllUsers();
    });
  }

  const handleCloseDeleteUserDialog = () => {
    setShowDeleteDialog(false);
    setSelectedUser(null);
  }

  const handleCloseAddEditUserModal = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    form.reset();
  }

  const handleSelectAddUser = () => {
    form.reset(); 
    setShowAddModal(true);
  }

  return (
    <Fragment>

      <div className="main-container" style={{width: 'fit-content'}}>
        <h2>{strings.pages.boardAdmin.title}</h2>
        <CustomTable 
          tableDescription={tableDescription} 
          data={users} 
          onEdit={handleEditUser} 
          onDelete={handleDeleteUser} 
          onRowDoubleClick={(user) => navigate(`/profile/${user?.id}`)}
          filter={filter}
          setFilter={setFilter}
          total={total}
          onReload={fetchAllUsers}
          onAdd={handleSelectAddUser}
        />
      </div>
      
      <FullScreenModal open={showEditModal} onClose={handleCloseAddEditUserModal} title={strings.forms.editUser.title}>
        <EditUserForm
            formRules={formRules}
            values={getValues()}
            setValue={setValue}
            errors={errors} data={data} form={form}
            onSubmit={handleSubmit(onEditSubmit)} />
          { errorMessage && <p className="error" style={{textAlign: 'center'}}>{errorMessage}</p> }
      </FullScreenModal>

      <FullScreenModal open={showAddModal} onClose={handleCloseAddEditUserModal} title={strings.forms.addUser.title}>
        <AddUserForm
            formRules={formRules}
            values={getValues()}
            setValue={setValue}
            errors={errors} data={data} form={form}
            onSubmit={handleSubmit(onAddSubmit)} />
      </FullScreenModal>


      <YesNoDialog show={showDeleteDialog} handleResult={handleDeleteDialogResult}/>
    </Fragment>
  );
};

export default BoardAdmin;
