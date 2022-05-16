import * as React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../component/authConfig";
import  Button from "react-bootstrap/Button";


function handleLogin(instance :any,accounts:any) {
    instance.loginPopup(loginRequest).catch((e :any)  => {
        console.error(e);
    });
}

const MainContent = () => {
    const { instance , accounts } = useMsal();
    handleLogin(instance , accounts);
    return (
        <div className="App">
  
            <AuthenticatedTemplate>
                 <> Hi </>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
            {/* <Button variant="secondary" className="ml-auto" onClick={() => handleLogin(instance,accounts)}>Sign in using Popup</Button> */}
            </UnauthenticatedTemplate>
        </div>
    );
  };


function userInstance ()  {

}

function renderInstance(){

}

export class TestAPI extends React.Component<{}, any> {
    constructor(props:any) {
        super(props)
    }

    render(){
        return(
            <MainContent />
        )
    }
}

export interface userInstanceAccount {
    instance : any,
    accounts : any
}