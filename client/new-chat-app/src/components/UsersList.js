// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, Typography, Container, Grid } from "@mui/material";

// const UsersList = () => {
//

//
//     console.log(users.data);

//     return (
//         <Container sx={{ width: "100%" }}>
//             <Grid
//                 container
//                 spacing={3}
//                 sx={{ flexDirection: "column", width: "100%" }}
//             >
//                 {users.data
//                     ? users.data.map((user) => (
//                           <Grid
//                               item
//                               key={user.id}
//                               xs={12}
//                               sm={6}
//                               md={4}
//                               sx={{ width: "100%" }}
//                           >
//                               <Card sx={{ width: "100%" }}>
//                                   <CardContent>
//                                       <Typography variant="h5" component="div">
//                                           {user.username}
//                                       </Typography>
//                                       <Typography color="text.secondary">
//                                           {user.email}
//                                       </Typography>
//                                   </CardContent>
//                               </Card>
//                           </Grid>
//                       ))
//                     : null}
//             </Grid>
//         </Container>
//     );
// };

// export default UsersList;

import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function AlignItemsList() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const res = await axios.get("http://localhost:3300/user/gets");

            console.log(res.data.data);
            setUsers(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <List sx={{ width: "30%", bgcolor: "background.paper" }}>
            {users
                ? users.map((items) => (
                      <div>
                          <ListItem alignItems="flex-start">
                              <ListItemAvatar>
                                  <Avatar
                                      alt="Remy Sharp"
                                      src="/static/images/avatar/1.jpg"
                                  />
                              </ListItemAvatar>
                              <ListItemText
                                  primary={items.username}
                                  secondary={
                                      <React.Fragment>
                                          <Typography
                                              sx={{ display: "inline" }}
                                              component="span"
                                              variant="body2"
                                              color="text.primary"
                                          >
                                              Ali Connors
                                          </Typography>
                                          {
                                              " — I'll be in your neighborhood doing errands this…"
                                          }
                                      </React.Fragment>
                                  }
                              />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                      </div>
                  ))
                : null}
        </List>
    );
}
