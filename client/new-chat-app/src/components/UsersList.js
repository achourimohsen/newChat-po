import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import axios from "axios";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import io from "socket.io-client";

export default function AlignItemsList({ socket }) {
    const [users, setUsers] = useState([]);
    const [userConect, setuserConect] = useState([]);
    const auth = JSON.parse(localStorage.getItem("auth"));

    const getUsers = async () => {
        try {
            const res = await axios.get("http://localhost:3300/user/gets");

            setUsers(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleNotification = (senderId, receirverId) => {
        socket.emit("sendNotifications", {
            senderId,
            receirverId,
        });
    };

    // const sendInvitation = async (id) => {
    //     try {
    //         socket.emit("sendInvitation", {
    //             sender: auth.user._id,
    //             receiver: id,
    //         });

    //         socket.on("getInvitationResponse", (response) => {
    //             console.log(response);
    //         });

    //         socket.on("getInvitation", (data) => {
    //             console.log(data);
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     socket.on("connect", () => {
    //         console.log(` ${auth.user.username} Connected to server`);

    //         socket.emit("connected", auth.user._id);

    //         socket.on("isconnected", (data) => {
    //             // console.log(data);
    //         });
    //     });

    //     socket.on("userconnect", (count) => {
    //         setuserConect(count);
    //     });

    //     socket.on("userdeconnect", (count) => {
    //         setuserConect(count);
    //     });

    //     getUsers();

    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);

    useEffect(() => {
        getUsers();

        const handleSocketConnect = () => {
            console.log(`${auth.user.username} Connected to server`);
            socket?.emit("connected", auth.user._id);
            socket?.on("isconnected", (data) => {
                // console.log(data);
            });
        };

        const handleUserConnect = (count) => {
            setuserConect(count);
        };

        const handleUserDeconnect = (count) => {
            setuserConect(count);
        };

        // socket?.on("connect", handleSocketConnect);
        // socket?.on("userconnect", handleUserConnect);
        // socket?.on("userdeconnect", handleUserDeconnect);

        return () => {
            socket?.disconnect();
        };
    }, []);

    useEffect(() => {
        socket?.on("isconnected", (data) => {
            setuserConect([...userConect, data]);
            console.log(data);
        });
        console.log("thama 7arka jdida");
        console.log(userConect);
    }, [userConect]);

    return (
        <List sx={{ width: "30%", bgcolor: "background.paper" }}>
            {users
                ? users.map((items) => (
                      <div
                          key={items._id}
                          style={{
                              display:
                                  items._id === auth.user._id ? "none" : "",
                          }}
                      >
                          <ListItem alignItems="flex-start">
                              <ListItemAvatar sx={{ position: "relative" }}>
                                  <Avatar
                                      alt="Remy Sharp"
                                      src="/static/images/avatar/1.jpg"
                                  />
                                  <div
                                      style={{
                                          display: items.isconnect
                                              ? ""
                                              : "none",
                                          width: "10px",
                                          height: "10px",
                                          background: "green",
                                          borderRadius: "50%",
                                          position: "absolute",
                                          right: "19px",
                                          bottom: "0px",
                                      }}
                                  ></div>
                              </ListItemAvatar>
                              <ListItemText
                                  primary={` ${
                                      items._id === auth.user._id ? "you" : ""
                                  } ${items.username}`}
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
                              <button
                                  onClick={() =>
                                      handleNotification(
                                          auth.user._id,
                                          items._id
                                      )
                                  }
                              >
                                  <PersonAddAlt1Icon />
                              </button>
                          </ListItem>
                          <Divider variant="inset" component="li" />
                      </div>
                  ))
                : null}
        </List>
    );
}
