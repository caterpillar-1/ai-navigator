"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Fab,
  IconButton,
  ListItem,
  ListItemAvatar,
  Paper,
  Skeleton,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  styled,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import Message, { MessageType } from "@/components/Message";
import * as Utils from "@/utils/utils.js";

import { useLocalStorage } from "@reactuses/core";

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

  const [storage, setStorage] = useLocalStorage("messages", "[]");

  const [messages, setMessages] =
    useState<({ text: string; identity: MessageType } | undefined)[]>(msgs);

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(storage ? JSON.parse(storage) : []);
  }, [storage]);

  const saveMessages = (newMessages: ({ text: string; identity: MessageType; } | null | undefined)[]) => {
    setStorage(JSON.stringify(newMessages));
    console.log("Save: ");
    console.log(JSON.stringify(newMessages));
  }

  const handleSendMessage = () => {
    let text = "";
    let newMessages = [...messages];
    if (inputValue.trim()) {
      newMessages.push({ text: inputValue, identity: "User" });
      setMessages([...newMessages, undefined ]);
      saveMessages([...newMessages]);
      text = inputValue;
      setInputValue("");
    }
    Utils.post(backendAddr + "/api/ask", { text: text })
      .then((res) => {
        newMessages.push({
          text: (res.ans as string).replace("\\(", "$").replace("\\)", "$").replace("\\[", "\n$$\n").replace("\\]", "\n$$\n"),
          identity: "AI" as MessageType,
        });
        saveMessages([...newMessages]);
      })
      .catch((err) => {
        newMessages.push({
          text: `\`\`\`txt\n${err}\n\`\`\``,
          identity: "AI" as MessageType,
        });
        saveMessages([...newMessages]);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: { key: string; ctrlKey: any }) => {
    if (event.key === "Enter" && event.ctrlKey) {
      handleSendMessage();
    }
  };

  const bottomOfMessages = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    bottomOfMessages.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

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

      <Container
        maxWidth="sm"
        disableGutters
        sx={{ background: "url('/mount.jpg')" }}
      >
        <Paper square elevation={4}>
          <Stack margin={1}>
            {messages.map((msg, index) =>
              msg ? (
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
              ) : (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Skeleton variant="circular" width={40} height={40} />
                  </ListItemAvatar>
                  <Skeleton variant="rounded" width={512} height={80} />
                </ListItem>
              )
            )}
            <Box>
              <Box height={150}></Box>
              <Box ref={bottomOfMessages}></Box>
            </Box>
          </Stack>
          <ThemeProvider theme={sendBarTheme}>
          <AppBar
            color="primary"
            position="fixed"
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

          </ThemeProvider>
        </Paper>
      </Container>
    </>
  );
};

const sendBarTheme = createTheme({
  palette: {
    primary: {
      main: "#e3f2fd",
    },
    secondary: {
      main: "#3700B3",
    }
  }
});

export default Page;
