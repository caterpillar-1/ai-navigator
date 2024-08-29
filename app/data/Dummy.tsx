import { MessageType } from "@/components/Message";

export const messages: { text: string; identity: MessageType }[] = [
      {
        text: `
  # Heading 1
  
  $$
  \\left[\\begin{array}{c|c:c}
  a & b & c\\\\
  \\hline c & d & e\\\\
  \\hdashline 1 & 2 & 3
  \\end{array}\\right]
  $$
  
  + unordered list
      + li
      + li
  + li
      + li
  
  1. ordered list
      1. li
  1. li
      1. li
  
  
  - [ ] Task 1
      - [X] Task 2
  
  
  \`\`\`cpp
  class CacheTx : public Tx {
  protected:
      template <typename T>
      using set = std::unordered_set<T>;
  public:
      virtual void push(VTOP *dut) = 0;
      virtual void pull(VTOP *dut) = 0;
      virtual bool check(Ram *ram);
      virtual bool hit();
  };
  \`\`\`
  
  Inline code: \`/usr/lib\`
  
  This is inline math: $E = mc^2$;
  
  This is display math:
  $$
  \\nabla \\cdot \\mathbf{D} =\\rho \\ \\mathrm{and} \\ \\nabla \\cdot \\mathbf{B} =0\\
  \\nabla \\times \\mathbf{E} =-\\frac{\\partial \\mathbf{B}}{\\partial t} \\ \\mathrm{and} \\ \\nabla \\times \\mathbf{H} =\\mathbf{J} +\\frac{\\partial \\mathbf{D}}{\\partial t}
  $$
  
  Just a link: www.baidu.com
  
  Disable embbed Html: <button>Button</button>
  `,
        identity: "AI",
      },
      {
        text: `
    Hello, world!
  `,
        identity: "AI",
      },
      {
        text: `
  要让 \`Box\` 元素占满其容器的宽度，可以使用 Material UI 提供的 \`width\` 属性并将其设置为 \`100%\`。这样 \`Box\` 元素将会占满其父容器的全部宽度。
  
  我们来修改一下 \`ChatMessage\` 组件，使其中的 \`Box\` 元素占满其容器的宽度。
  
  #### \`components/ChatMessage.tsx\`
  
  \`\`\`tsx
  import React from 'react';
  import { Box, Avatar, Typography } from '@mui/material';
  
  interface ChatMessageProps {
    avatarUrl: string;
    message: string;
    username: string;
  }
  
  const ChatMessage: React.FC<ChatMessageProps> = ({ avatarUrl, message, username }) => {
    return (
      <Box display="flex" alignItems="flex-start" mb={2} width="100%">
        <Avatar alt={username} src={avatarUrl} />
        <Box ml={2} bgcolor="primary.light" color="primary.contrastText" p={2} borderRadius={1} maxWidth="80%" width="100%">
          <Typography variant="body1">{message}</Typography>
        </Box>
      </Box>
    );
  };
  
  export default ChatMessage;
  \`\`\`
  
  在这个修改后的版本中，我们在外层的 \`Box\` 元素中添加了 \`width="100%"\`，确保它占满了父容器的宽度。
  
  ### 使用 \`ChatMessage\` 组件
  
  我们在 \`pages/index.tsx\` 中使用 \`ChatMessage\` 组件来展示聊天信息。
  
  #### \`pages/index.tsx\`
  
  \`\`\`tsx
  import React from 'react';
  import { Container, Box } from '@mui/material';
  import ChatMessage from '../components/ChatMessage';
  
  const messages = [
    {
      id: 1,
      avatarUrl: 'https://example.com/avatar1.png',
      message: 'Hello, how are you?',
      username: 'User1',
    },
    {
      id: 2,
      avatarUrl: 'https://example.com/avatar2.png',
      message: 'I am fine, thank you!',
      username: 'User2',
    },
  ];
  
  const ChatPage: React.FC = () => {
    return (
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" mt={4}>
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              avatarUrl={msg.avatarUrl}
              message={msg.message}
              username={msg.username}
            />
          ))}
        </Box>
      </Container>
    );
  };
  
  export default ChatPage;
  \`\`\`
  
  ### 解释
  
  在 \`ChatMessage\` 组件中，我们添加了 \`width="100%"\` 到外层的 \`Box\` 元素，确保它占满了父容器的宽度。这样，消息内容的 \`Box\` 元素也会根据其内容和父容器的宽度进行调整。
  
  ### 运行项目
  
  运行以下命令来启动你的项目：
  
  \`\`\`bash
  npm run dev
  \`\`\`
  
  打开浏览器并访问 \`http://localhost:3000\`，你将看到一个聊天界面，显示了带有用户头像和消息内容的聊天信息，并且消息内容的 \`Box\` 元素占满了其容器的宽度。
        `,
        identity: "AI",
      },
  {
    text: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur iaculis neque, vitae convallis dui dictum vitae. Phasellus finibus venenatis quam id ornare. Integer varius posuere eros a euismod. Quisque eget urna ut lorem gravida auctor at sed ex. Ut et ipsum eu odio accumsan suscipit. Aliquam varius, nisl in molestie suscipit, elit justo volutpat purus, quis interdum tortor turpis quis diam. Fusce eros eros, faucibus id tempus eu, dignissim dapibus turpis.

Aenean egestas, massa sit amet blandit eleifend, arcu ex auctor neque, eget consectetur urna enim vitae ex. Suspendisse quis lobortis nisl. Integer fermentum sit amet nunc eu dignissim. Maecenas rutrum tempor condimentum. Etiam molestie velit eu arcu elementum eleifend. Donec consectetur aliquet eros, et convallis neque luctus nec. Donec non eleifend ante. Phasellus sodales justo scelerisque, commodo felis vel, posuere est. Aenean tincidunt malesuada sapien, non dapibus leo posuere nec. Quisque venenatis rhoncus tellus eget mollis. Vestibulum vestibulum imperdiet lacus, vel pretium risus pharetra non. Phasellus id elit posuere, ultricies risus nec, efficitur diam. Pellentesque sagittis leo nisi, eget dapibus neque sagittis vel. In lobortis sollicitudin eros. Nulla rutrum mi vel ipsum interdum, at suscipit nisi finibus. Aenean pretium lectus quis nisi porta, placerat mollis nisi blandit.

Donec eu dapibus massa. In erat nisl, lacinia nec eleifend vitae, euismod sed mauris. Sed pulvinar ultrices fermentum. Pellentesque sed pharetra enim. Morbi pellentesque commodo tincidunt. Vivamus scelerisque metus pulvinar risus tincidunt, in consectetur arcu vulputate. Pellentesque massa mauris, mollis eu tincidunt nec, imperdiet quis ex. Nam euismod erat mauris, sit amet dapibus lectus malesuada sed. Curabitur pharetra nisi feugiat, placerat neque vel, maximus libero. Quisque id posuere ipsum, tempus euismod felis. Aenean dapibus in libero vitae eleifend. Nunc a elementum sapien. Nunc consequat tellus ex, blandit aliquet mauris aliquam vitae. Sed cursus dapibus purus nec vehicula.

Etiam luctus rhoncus urna, nec suscipit purus aliquam in. Nulla in risus ornare, rutrum lorem nec, elementum metus. Nulla quis nisi non leo fermentum tincidunt pharetra hendrerit lacus. Nullam posuere hendrerit rutrum. Quisque hendrerit nibh vel tellus suscipit mollis. Praesent vel convallis felis, ac fermentum mauris. Morbi nisi diam, ullamcorper a mi nec, aliquet sodales ante. Suspendisse tincidunt quam ut tellus pretium, eu viverra nisi dictum. Nunc mattis suscipit velit eget posuere. Nullam molestie vulputate sodales. Praesent finibus lacus ligula, id eleifend justo mattis eu. Sed egestas augue nec venenatis sagittis. Nam id sollicitudin orci. Sed condimentum sem vitae iaculis consectetur. Curabitur tristique vel justo vitae feugiat.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed porttitor magna vel magna mollis elementum. In sit amet ullamcorper tellus. Sed ullamcorper odio vitae nibh scelerisque commodo. Praesent eleifend sed dui nec congue. Vestibulum nisl tortor, aliquam ut odio sit amet, auctor cursus nisi. Donec quis enim fermentum, ultrices velit quis, blandit est. Nunc ut felis volutpat, ullamcorper arcu nec, porta tellus. Sed imperdiet magna vel justo mollis pulvinar. Quisque purus elit, feugiat id ex eu, convallis congue sem. Duis quis suscipit erat. Integer pharetra tellus eget sem finibus luctus. Quisque sed nulla nec mauris faucibus congue. Duis maximus suscipit blandit. Pellentesque rhoncus, neque eu feugiat elementum, arcu nunc molestie ligula, ac ultrices nibh leo eget odio. `,
    identity: "AI",
  },
];
