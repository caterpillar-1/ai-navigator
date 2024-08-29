import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "@/styles/katex.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as syntaxHighlightTheme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Avatar, Box, Paper, Stack } from "@mui/material";

export type MessageType = "User" | "AI";

const Message = ({
  text,
  identity,
}: {
  text: string;
  identity: MessageType;
}) => {
  const UserAvatar = <Avatar>{identity}</Avatar>;

  const MarkdownMessage = ({ text }: { text: string }) => {
    return (
      <Paper elevation={2}>
        <Box m={1} sx={{ textAlign: "justify" }}>
          <Markdown
            rehypePlugins={[rehypeKatex]}
            remarkPlugins={[remarkGfm, remarkMath]}
            // eslint-disable-next-line react/no-children-prop
            children={text}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <Box sx={{ display: "block", overflowX: "auto"}}>
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      // eslint-disable-next-line react/no-children-prop
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      style={syntaxHighlightTheme}
                      wrapLines
                      wrapLongLines
                      showLineNumbers
                    />
                  </Box>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </Box>
      </Paper>
    );
  };

  return (
    <Stack gap={1} flexDirection={(identity === "User") ? "row-reverse" : "row"}>
      <Avatar alt={identity}>{identity}</Avatar>
      <MarkdownMessage text={text} />
    </Stack>
  );
};

export default Message;
