"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Fab,
  IconButton,
  ListItem,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
  styled,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import Message, { MessageType } from "@/components/Message";
import * as Utils from "@/utils/utils.js";

const backendAddr = "http://localhost:3000";

const ElevationScroll = ({
  children,
}: {
  children: React.ReactElement<any>;
}) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
};

import { messages as msgs } from "@/app/data/Dummy";

const Page = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [messages, setMessages] = useState(msgs);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSendMessage = () => {
    let text = "";
    scrollToBottom();
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, identity: "User" }]);
      text = inputValue;
      setInputValue("");
    }
    scrollToBottom();
    Utils.post(backendAddr + "/api/ask", { text: text })
      .then((res) => {
        console.log(`RECEIVED res: ${res}`);
        console.log(res);
        
        setMessages([...messages, { text: res.ans, identity: "AI"}]);
      }).catch((err) => {
        setMessages([...messages, { text: `\`\`\`txt\n${err}\n\`\`\``, identity: "AI"}]);
      });
    scrollToBottom();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: { key: string; ctrlKey: any; }) => {
    if (event.key === "Enter" && event.ctrlKey) {
      handleSendMessage();
    }
  };

  const bottomOfMessages = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    bottomOfMessages.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              AI Navigator
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
        <Toolbar variant="dense" />

        <Container maxWidth="sm" disableGutters sx={{ background: "url('/mount.jpg')" }}>
          <Paper square elevation={4}>
          <Stack margin={1}>
            {messages.map((msg, index) => (
              <ListItem
                key={index}
                disableGutters
                sx={{
                  justifyContent:
                    msg.identity === "User" ? "flex-end" : "flex-start",
                }}
              >
                <Message text={msg.text} identity={msg.identity} />
              </ListItem>
            ))}
          </Stack>
          <Box ref={bottomOfMessages}>
            <Toolbar />
          </Box>
          <AppBar
            position="fixed"
            color="transparent"
            sx={{ top: "auto", bottom: 0 }}
          >
        <Container maxWidth="sm" disableGutters>
            <Box
              component="form"
              display="flex"
              alignItems="center"
              margin={1}
              gap={1}
            >
              <TextField
                variant="outlined"
                fullWidth
                multiline
                maxRows={4}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="请输入关于线性代数的问题……"
              />
              <Fab
                color="secondary"
                onClick={handleSendMessage}
                size="large"
                sx={{ flexShrink: 0 }}
              >
                <SendIcon />
              </Fab>
            </Box>
            </Container>
          </AppBar>
          </Paper>
        </Container>

    </>
  );
};

export default Page;
