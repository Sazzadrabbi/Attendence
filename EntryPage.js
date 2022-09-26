import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {
	bottomUser,
	middleContentStyle,
	profileFlexWrapper,
} from "../components/similarstyles/SimillarStyles";
import UserComp, {extraStyle} from "../components/UserComp";

const adminPic = require("../../assets/images/admin.png");
const teacherPic = require("../../assets/images/teacher.png");
const studentPic = require("../../assets/images/student.png");

const text = {
	fontSize: 20,
	fontFamily: "Helvetica-Bold",
	paddingBottom: 30,
	textAlign: "center",
};

const EntryPage = ({navigation}) => {
	return (
		<View style={middleContentStyle}>
			<Text style={text}>Select your account type</Text>
			<View style={[profileFlexWrapper, extraStyle]}>
				<UserComp
					picture={adminPic}
					text="Admin"
					navigation={navigation}
				/>
				<UserComp
					picture={teacherPic}
					text="Teacher"
					navigation={navigation}
				/>
			</View>
			<View style={bottomUser}>
				<UserComp
					picture={studentPic}
					text="Student"
					navigation={navigation}
				/>
			</View>
		</View>
	);
};

export default EntryPage;

const styles = StyleSheet.create({});
