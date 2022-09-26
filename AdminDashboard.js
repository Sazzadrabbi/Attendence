import {StyleSheet, Text, View} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Feather";
import {COLORS} from "../styles/Colors";
import {
	bottomUser,
	profileFlexWrapper,
} from "../components/similarstyles/SimillarStyles";
import UserComp from "../components/UserComp";
import {ButtonComp} from "../components/Reuse";
import {signOut} from "firebase/auth";
import {auth} from "../firebase/firebase";

const courseIcon = require("../../assets/images/courseicon.png");
const teacherPic = require("../../assets/images/teacher.png");
const studentPic = require("../../assets/images/student.png");

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

const AdminDashboard = ({navigation}) => {
	const contentBgColor = {
		backgroundColor: COLORS.lightGary,
		padding: 20,
	};
	const logOut = async () => {
		await signOut(auth);
		setTimeout(() => {
			navigation.navigate("entry");
		}, 1000);
	};
	return (
		<View style={styles.root}>
			<View style={styles.admindashhead}>
				<Icon name="menu" color="#FFF" size={24} />
				<Text style={styles.text}>Admin</Text>
			</View>

			<View style={styles.contentWrapper}>
				<View style={profileFlexWrapper}>
					<UserComp
						picture={studentPic}
						contentBgColor={contentBgColor}
						text="Student-List"
						admin={true}
						navigation={navigation}
					/>
					<UserComp
						picture={teacherPic}
						contentBgColor={contentBgColor}
						text="Teacher-List"
						admin={true}
						navigation={navigation}
					/>
				</View>
				<View style={bottomUser}>
					<UserComp
						picture={courseIcon}
						contentBgColor={contentBgColor}
						text="Course-List"
						admin={true}
						navigation={navigation}
					/>
				</View>

				<View style={styles.logoutBtnWrapper}>
					<ButtonComp
						text="LogOut"
						bgColor={bgColor}
						extrastyle={logoutBtnStyle}
						btnTextStyle={btnTextStyle}
						click={logOut}
					/>
				</View>
			</View>
		</View>
	);
};

export default AdminDashboard;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	admindashhead: {
		height: "15%",
		backgroundColor: COLORS.lightBlue,
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 30,
		paddingHorizontal: 20,
	},
	text: {
		marginLeft: 20,
		color: COLORS.white,
		fontSize: 20,
		fontFamily: "Helvetica-Bold",
	},
	contentWrapper: {
		height: "85%",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	logoutBtnWrapper: {
		width: "100%",
		alignItems: "center",
		marginTop: 20,
	},
});
