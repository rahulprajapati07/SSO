import React  from 'react'; //, {useState}
import './App.css';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./component/authConfig";
//import  Button from "react-bootstrap/Button";
//import  DetailsListDemo  from './DataListDemo';
import WorkspaceDetails from './component/Workspace';
//import { promises } from 'fs';
import {canUserRestoreTeams}  from "../src/component/graph";
import * as microsoftTeams from "@microsoft/teams-js";
import { TestAPI } from './component/TestAPI';
//import UnAuthorizeduser from "../src/component/UnAuthorizedUser"

//import { ProfileContentBackendService } from './component/BackendService';
// import {canUserRestoreTeams} from './component/graph';


// let userIsAdmin = false;

let checkuserIsAdmin : any;

function handleLogin(instance :any,accounts:any) {
    instance.loginPopup(loginRequest).catch((e :any)  => {
        console.error(e);
    });
}
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
      return (
        <> 
            <WorkspaceDetails instance = {instance} accounts = {accounts} userIsAdmin = {checkuserIsAdmin}  />
        </>
        )
}
/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
  const { instance , accounts } = useMsal();
  
  var loginSuccess = 1;
  for (let index = 0; index <= loginSuccess; index++) {
    if(instance.getAllAccounts()[0] === undefined)
        {
          handleLogin(instance,accounts);
        }
  }

  checkUserRole();

  function checkUserRole() {
    instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0]
    }).then((response : any) => 
    {
      canUserRestoreTeams(response.accessToken, accounts[0].username).then(response => response ).then( (data:any) =>
      {
        checkuserIsAdmin = data;
      })
    })
  }

  return (
      <div className="App">

          <AuthenticatedTemplate>
               <ProfileContent />
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
          {/* <Button variant="secondary" className="ml-auto" onClick={() => handleLogin(instance,accounts)}>Sign in using Popup</Button> */}
          </UnauthenticatedTemplate>
      </div>
  );
};


// function getAccount () {

// }
// const { instance , accounts } = useMsal();
class App extends React.Component<{}, any>{

  constructor(props:any, state :ILoginConfig){
    super(props);
    microsoftTeams.initialize();
    
    this.state  = {
      context: {},
      name:''
    }
  }

  componentDidMount() {
    let userContext :any ;

    // microsoftTeams.getContext((context)  => {
    //   userContext = context.userPrincipalName;
    //   this.setState({
    //     name: userContext,
    //     context : context
    //   });
    // });

    microsoftTeams.authentication.getAuthToken({
      successCallback: (token: string) => {
        this.setState({
          name: token
        });
        console.log("Access Token Teams Contex : ", token);
      },
      failureCallback: (message: string) => {
        this.setState({
          name: message
        });
        console.log("Failurecall back Access Token Teams Contex : ", message);
      }
    });
    
    let userToken : any;
    

  //   microsoftTeams.authentication.authenticate({
  //     url: "http://localhost:3000/",
  //     width: 600,
  //     height: 535,
  //     successCallback: function (result:any) {
  //       userToken = result.accessToken;
  //         //getUserProfile(result.accessToken);
  //     },
  //     failureCallback: function (reason:any) {
  //       userToken = reason;
  //         //handleAuthError(reason);
  //     }
  // });
  }

  render(){
    return (
      <div className="App">
        <h1>Hello</h1>
        {this.state.name ? 
        <>
          { this.state.name }
        </> 
        :
        <> Not Login </>}
        {/*  */}
        {/* <AuthenticatedTemplate>
               <ProfileContent />
          </AuthenticatedTemplate> */}
      </div>
    )
  }
}

export interface ILoginConfig {
  context : any;
  account : any;
  instance : any;
}

export default App;