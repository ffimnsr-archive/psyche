import * as React from "react";
import styled from "styled-components";
import {
  Button,
  Intent,
  FormGroup,
  Switch,
  InputGroup,
  Classes,
  Drawer,
  Position
} from "@blueprintjs/core";
import { Formik } from "formik";
import { ActionType } from "typesafe-actions";
import { withRouter, RouteComponentProps } from "react-router";
// import { withAuthProvider } from "@/components/AuthProvider"; 
import bgPattern from "@/assets/images/pattern.svg";
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
  signUp: (email: string, password: string) => Action;
}

export interface IOwnState {
  isTncOpen: boolean;
}

type Props = IOwnProps & IStateProps & IDispatchProps;

@withRouter
class Register extends React.PureComponent<Props, IOwnState> {
  public state: IOwnState = {
    isTncOpen: false
  };

  private handleTncOpen = () => this.setState({ isTncOpen: true });
  private handleTncClose = () => this.setState({ isTncOpen: false });

  render() {
    const agreement = (
      <span>I agree to the <a href="javascript:;" onClick={this.handleTncOpen}>Terms and Conditions</a>.</span>
    );

    const year = new Date().getFullYear();

    return (
      <Container>
        <ContainerDesign />
        <ContainerSidePane>
          <ContainerForm>
            <form>
              <FormGroup
                label="Email"
                labelFor="email"
              >
                <InputGroup
                  id="email"
                  placeholder="Enter your email..."
                  large={true}
                  type="text"
                />
              </FormGroup>
              <FormGroup
                label="Password"
                labelFor="password"
              >
                <InputGroup
                  id="password"
                  placeholder="Enter your password..."
                  large={true}
                />
              </FormGroup>
              <FormGroup
                label="Confirm Password"
                labelFor="confirm-password"
              >
                <InputGroup
                  id="confirm-password"
                  placeholder="Re-type your password..."
                  large={true}
                />
              </FormGroup>
              <FormGroup>
                <Switch
                  labelElement={agreement}
                  defaultChecked={false}
                />
                <Switch
                  label="Opt-in to notifications and promotions."
                  defaultChecked={false}
                />
              </FormGroup>
              <FormGroup>
                <Button
                  intent={Intent.PRIMARY}
                  large={true}
                >
                  Register
                </Button>
              </FormGroup>
            </form>
            <Drawer
              icon="info-sign"
              title="Terms and Conditions"
              position={Position.RIGHT}
              isOpen={this.state.isTncOpen}
              onClose={this.handleTncClose}
              hasBackdrop={true}
              autoFocus={true}
              enforceFocus={true}
              canEscapeKeyClose={true}
              canOutsideClickClose={false}
              usePortal={true}
              size={Drawer.SIZE_STANDARD}
            >
              <div className={Classes.DRAWER_BODY}>
                <div className={Classes.DIALOG_BODY}>
                  <p>
                    <strong>
                      Data integration is the seminal problem of the digital age. For over ten years,
                      we’ve helped the world’s premier organizations rise to the challenge.
                    </strong>
                  </p>
                  <p>
                    Palantir Foundry radically reimagines the way enterprises interact with data by
                    amplifying and extending the power of data integration. With Foundry, anyone can source,
                    fuse, and transform data into any shape they desire. Business analysts become data
                    engineers — and leaders in their organization’s data revolution.
                  </p>
                  <p>
                    Foundry’s back end includes a suite of best-in-class data integration capabilities: data
                    provenance, git-style versioning semantics, granular access controls, branching,
                    transformation authoring, and more. But these powers are not limited to the back-end IT
                    shop.
                  </p>
                  <p>
                    In Foundry, tables, applications, reports, presentations, and spreadsheets operate as
                    data integrations in their own right. Access controls, transformation logic, and data
                    quality flow from original data source to intermediate analysis to presentation in real
                    time. Every end product created in Foundry becomes a new data source that other users
                    can build upon. And the enterprise data foundation goes where the business drives it.
                  </p>
                  <p>Start the revolution. Unleash the power of data integration with Palantir Foundry.</p>
                </div>
              </div>
              <div className={Classes.DRAWER_FOOTER}>Open Sesame {year}</div>
            </Drawer>
          </ContainerForm>
        </ContainerSidePane>
      </Container>
    );
  }
}

export default Register;
