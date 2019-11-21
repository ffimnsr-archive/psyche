import { ActionType } from "typesafe-actions";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "@/actions";
import Login, { IStateProps, IDispatchProps } from "./Login";

type Action = ActionType<typeof actions>;

const mapStateToProps = (): IStateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchProps =>
	bindActionCreators(
		{
			signIn: (email: string, password: string) => actions.sesameSignIn(email, password)
		},
		dispatch
	);

export default connect<IStateProps, IDispatchProps>(
	mapStateToProps,
	mapDispatchToProps
)(Login);
