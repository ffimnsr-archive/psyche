import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "@/reducers";
import { SessionState } from "@/reducers/session";

export interface IAuthContext {
  isAuthenticated: boolean;
}

interface IAuthActionContext {
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext & IAuthActionContext | null>(
  null
);

interface IAuthProviderProps {
  session?: SessionState;
}

export const withAuthProvider = (
  Component: React.ComponentClass | React.StatelessComponent
) => props => (
  <AuthContext.Consumer>
    {(store: Partial<IAuthContext & IAuthActionContext> | null) => (
      <Component {...props} {...store} />
    )}
  </AuthContext.Consumer>
);

class AuthProvider extends React.Component<IAuthProviderProps, IAuthContext> {
  public state: IAuthContext = {
    isAuthenticated: false
  };

  private login = async () => {
    if (!window.sessionStorage.getItem("token")) {
      return false;
    }

    /* try {
     *   const { session } = this.props;
     *   const { token } = session.currentSession;

     *   this.updateSessionAuth(token);
     * } catch (error) {
     *   if (error === "unauthorized") {
     *     this.logout();
     *   } else {

     *   }
     * } */

    return true;
  };

  private logout = async () => {
    this.updateToken();
    this.setState({
      isAuthenticated: false
    });
  };

  private updateToken = (token?: string) => {
    if (token) {
      window.sessionStorage.setItem("token", token);
    } else {
      window.sessionStorage.removeItem("token");
    }
  };

  private updateSessionAuth = (token?: string) => {
    if (token) {
      this.updateToken(token);
      this.setState({
        isAuthenticated: true
      });
    }
  };

  private onSessionStorageUpdate = event => {
    if (event.key === "token") {
      // Has logged out from another tab.
      if (event.oldValue && !event.newValue) {
        return this.setState({
          isAuthenticated: false
        });
      }

      // Has logged in from another tab
      if (!event.oldValue && event.newValue) {
        const value = event.newValue;
        this.updateToken(value);
        this.setState({
          isAuthenticated: true
        });

        return this.setState({
          isAuthenticated: true
        });
      }

      const { value: oldUser } = event.oldValue;
      const { value: newUser } = event.newValue;

      if (!oldUser || !oldUser.equals(newUser)) {
        this.setState({
          isAuthenticated: true
        });
      }
    }
  };

  async componentDidMount() {
    window.addEventListener("storage", this.onSessionStorageUpdate);
    await this.login();
  }

  async componentDidUpdate() {
    // await this.login();
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.onSessionStorageUpdate);
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const mapStateToProps = (state: RootState): IAuthProviderProps => ({
  session: state.session
});

export default connect(mapStateToProps)(AuthProvider);
