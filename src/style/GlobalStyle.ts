import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family:'SUIT-Regular' ;
        background-color: #0E0909;
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
`;

export default GlobalStyle;