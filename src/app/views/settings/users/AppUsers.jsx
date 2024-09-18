import { Box, Icon, IconButton, styled, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import { Breadcrumb, SimpleCard } from "app/components";
import CustomizedDialogs from "app/views/material-kit/dialog/CustomizedDialog";
import AppUserForm from "./AppUserForm";
import { useState } from "react";
import { Span } from "app/components/Typography";

// STYLED COMPONENT
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const userHeaders = ['Username', 'Email', 'Role', 'IsActive', 'IsDeletable'];

const userList = [
  {
    username: "john doe",
    email: "jd@gmail.com",
    role: 'Admin',
    isActive: true,
    isDeletable: false
  },
  {
    username: "john doe 1",
    email: "jd+1@gmail.com",
    role: 'Editor',
    isActive: true,
    isDeletable: false
  },
  {
    username: "john doe 2",
    email: "jd+2@gmail.com",
    role: 'Viewer',
    isActive: true,
    isDeletable: true
  },
];

const AppUsers = () => {
  
  const [addUserModal, setAddUserModal] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleUserSaveEvent = (data) => {
    setUserData(data); // Setting the data received from the child component
  };

  const saveUserData = () => {
    console.log(userData)
    setAddUserModal(false)
  }

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Settings", path: "/settings", redirect: false }, { name: "Users" }]}
        />
      </div>
      <Box display="flex" alignItems="center" justifyContent={'end'} marginBottom={'1rem'}>
        <Button variant="outlined" color="secondary" onClick={() => setAddUserModal(true)}>
          { 'Add User' }
        </Button>
        {addUserModal ? 
          <CustomizedDialogs title={'Add User'} 
            data={<AppUserForm data={handleUserSaveEvent} />} 
            onComplete={() => setAddUserModal(false)} 
            bottomButtons={
              <div>
                <Button onClick={() => setAddUserModal(false)} color="primary">
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>cancel</Span>
                </Button>
                <Button onClick={saveUserData} color="primary">
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>save changes</Span>
                </Button>
              </div>
            } /> : null }
      </Box>

      <SimpleCard>
        <PaginationTable headers={userHeaders} data={userList} actionButtons={true} />
      </SimpleCard>
    </Container>
  )
};

export default AppUsers;


function PaginationTable(props) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showComponent, setShowComponent] = useState(false);
  const [deleteUserFlag, setDeleteUserFlag] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleActionClickEvent = (user, type = null) => {
    if (type === 'edit') {
      setShowComponent(!showComponent);
    } else if (type === 'delete') {
      setDeleteUserFlag(!deleteUserFlag);
    }
    setSelectedUser(user);
  };

  const handleUserDeleteEvent = () => {
    setSelectedUser(null);
    setDeleteUserFlag(false);
  };

  const handleUserSaveEvent = (data) => {
    setSelectedUser(data); // Setting the data received from the child component
  };

  const saveUserData = () => {
    setShowComponent(false)
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            {props.headers.map((header, index) => (
              <TableCell key={index} align="center">{header}</TableCell>
            ))}
            {props.actionButtons && <TableCell align="right">Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.length ? props.data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((subscriber, index) => (
              <TableRow key={index}>
                {Object.keys(subscriber).map((sub, key) => (
                  <TableCell align="center" key={index}>
                    {typeof subscriber[sub] === 'boolean' 
                      ? subscriber[sub] ? 'True' : 'False' 
                      : Array.isArray(subscriber[sub]) ? subscriber[sub].join(", ") : subscriber[sub]}</TableCell>
                ))}
                {props.actionButtons &&
                <TableCell align="right">
                  <IconButton onClick={() => handleActionClickEvent(subscriber, "edit")}>
                    <Icon color="edit">edit</Icon>
                  </IconButton>
                  {subscriber.isDeletable ?
                    <IconButton onClick={() => handleActionClickEvent(subscriber, "delete")}>
                      <Icon color="error">close</Icon>
                    </IconButton> : null}
                </TableCell>
                }
              </TableRow>
            )) :
            <TableRow>
              <TableCell align="center" colSpan={6}>{'No Data Available'}</TableCell>
            </TableRow>
          }
        </TableBody>
      </StyledTable>
      {showComponent && (
        <CustomizedDialogs
          title={'Edit User'}
          data={
            <AppUserForm
              data={handleUserSaveEvent}
              edit={selectedUser}
            />}
          onComplete={setShowComponent}
          bottomButtons={
            <div>
              <Button onClick={() => setShowComponent(false)} color="primary">
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>cancel</Span>
              </Button>
              <Button onClick={saveUserData} color="primary">
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>update changes</Span>
              </Button>
            </div>
          }
        />)}
      {deleteUserFlag && (
        <CustomizedDialogs
          title={'Delete User: ' + selectedUser.username}
          data={<div>Are you sure you want to delete this user?</div>}
          onComplete={setDeleteUserFlag}
          bottomButtons={
            <div>
              <Button onClick={() => setDeleteUserFlag(false)} color="primary">
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>cancel</Span>
              </Button>
              <Button onClick={handleUserDeleteEvent} color="error">
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>delete</Span>
              </Button>
            </div>
          }
        />)}

      {props.data.length ? (<TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={props.data.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />) : null}
    </Box>
  );
}

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } }
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } }
  }
}));