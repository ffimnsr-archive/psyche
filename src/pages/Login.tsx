import * as React from "react";
import styled from "styled-components";
import {
  Button,
  Intent,
  FormGroup,
  Tooltip,
  Switch,
  InputGroup
} from "@blueprintjs/core";
import { Formik } from "formik";
import { ActionType } from "typesafe-actions";
import bgPattern from "@/assets/images/pattern.svg";
import { withRouter, RouteComponentProps } from "react-router";
import { IAuthContext, withAuthProvider } from "@/components/AuthProvider";
import * as actions from "@/actions";

type Action = ActionType<typeof actions>;

const Container = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
`;

const ContainerDesign = styled.div`
  flex: 1 1 auto;
  background-size: auto !important;
  background-color: #434959;
  background-image: url(${bgPattern});
`;

const ContainerSidePane = styled.div`
  flex: 0.2 0 auto;
  display: flex;
  flex-direction: row;
`;

const ContainerForm = styled.div`
  flex: 1 1 auto;
  align-self: center;
  padding: 0 2em;
`;

export interface IOwnProps extends RouteComponentProps<any> {}

export interface IStateProps {}

export interface IDispatchProps {
  signIn: (email: string, password: string) => Action;
}

interface IOwnState {
  showPassword: boolean;
}

interface FormState {
  email?: string;
  password?: string;
}

type Props = IAuthContext & IOwnProps & IStateProps & IDispatchProps;

@withRouter
@withAuthProvider
class Login extends React.PureComponent<Props, IOwnState> {
  public state: IOwnState = {
    showPassword: false
  };

  private handleLockClick = () =>
    this.setState({ showPassword: !this.state.showPassword });

  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      console.log("auth#############");
    }
  }

  componentDidUpdate() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      console.log("auth#############2");
    }
  }

  render() {
    const { showPassword } = this.state;

    const lockButton = (
      <Tooltip content={`${showPassword ? "Hide" : "Show"} Password`}>
        <Button
          icon={showPassword ? "unlock" : "lock"}
          intent={Intent.WARNING}
          minimal={true}
          onClick={this.handleLockClick}
        />
      </Tooltip>
    );

    return (
      <Container>
        <ContainerDesign />
        <ContainerSidePane>
          <ContainerForm>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={values => {
                let errors: FormState = {};

                if (!values.email) {
                  errors.email = "Invalid email address";
                }

                return errors;
              }}
              onSubmit={({ email, password }, { setSubmitting }) => {
                this.props.signIn(email, password);
                setSubmitting(false);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <FormGroup
                    label="Email"
                    labelFor="email"
                  >
                    <InputGroup
                      id="email"
                      name="email"
                      placeholder="Enter your email..."
                      large={true}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      type="email"
                    />
                  </FormGroup>
                  <FormGroup
                    label="Password"
                    labelFor="password"
                  >
                    <InputGroup
                      id="password"
                      name="password"
                      placeholder="Enter your password..."
                      rightElement={lockButton}
                      large={true}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      type={showPassword ? "text" : "password"}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Switch
                      label="Remember Me?"
                      defaultChecked={false}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      intent={Intent.PRIMARY}
                      large={true}
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Login
                    </Button>
                  </FormGroup>
                </form>
              )}
            </Formik>
          </ContainerForm>
        </ContainerSidePane>
      </Container>
    );
  }
}

export default Login;
