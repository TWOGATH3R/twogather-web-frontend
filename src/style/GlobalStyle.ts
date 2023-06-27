import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        overflow-x: hidden;
        #root{
            position: relative;
        }
    }
    p {
        margin:0;
        padding:0;
    }
    h1 {
        margin:0;
        padding:0;
    }
    button{
        margin:0;
        padding:0;
    }
    a{
        text-decoration: none;
    }
    ul{
        margin:0;
        padding:0;
    }
`;

export default GlobalStyle;
