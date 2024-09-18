import { Box, Icon, IconButton, styled, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import { Breadcrumb, SimpleCard } from "app/components";
import CustomizedDialogs from "app/views/material-kit/dialog/CustomizedDialog";
import AppRoleForm from "./AppRoleForm";
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

const roleHeaders = ['Role', 'Role Level', 'IsActive', 'IsDeletable'];

const roleList = [
  {
    role: 'Super',
    roleLevel: 1,
    // modules: ['Manage Users', 'Manage Roles', 'Manage Documents', 'Manage FAQs', 'Manage Posts', 'Manage News', 'Manage Groups', 'Manage Videos', 'Manage Photos', 'Manage Tasks', 'Manage Quicklinks', 'Audio/Video Calls', 'Manage Courses', 'Manage Departments', 'Manage Locations', 'Access Scrum board', 'Manage Scrum board'],
    isActive: true,
    isDeletable: false
  },
  {
    role: 'Admin',
    roleLevel: 2,
    // modules: [],
    isActive: true,
    isDeletable: false
  },
  {
    role: 'Editor',
    roleLevel: 3,
    // modules: [],
    isActive: true,
    isDeletable: false
  },
  {
    role: 'Viewer',
    roleLevel: 4,
    // modules: [],
    isActive: true,
    isDeletable: true
  },
];

const AppRoles = () => {
  
  const [addRoleModal, setAddRoleModal] = useState(false);
  const [roleData, setRoleData] = useState(null);

  const handleRoleSaveEvent = (data) => {
    setRoleData(data); // Setting the data received from the child component
  };

  const saveRoleData = () => {
    console.log(roleData)
    setAddRoleModal(false)
  }

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: "Settings", path: "/settings", redirect: false }, { name: "Roles" }]}
        />
      </div>
      <Box display="flex" alignItems="center" justifyContent={'end'} marginBottom={'1rem'}>
        <Button variant="outlined" color="secondary" onClick={() => setAddRoleModal(true)}>
          { 'Add Role' }
        </Button>
        {addRoleModal ? 
          <CustomizedDialogs title={'Add Role'} 
            data={<AppRoleForm data={handleRoleSaveEvent} />} 
            onComplete={() => setAddRoleModal(false)} 
            bottomButtons={
              <div>
                <Button onClick={() => setAddRoleModal(false)} color="primary">
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>cancel</Span>
                </Button>
                <Button onClick={saveRoleData} color="primary">
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>save changes</Span>
                </Button>
              </div>
            } /> : null }
      </Box>

      <SimpleCard>
        <PaginationTable headers={roleHeaders} data={roleList} actionButtons={true} />
      </SimpleCard>
    </Container>
  )
};

export default AppRoles;

function PaginationTable(props) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showComponent, setShowComponent] = useState(false);
  const [deleteRoleFlag, setDeleteRoleFlag] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleActionClickEvent = (role, type = null) => {
    if (type === 'edit') {
      setShowComponent(!showComponent);
    } else if (type === 'delete') {
      setDeleteRoleFlag(!deleteRoleFlag);
    }
    setSelectedRole(role);
  };

  const handleRoleDeleteEvent = () => {
    setSelectedRole(null);
    setDeleteRoleFlag(false);
  };

  const handleRoleSaveEvent = (data) => {
    setSelectedRole(data); // Setting the data received from the child component
  };

  const saveRoleData = () => {
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
          title={'Edit Role'}
          data={
            <AppRoleForm
              data={handleRoleSaveEvent}
              edit={selectedRole}
            />}
          onComplete={setShowComponent}
          bottomButtons={
            <div>
              <Button onClick={() => setShowComponent(false)} color="primary">
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>cancel</Span>
              </Button>
              <Button onClick={saveRoleData} color="primary">
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>update changes</Span>
              </Button>
            </div>
          }
        />)}
      {deleteRoleFlag && (
        <CustomizedDialogs
          title={'Delete Role: ' + selectedRole.role}
          data={<div>Are you sure you want to delete this role?</div>}
          onComplete={setDeleteRoleFlag}
          bottomButtons={
            <div>
              <Button onClick={() => setDeleteRoleFlag(false)} color="primary">
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>cancel</Span>
              </Button>
              <Button onClick={handleRoleDeleteEvent} color="error">
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