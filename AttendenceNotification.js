import {StyleSheet, Text, View, ScrollView} from "react-native";
import React from "react";
import {CourseData} from "../data/CourseData";
import {AdNotification} from "../components/Reuse";

const AttendenceNotification = ({route, navigation}) => {
	const {selectedCourse} = route.params;
	return (
		<ScrollView style={styles.root}>
			<View style={styles.mainContainer}>
				<Text style={styles.text}>My Attendence</Text>
				<AdNotification data={selectedCourse} />
			</View>
		</ScrollView>
	);
};

export default AttendenceNotification;

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},

	mainContainer: {
		paddingTop: 70,
		paddingBottom: 30,
		paddingHorizontal: 30,
	},
	text: {
		textAlign: "center",
		fontSize: 25,
		fontWeight: "600",
		marginBottom: 20,
	},
});
