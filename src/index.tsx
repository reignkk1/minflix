import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// File
import { theme } from "./theme";
import App from "./App";

// ======================================================================================================

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	box-sizing:border-box;
	

}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	background-color:${(props) => props.theme.black.darker};
	color:${(props) => props.theme.white.darker};
	overflow-x:hidden;
	&::-webkit-scrollbar{
		width:8px;
	}
	&::-webkit-scrollbar-thumb{
		background-color:#e9e8e873;
		border-radius:15px;
		
	}
}
ol, ul{
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
	text-decoration:none;
}
`;

const client = new QueryClient();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
