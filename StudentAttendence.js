import {StyleSheet, Text, View, ScrollView} from "react-native";
import React from "react";
import {
	ButtonComp,
	DateComp,
	SubjectComp,
	TextTitle,
} from "../components/Reuse";
import {COLORS} from "../styles/Colors";
import {signOut} from "firebase/auth";
import {auth} from "../firebase/firebase";

const StudentAttendence = ({route, navigation}) => {
	const {selectedCourse, courseId, alreadyPresentToday} = route.params;

	const bgColor = {
		backgroundColor: COLORS.brown,
		borderRadius: 5,
		width: "50%",
		height: 40,
	};
	const LogOutBtnStyle = {
		marginTop: 10,
	};
	const btnTextStyle = {
		color: "#fff",
		fontSize: 16,
		fontFamily: "Helvetica-Bold",
	};
	const logOut = async () => {
		await signOut(auth);
		setTimeout(() => {
			navigation.navigate("entry");
		}, 1000);
	};
	const gotoNtoficationpage = () => {
		navigation.navigate("studentattendencenotification", {selectedCourse});
	};
	return (
		<ScrollView contentContainerStyle={styles.root}>
			<View style={styles.headContainer}>
				<TextTitle />
				<DateComp />
			</View>
			<View style={styles.alignStyle}>
				<View style={styles.attendenceConfirmStyle}>
					<Text style={styles.text}>
						{alreadyPresentToday
							? "Toady's attendence already submitted on this subject!"
							: "Your Attendence has ben submitted to faculty!"}
					</Text>
				</View>
			</View>
			<View style={styles.subjectWrapper}>
				<SubjectComp
					subjectStyle={styles.subjectStyle}
					label={"Subject"}
					text={selectedCourse}
				/>
				{/* <SubjectComp
					label={"Current Attendence"}
					text={"Database management system"}
				/> */}
			</View>

			<ButtonComp
				text="See Notification"
				bgColor={bgColor}
				btnTextStyle={btnTextStyle}
				click={gotoNtoficationpage}
			/>
			<ButtonComp
				text="LogOut"
				bgColor={bgColor}
				extrastyle={LogOutBtnStyle}
				btnTextStyle={btnTextStyle}
				click={logOut}
			/>
		</ScrollView>
	);
};

export default StudentAttendence;

const styles = StyleSheet.create({
	root: {
		paddingTop: 40,
		paddingBottom: 15,
		alignItems: "center",
	},
	headContainer: {
		paddingTop: 20,
		paddingBottom: 50,
	},
	alignStyle: {
		alignItems: "center",
	},
	attendenceConfirmStyle: {
		backgroundColor: COLORS.grayColor,
		width: "55%",
		paddingVertical: 15,
		paddingHorizontal: 25,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
	},
	text: {
		fontSize: 16,
		fontFamily: "Helvetica-Regular",
		lineHeight: 23,
	},

	subjectWrapper: {
		paddingVertical: 20,
		width: "60%",
		alignItems: "center",
		justifyContent: "center",
	},
	subjectStyle: {
		width: "80%",
		justifyContent: "center",
	},
});
