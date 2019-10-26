import { ActionType } from "typesafe-actions";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RootState } from "@/reducers";
import * as actions from "@/actions";
import Login, { ILoginProps, ILoginActionProps } from "./Login";

type Action = ActionType<typeof actions>;

const mapStateToProps = (): ILoginProps => ({});

const mapDispatchToProps = (dispatch: Dispatch<Action>): ILoginActionProps =>
  bindActionCreators(
    {
      signIn: (email: string, password: string) => actions.sesameSignIn(email, password)
    },
    dispatch
  );

export default connect<ILoginProps, ILoginActionProps, ILoginProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
