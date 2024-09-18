import { useState } from "react";
import {
  Box,
  Icon,
  Table,
  styled,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TablePagination
} from "@mui/material";
import CustomizedDialogs from "../dialog/CustomizedDialog";
import AppUserForm from "app/views/settings/users/AppUserForm";
import Button from "@mui/material/Button";
import { Span } from "app/components/Typography";

// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } }
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } }
  }
}));

let subscribarList = [
  {
    name: "john doe",
    date: "18 january, 2019",
    amount: 1000,
    status: "close",
    company: "ABC Fintech LTD."
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD."
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD."
  },
  {
    name: "james cassegne",
    date: "8 january, 2019",
    amount: 5000,
    status: "close",
    company: "Collboy Tech LTD."
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD."
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD."
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD."
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD."
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD."
  }
];

export default function PaginationTable(props) {

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
        count={subscribarList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />) : null}
    </Box>
  );
}
