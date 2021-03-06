// import React, { useState, useEffect } from "react";

// import { Redirect, useHistory } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";

// import gql from "graphql-tag";
// import { useMutation } from "@apollo/react-hooks";
// import Loader from "react-loader-spinner";
// //import { Dropdown, Form } from 'react-bootstrap'

// //dropdown
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";

// import { withStyles } from "@material-ui/core/styles";
// import InputBase from "@material-ui/core/InputBase";

// import {
//   ModalText,
//   SignUpForm,
//   FormTitle,
//   FormButton,
//   FormButton2,
//   FormInputs,
//   SignUpContainer,
//   SignUpText,
//   ContentContainer,
//   SignUpInfo,
//   SignUpPage,
//   SignUpInputsDropDown,
//   SignUpInputs,
//   DropDownOption,
//   DropDownLabel,
//   FormTitle2,
//   CloseButton,
//   SignUpClose,
//   UserType,
//   InputTitle,
//   SignUpRequiredInputs,
//   RequiredInputTitle,
//   ModalTextBottom
// } from "../styledComponents/Index";

// const Styles = withStyles(theme => ({
//   root: {
//     "label + &": {
//       marginTop: theme.spacing(3)
//     }
//   },
//   input: {
//     position: "relative",
//     backgroundColor: "none",
//     color: "white",
//     border: "2px solid white",
//     fontSize: 18,
//     width: 200,
//     padding: "14px 20px 14px 8px",
//     transition: theme.transitions.create(["border-color", "box-shadow"]),
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"'
//     ].join(","),
//     "&:focus": {
//       borderRadius: 4,
//       borderColor: "white",
//       boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
//     }
//   }
// }))(InputBase);

// const useStyles = makeStyles(theme => ({
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   paper: {
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//     display: "flex"
//   }
// }));

// const initialState = {
//   email: "",
//   password: "",
//   organization: "",
//   job_position: "",
//   country: "",
//   organization_type: "",
//   tier: "",
//   interest: ""
// };

// //brought in from UsersQuery.js used to update apollo cache
// const Users_Query = gql`
//   query UsersQ {
//     allUsers: databankUsers {
//       id
//       email
//       interest
//       tier
//       organization
//       job_position
//       country
//       organization_type
//     }
//   }
// `;

// const REGISTER = gql`
//   mutation registerNewUser($newUser: newRegisterInput!) {
//     register(input: $newUser) {
//       id
//       email
//       password
//       tier
//       interest
//       organization
//       job_position
//       country
//       organization_type
//     }
//   }
// `;

// const ToolsCreateUser = () => {
//   const [addUser, setAddUser] = useState(initialState);
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   //createUser is f(x) to make user,
//   //newUser includes {data, loading, error}
//   const [createUser, newUser] = useMutation(REGISTER, {
//     update(cache, { data: { register } }) {
//       const data = cache.readQuery({ query: Users_Query });
//       cache.writeQuery({
//         query: Users_Query,
//         data: { allUsers: [...data.allUsers, register] }
//       });
//     }
//   });
//   //destructed and used as field values
//   const {
//     email,
//     password,
//     organization,
//     job_position,
//     country,
//     organization_type,
//     tier,
//     interest
//   } = addUser;

//   const handleChange = event => {
//     setAddUser({ ...addUser, [event.target.name]: event.target.value });
//   };

//   //on submit add operator
//   //createUser has a property called variables
//   // input is an object with our variables
//   //use newUser from REGISTER
//   //onSubmit make sure to pass event and input
//   const handleSubmit = (event, input) => {
//     event.preventDefault();
//     createUser({
//       variables: { newUser: input }
//     });
//     handleClose();
//   };

//   if (newUser.loading) {
//     return (
//       <div className="loader-container">
//         <Loader
//           className="loader"
//           type="Oval"
//           color="#708090"
//           width={100}
//           timeout={12000}
//         />
//       </div>
//     );
//   }

//   if (newUser.error) {
//     return <p>ERROR!</p>;
//   }

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const role = [
//     {
//       value: "",
//       label: "Please Select"
//     },
//     {
//       value: "super_user",
//       label: "Super User"
//     },
//     {
//       value: "org_user",
//       label: "Organizationl User"
//     },
//     {
//       value: "operator",
//       label: "operator"
//     }
//   ];

//   return (
//     <>
//       <button className="button" type="button" onClick={handleOpen}>
//         ++Account
//       </button>

//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         className={classes.modal}
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500
//         }}
//       >
//         <Fade in={open}>
//           <div className={classes.paper}>
//             <div className="col1">
//               <h2>
//                 <label for="Name">Email</label>
//                 <br></br>
//                 <input
//                   type="text"
//                   id="email"
//                   placeholder="Email"
//                   name="email"
//                   value={email}
//                   onChange={handleChange}
//                 />
//               </h2>

//               <h2>
//                 <label for="Name">Password</label>
//                 <br></br>
//                 <input
//                   type="text"
//                   id="password"
//                   placeholder="password"
//                   name="password"
//                   value={password}
//                   onChange={handleChange}
//                 />
//               </h2>

//               {/* <br></br>
//               <Dropdown.Toggle variant='success' id='dropdown-basic'>
//                 Role
//               </Dropdown.Toggle>
//               <br></br>
//               <Form.Control
//                 as='select'
//                 name='role'
//                 value={role}
//                 onChange={handleChange}
//               >
//                 {role.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </Form.Control> */}
//               <br></br>
//               <h2>
//                 <label for="Organization">Organization</label>
//                 <br></br>
//                 <input
//                   type="text"
//                   name="organization"
//                   id="organization"
//                   placeholder="organization"
//                   value={organization}
//                   onChange={handleChange}
//                 />
//               </h2>

//               <h2>
//                 <label for="job_position">job_position</label>
//                 <br></br>
//                 <input
//                   type="job_position"
//                   name="job_position"
//                   id="job_position"
//                   placeholder="job_position"
//                   value={job_position}
//                   onChange={handleChange}
//                 />
//               </h2>
//             </div>
//             <div className="col2">
//               {/* <h2>
//                 <label for="Organization_type">Organiztion Type</label>
//                 <br></br>
//                 <input
//                   type="string"
//                   name="organization_type"
//                   id="organization_type"
//                   placeholder=""
//                   value={organization_type}
//                   onChange={handleChange}
//                 />
//               </h2> */}
//               <h2>* Select Your Organization Type</h2>
//               <FormControl className={classes.margin}>
//                 <InputTitle id="organization_type">
//                   * Select Your Organization Type
//                 </InputTitle>
//                 <Select
//                   labelId="organization_type"
//                   id="organization_type"
//                   name="organization_type"
//                   value={organization_type}
//                   onChange={handleChange}
//                   input={<Styles />}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   <MenuItem value={"RESEARCH"}>RESEARCH</MenuItem>
//                   <MenuItem value={"GOVERNMENT"}>GOVERNMENT</MenuItem>
//                   <MenuItem value={"NGO"}>NGO</MenuItem>
//                   <MenuItem value={"OTHER"}>OTHER</MenuItem>
//                 </Select>
//               </FormControl>
//               <h2>
//                 <label for="country">country</label>
//                 <br></br>
//                 <input
//                   type="country"
//                   name="country"
//                   id="country"
//                   placeholder="country"
//                   value={country}
//                   onChange={handleChange}
//                 />
//               </h2>
//               {/* <h2>
//                 <label for="tier">tier</label>
//                 <br></br>
//                 <input
//                   type="tier"
//                   name="tier"
//                   id="tier"
//                   placeholder="tier"
//                   value={tier}
//                   onChange={handleChange}
//                 />
//               </h2> */}
//               <h2>* Select User Type</h2>
//               <FormControl className={classes.margin}>
//                 <InputTitle id="User type"></InputTitle>
//                 <Select
//                   labelId="User type"
//                   id="tier"
//                   value={tier}
//                   name="tier"
//                   onChange={handleChange}
//                   input={<Styles />}
//                   placeholder="tier"
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   <MenuItem value={"FREE"}>FREE</MenuItem>
//                   <MenuItem value={"PAID"}>PAID</MenuItem>
//                   <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
//                   <MenuItem value={"PAID"}>SPECIAL</MenuItem>
//                 </Select>
//               </FormControl>
//               <h2>
//                 <label for="interest">interest</label>
//                 <br></br>
//                 <input
//                   type="interest"
//                   name="interest"
//                   id="interest"
//                   placeholder="interest"
//                   value={interest}
//                   onChange={handleChange}
//                 />
//               </h2>
//               <br></br>

//               <br></br>
//               <br></br>

//               <h2>
//                 <div className="CreateAccount">
//                   <button type="Submit" onClick={e => handleSubmit(e, addUser)}>
//                     Create addUser
//                   </button>
//                 </div>
//               </h2>
//               <br></br>
//               <footer>
//                 <button variant="secondary" onClick={handleClose}>
//                   Cancel
//                 </button>
//               </footer>
//             </div>
//           </div>
//         </Fade>
//       </Modal>
//     </>
//   );
// };
// export default ToolsCreateUser;
