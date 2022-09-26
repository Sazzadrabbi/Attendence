import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {ButtonComp, TextTitle} from "../components/Reuse";
import {COLORS} from "../styles/Colors";
import {signOut} from "firebase/auth";
import {auth} from "../firebase/firebase";

const MarkAt = ({navigation}) => {
	const btnTextStyle = {
		color: COLORS.white,
		fontSize: 16,
		fontWeight: "900",
	};
	const bgColor = {
		backgroundColor: COLORS.lightBlue,
		width: "80%",
		borderRadius: 15,
	};

	const logoutBtnStyle = {
		marginTop: 10,
	};
	const btnGrpTextStyle = {
		color: COLORS.ligthBlack,
		fontSize: 16,
		fontWeight: "600",
	};

	const grounbtnStyle = {
		backgroundColor: COLORS.grayColor,
		width: "45%",
		borderRadius: 15,
	};

	const logOut = async () => {
		await signOut(auth);
		setTimeout(() => {
			navigation.navigate("entry");
		}, 1000);
	};

	const gotodatabasepage = () => {
		navigation.navigate("sellallStudent");
	};
	return (
		<View style={styles.root}>
			<View style={styles.titleWrapper}>
				<TextTitle />
			</View>

			<ButtonComp
				text="Mark Attendence"
				bgColor={bgColor}
				btnTextStyle={btnTextStyle}
				click={gotodatabasepage}
			/>

			<View style={styles.btnGroupView}>
				<ButtonComp
					text="Automatic"
					bgColor={grounbtnStyle}
					btnTextStyle={btnGrpTextStyle}
					click={gotodatabasepage}
				/>
				<ButtonComp
					text="Manual"
					bgColor={grounbtnStyle}
					btnTextStyle={btnGrpTextStyle}
					click={gotodatabasepage}
				/>
			</View>
			<ButtonComp
				text="Update Record"
				bgColor={bgColor}
				btnTextStyle={btnTextStyle}
				click={gotodatabasepage}
			/>
			<ButtonComp
				text="LogOut"
				bgColor={bgColor}
				extrastyle={logoutBtnStyle}
				btnTextStyle={btnTextStyle}
				click={logOut}
			/>
		</View>
	);
};

export default MarkAt;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	titleWrapper: {
		marginBottom: 30,
	},
	btnGroupView: {
		flexDirection: "row",
		width: "80%",
		height: 60,
		justifyContent: "space-between",
		alignItems: "center",
	},
});
