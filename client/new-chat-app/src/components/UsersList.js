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

export default function AlignItemsList() {
    const [users, setUsers] = useState([]);
    const [userConect, setuserConect] = useState(null);

    const auth = JSON.parse(localStorage.getItem("auth"));

    const getUsers = async () => {
        try {
            const res = await axios.get("http://localhost:3300/user/gets");

            setUsers(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const socket = io("http://localhost:3300");
        socket.on("connect", () => {
            console.log(` ${auth.user.username} Connected to server`);

            socket.emit("connected", auth.user._id);

            socket.on("isconnected", (data) => {
                console.log(data);
            });
        });

        socket.on("userconnect", (count) => {
            setuserConect(count);
        });

        socket.on("userdeconnect", (count) => {
            setuserConect(count);
        });

        getUsers();

        return () => {
            socket.disconnect();
        };
    }, [userConect]);

    const sendInvitation = async (id) => {
        const socket = io("http://localhost:3300");
        try {
            // const res = await axios.post(
            //     "http://localhost:3300/api/addInvitation",
            //     {
            //         sender: auth.user._id,
            //         receiver: id,
            //     }
            // );
            // console.log(res);

            socket.emit("sendInvitation", {
                sender: auth.user._id,
                receiver: id,
            });

            socket.on("getInvitationResponse", (response) => {
                console.log(response);
            });

            socket.on("getInvitation", (data) => {
                console.log(data);
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <List sx={{ width: "30%", bgcolor: "background.paper" }}>
            {users
                ? users.map((items) => (
                      <div
                          onClick={() => sendInvitation(items._id)}
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
                              <button>
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
